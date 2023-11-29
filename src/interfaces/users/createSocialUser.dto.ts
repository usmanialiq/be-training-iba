import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

interface ISocialAuth {
  id: string;
  name: string;
  token: string;
}

export class CreateSocialUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  country?: string;

  socialAuth?: ISocialAuth;
}
