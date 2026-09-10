import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromosService } from './promos.service';
import { PromosController } from './promos.controller';
import { PromoCode, PromoCodeSchema } from './schemas/promo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromoCode.name, schema: PromoCodeSchema },
    ]),
  ],
  providers: [PromosService],
  controllers: [PromosController]
})
export class PromosModule {}
