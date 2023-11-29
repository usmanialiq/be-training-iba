import { IsString } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
