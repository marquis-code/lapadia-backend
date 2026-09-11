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
        id: order._id ? order._id.toString() : 'N/A',
        customer: order.guestName || (order.userId && order.userId.name) ? order.userId.name : 'Guest User',
        amount: order.totalAmount || 0,
        status: order.orderStatus || 'pending',
        date: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
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
        id: sub._id ? sub._id.toString() : 'N/A',
        customer: (sub.userId && sub.userId.name) ? sub.userId.name : 'Unknown User',
        plan: (sub.planId && sub.planId.name) ? sub.planId.name : 'Custom',
        status: sub.status || 'unknown',
        nextBillingDate: sub.nextBillingDate ? new Date(sub.nextBillingDate).toLocaleDateString() : 'N/A',
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
        id: tx._id ? tx._id.toString() : 'N/A',
        customer: tx.guestName || (tx.userId && tx.userId.name) ? tx.userId.name : 'Unknown',
        amount: tx.totalAmount || tx.amount || 0,
        status: tx.paymentStatus || tx.status || 'unknown',
        date: tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any as Buffer;
  }
}
