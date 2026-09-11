import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(apiKey);
  }

  async sendEmail(to: string, subject: string, html: string, attachments?: any[]) {
    try {
      const response = await this.resend.emails.send({
        from: this.configService.get<string>('RESEND_FROM_EMAIL') || 'Lapadia Fresh <onboarding@resend.dev>',
        to,
        subject,
        html,
        attachments,
      });
      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
