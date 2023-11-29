import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  pricePerHour?: number;

  @IsNumber()
  @IsOptional()
  pricePerDay?: number;

  @IsNumber()
  @IsOptional()
  pricePerMonth?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
