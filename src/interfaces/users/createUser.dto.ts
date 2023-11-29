import {
  IsString,
  MinLength,
  MaxLength,
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

export class CreateUserDto {
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

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  confirmPassword: string;

  google?: ISocialAuth;
}
