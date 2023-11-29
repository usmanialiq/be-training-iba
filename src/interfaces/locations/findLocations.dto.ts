import { IsOptional, IsString } from 'class-validator';

export class FindLocationsDto {
  @IsString()
  @IsOptional()
  title?: string;
}
