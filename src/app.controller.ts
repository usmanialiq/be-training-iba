import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/auth.decorator';

@Controller()
export class AppController {
  @Get()
  @Public()
  getHello() {
    return 'hello world';
  }
}
