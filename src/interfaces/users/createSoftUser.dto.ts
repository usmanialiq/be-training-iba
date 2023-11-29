import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateSoftUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  companyName?: string;
}
