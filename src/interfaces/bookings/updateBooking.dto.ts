import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateBookingDto {
  @IsNumber()
  startDate: number;

  @IsNumber()
  endDate: number;

  @IsNumber()
  amount: number;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsString()
  paymentMode: string;

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
}
