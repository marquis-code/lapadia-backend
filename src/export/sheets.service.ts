import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class SheetsService {
  private readonly logger = new Logger(SheetsService.name);
  private sheetsApi: any;
  private spreadsheetId: string | undefined;

  constructor(private configService: ConfigService) {
    this.spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID');
    this.initialize();
  }

  private initialize() {
    try {
      const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
      const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');

      if (!clientEmail || !privateKey) {
        this.logger.warn('Google Service Account credentials missing. Sheets API disabled.');
        return;
      }

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheetsApi = google.sheets({ version: 'v4', auth });
    } catch (error) {
      this.logger.error('Failed to initialize Google Sheets API', error);
    }
  }

  async appendOrderRow(order: any) {
    if (!this.sheetsApi) return;
    
    if (!this.spreadsheetId) {
      this.spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID');
      if (!this.spreadsheetId) {
        this.logger.warn('GOOGLE_SHEET_ID is not configured. Cannot log order to Sheets.');
        return;
      }
    }

    try {
      const isSub = order.isSubscription;
      const sheetName = isSub ? 'Subscriptions' : 'Orders';
      
      // Check if headers exist
      const headerResponse = await this.sheetsApi.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A1:Z1`,
      }).catch(() => null);

      const headersExist = headerResponse?.data?.values && headerResponse.data.values.length > 0;

      if (!headersExist) {
        const headers = [
          'Date', 'Order ID', 'Customer Name', 'Customer Email', 'Customer Phone', 
          'Total Amount', 'Payment Status', 'Order Status', 'Delivery Method', 
          'Delivery Address', 'Is Subscription', 'Deliver All At Once', 'Order Items'
        ];
        
        await this.sheetsApi.spreadsheets.values.append({
          spreadsheetId: this.spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [headers],
          },
        });
      }

      const date = new Date(order.createdAt || Date.now()).toLocaleString();
      const customer = order.guestName || order.userId?.name || 'Customer';
      const email = order.guestEmail || order.userId?.email || 'N/A';
      const phone = order.guestPhone || 'N/A';
      const amount = order.totalAmount;
      const paymentStatus = order.paymentStatus || 'pending';
      const status = order.orderStatus || 'processing';
      const deliveryMethod = order.deliveryMethod || 'delivery';
      const address = order.deliveryAddress || 'N/A';
      const deliverAll = order.deliverAllAtOnce ? 'Yes' : 'No';
      
      const items = order.items?.map((i: any) => {
        let text = `${i.productId?.name || 'Item'} (x${i.quantity})`;
        if (i.selectedVariant) text += ` - ${i.selectedVariant}`;
        if (i.selectedAddons && i.selectedAddons.length > 0) text += ` + [${i.selectedAddons.join(', ')}]`;
        if (i.frequency) text += ` (${i.frequency})`;
        return text;
      }).join(' | ') || '';

      await this.sheetsApi.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:M`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [date, order._id.toString(), customer, email, phone, amount, paymentStatus, status, deliveryMethod, address, isSub ? 'Yes' : 'No', deliverAll, items]
          ],
        },
      });
      this.logger.log(`Order ${order._id} successfully logged to Google Sheets sheet ${sheetName}`);
    } catch (error) {
      this.logger.error('Failed to append row to Google Sheets', error);
    }
  }
}
