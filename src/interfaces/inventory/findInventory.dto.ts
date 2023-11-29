import { IsOptional, IsString } from 'class-validator';

export class FindInventoryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  isAdmin?: string;
}
