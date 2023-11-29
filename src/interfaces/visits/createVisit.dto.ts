import { IsString, IsBoolean, IsNumber, IsEmail } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  location: string;

  @IsString()
  plan: string;

  @IsNumber()
  visitDate: number;

  @IsString()
  visitTime: string;

  @IsBoolean()
  isSubscribed: boolean;
}
