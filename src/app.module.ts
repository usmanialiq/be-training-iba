import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppModules } from './modules';
import { Config } from './config';
import { JwtAuthGuard } from './auth/auth.guard';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(Config.mongoURI),
    AppModules,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
