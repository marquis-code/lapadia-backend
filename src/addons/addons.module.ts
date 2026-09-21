import { Module } from '@nestjs/common';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Addon, AddonSchema } from './schemas/addon.schema';
import { AddonCategory, AddonCategorySchema } from './schemas/addon-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Addon.name, schema: AddonSchema },
      { name: AddonCategory.name, schema: AddonCategorySchema },
    ]),
  ],
  controllers: [AddonsController],
  providers: [AddonsService],
})
export class AddonsModule {}
