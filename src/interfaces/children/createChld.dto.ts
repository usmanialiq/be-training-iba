import { IsString, IsNumber } from 'class-validator';

export class CreateChildDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsString()
  school: string;

  @IsString()
  grade: string;

  @IsString()
  rollNo: string;

  @IsNumber()
  dob: number;
}
