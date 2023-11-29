import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  title: string;

  @IsString()
  address: string;

  @IsString()
  mapLocation: string;

  @IsString()
  phone: string;

  @IsString()
  manager: string;
}
