import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ExportService } from './export.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas/order.schema';

@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
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
}
