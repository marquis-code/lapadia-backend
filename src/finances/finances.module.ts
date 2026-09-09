import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancesController } from './finances.controller';
import { FinancesService } from './finances.service';
import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { PayoutRequest, PayoutRequestSchema } from './schemas/payout-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: PayoutRequest.name, schema: PayoutRequestSchema }
    ]),
  ],
  controllers: [FinancesController],
  providers: [FinancesService],
})
export class FinancesModule {}
