import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import { Subscription, SubscriptionDocument } from '../subscriptions/schemas/subscription.schema';

@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>
  ) {}

  @Get('orders')
  async exportOrders(@Res() res: Response) {
    const orders = await this.orderModel.find().populate('userId', 'name email').populate('items.productId').sort({ createdAt: -1 }).exec();
    
    const buffer = await this.exportService.generateOrderExcel(orders);
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="orders.xlsx"',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('subscriptions')
  async exportSubscriptions(@Res() res: Response) {
    const subs = await this.subscriptionModel.find().populate('userId', 'name email').populate('planId').sort({ createdAt: -1 }).exec();
    const buffer = await this.exportService.generateSubscriptionExcel(subs);
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="subscriptions.xlsx"',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Get('finances')
  async exportFinances(@Res() res: Response) {
    // For finances, we'll export paid orders representing transactions
    const txs = await this.orderModel.find({ paymentStatus: 'paid' }).populate('userId', 'name email').sort({ createdAt: -1 }).exec();
    const buffer = await this.exportService.generateFinanceExcel(txs);
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="finances.xlsx"',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
