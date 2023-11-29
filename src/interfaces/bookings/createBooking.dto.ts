import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
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

  @IsNumber()
  amount: number;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsString()
  paymentMode: string;

  @IsString()
  inventory: string;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
