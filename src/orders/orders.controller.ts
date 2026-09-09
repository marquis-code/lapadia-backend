import { Controller, Post, Get, Body, Query, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    return this.ordersService.createOrder(body);
  }

  @Get('verify')
  async verifyPayment(@Query('reference') reference: string) {
    return this.ordersService.verifyPayment(reference);
  }

  @Get('stats')
  async getStats() {
    return this.ordersService.getStats();
  }

  @Get()
  async findAll(@Query('limit') limit: string) {
    return this.ordersService.findAll(limit ? parseInt(limit, 10) : undefined);
  }

  @Post(':id/pay')
  async payPendingOrder(@Param('id') id: string) {
    return this.ordersService.payPendingOrder(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('orderStatus') orderStatus: string) {
    return this.ordersService.updateOrderStatus(id, orderStatus);
  }
}
