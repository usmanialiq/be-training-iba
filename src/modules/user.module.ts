import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt';
import { UserController } from '../controllers';
import { UserService } from '../services';
import { User, UserSchema } from '../schemas/user.schema';
import { Config } from '../config';
import { SESService } from '../common/ses.service';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, SESService],
  exports: [UserService],
})
export class UserModule {}
