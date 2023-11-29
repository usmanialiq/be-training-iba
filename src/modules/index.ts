import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { ChildrenModule } from './children.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ChildrenModule,
  ],
})
export class AppModules {}
