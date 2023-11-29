import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controllers';
import { JwtStrategy } from '../auth/jwt';
import { AuthService } from '../services';
import { UserModule } from './user.module';
import { User, UserSchema } from '../schemas/user.schema';
import { Config } from '../config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
