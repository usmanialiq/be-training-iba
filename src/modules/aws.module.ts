import { Module } from '@nestjs/common';
import { SESService } from '../common/ses.service';

@Module({
  imports: [SESService],
})
export class AWSModule {}
