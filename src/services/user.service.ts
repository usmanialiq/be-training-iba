import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import {
  CreateUserDto,
  CreateSocialUserDto,
  IUpdateUserDto,
  ChangeUserPasswordDto,
} from '../interfaces';
import pagination from '../middleware/pagination.middleware';
import { comparePassword, hashPassword } from '../common/hash.secure';
import { uploadToCloudinary } from '../utils/upload.util';
import { FindUsersDto } from './../interfaces/users/findUsers.dto';
import { SESService } from '../common/ses.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>,
    private jwtService: JwtService,
    private sesService: SESService,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw 'Passwords do not match';
      }
      const verifyIfUserExists = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      if (verifyIfUserExists) {
        throw 'User with this email already exists';
      }
      createUserDto.password = await hashPassword(createUserDto.password);
      const newUser = new this.userRepository({
        ...createUserDto,
        uuid: uuidv4(),
      });
      const saveUser = await newUser.save();
      if (!saveUser) {
        throw 'Failed to save the user';
      }
      // const sendWelcomeEmail = await this.sesService.sendTemplateEmail(
      //   saveUser.email,
      //   'WelcomeToWorkHall',
      //   { name: `${saveUser.firstName} ${saveUser.lastName}` },
      // );
      // if (!sendWelcomeEmail) {
      //   this.logger.error(
      //     'AWS SES ===> Failed to send welcome email:',
      //     saveUser.email,
      //   );
      // }
      // const sendVerifyUserEmail = await this.sesService.sendTemplateEmail(
      //   saveUser.email,
      //   'VerifyAccount',
      //   {
      //     name: `${saveUser.firstName} ${saveUser.lastName}`,
      //     link: `https://api.workhall.co/v1/users/verify/${saveUser.uuid}`,
      //   },
      // );
      // if (!sendVerifyUserEmail) {
      //   this.logger.error(
      //     'AWS SES ===> Failed to send verify user email:',
      //     saveUser.email,
      //   );
      // }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async createWithGoogle(createSocialUserDto: CreateSocialUserDto) {
    try {
      const verifyIfUserExists = await this.userRepository.findOne({
        email: createSocialUserDto.email,
      });
      if (verifyIfUserExists) {
        throw 'This user already exists';
      }
      const newUser = new this.userRepository({
        ...createSocialUserDto,
        uuid: uuidv4(),
        verified: true,
      });
      const saveUser = await newUser.save();
      if (!saveUser) {
        throw 'Failed to save the user';
      }
      // email feature here...
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: FindUsersDto) {
    try {
      const paginatedQuery = pagination(query);
      let filters: any = {
        isBlocked: false,
      };

      if (query.role) {
        filters = {
          ...filters,
          role: query.role,
        };
      }

      if (query.search) {
        filters = {
          ...filters,
          $or: [
            { firstName: { $regex: new RegExp(`^${query.search}`, 'i') } },
            { lastName: { $regex: new RegExp(`^${query.search}`, 'i') } },
            { email: { $regex: new RegExp(`^${query.search}`, 'i') } },
          ],
        };
      }

      const users = await this.userRepository
        .find(filters, '-password -__v')
        .limit(paginatedQuery.limit)
        .skip(paginatedQuery.skip)
        .sort({ createdAt: -1 })
        .exec();

      const countUsers = await this.userRepository
        .find(filters)
        .countDocuments();

      return {
        users,
        total: countUsers,
        page: paginatedQuery.page,
      };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id, '-password -__v');
      if (!user) {
        throw 'Failed to find the user';
      }
      return user;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        throw 'Failed to find the user';
      }
      return user;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser(uuid: string) {
    try {
      const findUser = await this.userRepository.findOne({ uuid });
      if (!findUser) {
        throw 'Failed to find the user with this verification token';
      }

      const updateUser = await this.userRepository.updateOne(
        { _id: findUser._id },
        { verified: true },
      );
      if (!updateUser.modifiedCount) {
        throw 'Failed to verifiy the user';
      }

      return 'You have been verified';
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, payload: IUpdateUserDto) {
    try {
      const updateUser = await this.userRepository.updateOne(
        { _id: id },
        { ...payload, updateAt: Date.now() },
      );
      if (!updateUser.modifiedCount) {
        throw 'Nothing to update the user';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(id: string, changePasswordDto: ChangeUserPasswordDto) {
    try {
      if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
        throw 'Passwords do not match';
      }
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw 'Failed to find the user';
      }
      const verifyOldPassword = await comparePassword(
        changePasswordDto.oldPassword,
        user.password,
      );
      if (!verifyOldPassword) {
        throw 'Old password does not match';
      }
      const bcryptPass = await hashPassword(changePasswordDto.newPassword);

      const updateUser = await this.userRepository.updateOne(
        { _id: id },
        { password: bcryptPass, updatedAt: Date.now() },
      );
      if (!updateUser.modifiedCount) {
        throw 'Failed to update the user';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async toggleUserActivity(id: string) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw 'Failed to update the user';
      }
      const updateUser = await this.userRepository.updateOne(
        { _id: id },
        { isBlocked: !user.isBlocked, updatedAt: Date.now() },
      );
      if (!updateUser.modifiedCount) {
        throw 'Failed to update the user';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    try {
      if (!file) {
        throw 'No image found to upload';
      }

      const image = await uploadToCloudinary(file.path, 'users');

      const updateUser = await this.userRepository.updateOne(
        { _id: id },
        { image, updatedAt: Date.now() },
      );
      if (!updateUser.modifiedCount) {
        throw 'Failed to update the user';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
