import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AvailableBookingDto {
  @IsNumber()
  startDate: number;

  @IsNumber()
  endDate: number;

  @IsNumber()
  @IsOptional()
  hoursFrom?: number;

  @IsNumber()
  @IsOptional()
  hoursTo?: number;

  @IsBoolean()
  isMonthly: boolean;

  @IsBoolean()
  isDaily: boolean;

  @IsBoolean()
  isHourly: boolean;

  @IsString()
  inventory: string;   // accepts inventory title (Tipu) 

  @IsString()
  location: string;   // accepts location id

  @IsString()
  @IsOptional()
  createdBy?: string;
}
