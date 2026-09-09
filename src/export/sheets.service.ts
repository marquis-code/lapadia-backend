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
    
    // In case the user hasn't added the GOOGLE_SHEET_ID to env yet
    if (!this.spreadsheetId) {
      this.spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID');
      if (!this.spreadsheetId) {
        this.logger.warn('GOOGLE_SHEET_ID is not configured. Cannot log order to Sheets.');
        return;
      }
    }

    try {
      const date = new Date(order.createdAt || Date.now()).toLocaleString();
      const customer = order.guestName || order.userId?.name || 'Customer';
      const amount = order.totalAmount;
      const status = order.orderStatus || 'processing';
      const isSub = order.isSubscription;
      const range = isSub ? 'Subscriptions!A:G' : 'Orders!A:G';
      const items = order.items?.map((i: any) => `${i.productId?.name || 'Item'} (x${i.quantity})`).join(', ') || '';

      await this.sheetsApi.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [date, order._id.toString(), customer, amount, status, isSub ? 'Yes' : 'No', items]
          ],
        },
      });
      this.logger.log(`Order ${order._id} successfully logged to Google Sheets range ${range}`);
    } catch (error) {
      this.logger.error('Failed to append row to Google Sheets', error);
    }
  }
}
