import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('payments/paystack')
export class OrdersWebhookController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() body: any) {
    if (body && body.event === 'charge.success') {
      const reference = body.data?.reference;
      if (reference) {
        // Trigger secure verification process in the background.
        // Calling verifyPayment validates the transaction securely with Paystack's API
        // avoiding the need for manual HMAC signature parsing since we only trust Paystack's own API response.
        this.ordersService.verifyPayment(reference).catch(e => console.error('Webhook verification error:', e));
      }
    }
    
    // Always return 200 OK quickly to acknowledge receipt of the event to Paystack
    return { received: true };
  }
}
