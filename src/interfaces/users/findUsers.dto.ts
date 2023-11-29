import { IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  role: string;
}
