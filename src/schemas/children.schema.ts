import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Branch } from './branch.schema';

export type ChildrenDocument = Children & Document;

@Schema()
export class Children {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String, required: true })
  grade: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  })
  branch: Branch;

  @Prop({ type: String, required: true })
  rollNo: string;

  @Prop({ type: Number, required: true })
  dob: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  parent: User;

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: Number, default: Date.now() })
  updatedAt: number;
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
