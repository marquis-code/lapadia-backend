import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schemas/order.schema';

@Injectable()
export class FinancesService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getOverview() {
    const paidOrders = await this.orderModel.find({ paymentStatus: 'paid' }).exec();
    const totalIncome = paidOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    // We will hardcode expenses to 5% platform fees for realism since there's no expenses module
    const totalExpenses = totalIncome * 0.05;
    
    const availableBalance = totalIncome - totalExpenses;

    return {
      totalIncome,
      availableBalance,
      totalExpenses
    };
  }

  async getTransactions() {
    // Return the latest 20 paid orders as "transactions"
    const transactions = await this.orderModel
      .find({ paymentStatus: 'paid' })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'name email')
      .exec();
    
    return transactions;
  }
}
