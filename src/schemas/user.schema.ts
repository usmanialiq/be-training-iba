import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../common/role.enum';

export type UserDocument = User & Document;

@Schema()
class SocialAuth extends Document {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  token: string;
}

@Schema()
class MiscInformation extends Document {
  @Prop({ type: String })
  resetPasswordCode: string;

  @Prop({ type: String })
  resetPasswordCodeExpiry: number;
}

@Schema()
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ type: String, required: true, default: Role.Parent })
  role: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: String, required: true, default: 'Lahore' })
  city: string;

  @Prop({ type: String })
  country?: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: SocialAuth })
  socialAuth?: SocialAuth;

  // forget password settings
  @Prop({ type: MiscInformation })
  misc?: MiscInformation;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: String })
  uuid: string;

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;

  @Prop({ type: Number })
  age: number;

  @Prop({ type: String })
  initials?: string;

  @Prop({ type: Number, default: Date.now() })
  lastLogin: number;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: Number, default: Date.now() })
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
