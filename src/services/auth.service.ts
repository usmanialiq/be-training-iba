import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './';
import { AuthLoginDto, AuthSocialLoginDto } from '../interfaces';
import { comparePassword } from '../common/hash.secure';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async login(authLoginDto: AuthLoginDto) {
    try {
      const { email, password } = authLoginDto;
      const user: any = await this.userService.findByEmail(email);
      if (!user) {
        throw 'User not found';
      }
      const isPasswordMatching = await comparePassword(password, user.password);
      if (!isPasswordMatching) {
        throw 'Wrong credentials provided';
      }

      const payload = {
        id: user._id,
        name: `${user.firstName} ${user.lastName} `,
        email: user.email,
        role: user.role,
        image: user.image,
      };

      const accessToken = this.jwtService.sign(payload);

      const updateLastLogin = await this.userService.update(user._id, {
        lastLogin: Date.now(),
      });
      if (!updateLastLogin) {
        throw 'Failed to update the last login';
      }

      return {
        ...payload,
        accessToken,
      };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async loginWithGoogle(authSocialLoginDto: AuthSocialLoginDto) {
    try {
      const { email, socialAuth } = authSocialLoginDto;
      const user: any = await this.userService.findByEmail(email);
      if (!user) {
        throw 'User not found';
      }

      const isUserMatching = socialAuth.id === user.socialAuth.id;
      if (!isUserMatching) {
        throw 'Wrong user info provided';
      }

      const payload = {
        id: user._id,
        name: `${user.firstName} ${user.lastName} `,
        email: user.email,
        role: user.role,
        image: user.image,
      };

      const accessToken = this.jwtService.sign(payload);

      const updateLastLogin = await this.userService.update(user._id, {
        lastLogin: Date.now(),
      });
      if (!updateLastLogin) {
        throw 'Failed to update the last login';
      }

      return {
        ...payload,
        accessToken,
      };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
