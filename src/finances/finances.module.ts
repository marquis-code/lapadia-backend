import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancesController } from './finances.controller';
import { FinancesService } from './finances.service';
import { Order, OrderSchema } from '../orders/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [FinancesController],
  providers: [FinancesService],
})
export class FinancesModule {}
