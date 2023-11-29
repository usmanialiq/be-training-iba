import {
  IsString,
  IsNumber,
  IsMobilePhone,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class IUpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsMobilePhone()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  age?: number

  @IsString()
  @IsOptional()
  businessType?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  companyWebsite?: string;

  @IsString()
  @IsOptional()
  companyDesc?: string;

  @IsNumber()
  @IsOptional()
  lastLogin?: number;
}
