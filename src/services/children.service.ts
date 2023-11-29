import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Children, ChildrenDocument } from '../schemas/children.schema';
import pagination from '../middleware/pagination.middleware';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel(Children.name)
    private childrenRepository: Model<ChildrenDocument>,
  ) {}

  private readonly logger = new Logger(ChildrenService.name);

  async create(createChildDto: any, user: any) {
    try {
      const newChild = new this.childrenRepository({
        ...createChildDto,
        createdBy: user.id,
      });
      const saveChild = await newChild.save();

      if (!saveChild) {
        throw 'Failed to register the child, please try again';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: any) {
    try {
      const paginatedQuery = pagination(query);

      const children = await this.childrenRepository
        .find({}, '-__v')
        .limit(paginatedQuery.limit)
        .skip(paginatedQuery.skip)
        .sort({ createdAt: -1 })
        .populate('branch')
        .populate('parent')
        .exec();

      const countChildren = await this.childrenRepository
        .find({})
        .countDocuments();

      return {
        children,
        total: countChildren,
        page: paginatedQuery.page,
      };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string): Promise<Children> {
    try {
      const child = await this.childrenRepository.findById(id, '-__v');
      if (!child) {
        throw 'Failed to find the child';
      }
      return child;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findByParentId(parentId: string) {
    try {
      const children = await this.childrenRepository.find({ parentId });
      if (!children.length) {
        throw 'Failed to find the children';
      }
      return children;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, payload: any) {
    try {
      const updateChild = await this.childrenRepository.updateOne(
        { _id: id },
        { ...payload, updateAt: Date.now() },
      );
      if (!updateChild.modifiedCount) {
        throw 'Nothing to update the Child';
      }
      return 1;
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
