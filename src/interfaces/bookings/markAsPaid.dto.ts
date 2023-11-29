import { IsString } from 'class-validator';

export class MarkAsPaidDto {
  @IsString()
  status: string;

  @IsString()
  responseCode: string;
}
