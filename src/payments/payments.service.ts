import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private secretKey: string;
  private baseUrl = 'https://api.paystack.co';

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  private async fetchPaystack(endpoint: string, method: string, body?: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.json();
  }

  async initializeTransaction(email: string, amount: number, reference: string, channels?: string[], callbackUrl?: string) {
    return this.fetchPaystack('/transaction/initialize', 'POST', {
      email,
      amount: amount * 100, // Paystack uses kobo
      reference,
      channels,
      callback_url: callbackUrl || this.configService.get<string>('PAYSTACK_CALLBACK_URL') || 'http://localhost:3000/checkout/callback'
    });
  }

  async verifyTransaction(reference: string) {
    return this.fetchPaystack(`/transaction/verify/${reference}`, 'GET');
  }

  async chargeAuthorization(authCode: string, email: string, amount: number) {
    return this.fetchPaystack('/transaction/charge_authorization', 'POST', {
      authorization_code: authCode,
      email,
      amount: amount * 100,
    });
  }
}
