import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

interface ISocialAuth {
  id: string;
  name: string;
  token: string;
}

export class AuthSocialLoginDto {
  @IsEmail()
  email: string;

  socialAuth?: ISocialAuth;
}
