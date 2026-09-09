import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportService {
  async generateOrderExcel(orderData: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Order ID', key: 'id', width: 20 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Date', key: 'date', width: 25 },
    ];

    orderData.forEach((order) => {
      worksheet.addRow({
        id: order._id,
        customer: order.userId?.name || order.userId,
        amount: order.totalAmount,
        status: order.orderStatus,
        date: order.createdAt,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any as Buffer;
  }

  async generateSubscriptionExcel(subscriptionData: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Subscriptions');

    worksheet.columns = [
      { header: 'Subscription ID', key: 'id', width: 25 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Plan', key: 'plan', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Next Billing Date', key: 'nextBillingDate', width: 20 },
    ];

    subscriptionData.forEach((sub) => {
      worksheet.addRow({
        id: sub._id,
        customer: sub.userId?.name || sub.userId,
        plan: sub.planId?.name || 'Custom',
        status: sub.status,
        nextBillingDate: sub.nextBillingDate,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any as Buffer;
  }

  async generateFinanceExcel(financeData: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Finances');

    worksheet.columns = [
      { header: 'Transaction ID', key: 'id', width: 25 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    financeData.forEach((tx) => {
      worksheet.addRow({
        id: tx._id,
        customer: tx.userId?.name || tx.userId,
        amount: tx.totalAmount || tx.amount,
        status: tx.paymentStatus || tx.status,
        date: tx.createdAt,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any as Buffer;
  }
}
