import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChildrenController } from '../controllers';
import { ChildrenService } from '../services';
import { Children, ChildrenSchema } from '../schemas/children.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Children.name, schema: ChildrenSchema },
    ]),
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
