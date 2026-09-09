import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { SheetsService } from './sheets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../orders/schemas/order.schema';
import { Subscription, SubscriptionSchema } from '../subscriptions/schemas/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Subscription.name, schema: SubscriptionSchema }
    ])
  ],
  controllers: [ExportController],
  providers: [ExportService, SheetsService],
  exports: [ExportService, SheetsService],
})
export class ExportModule {}
