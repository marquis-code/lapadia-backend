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
}
