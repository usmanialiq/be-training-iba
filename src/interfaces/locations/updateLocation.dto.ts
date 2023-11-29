import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  mapLocation?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
