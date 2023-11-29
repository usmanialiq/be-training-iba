import { IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsNumber()
  pricePerMin: number;

  @IsNumber()
  pricePerHour: number;

  @IsNumber()
  pricePerDay: number;

  @IsNumber()
  pricePerMonth: number;

  @IsString()
  location: string;
}
