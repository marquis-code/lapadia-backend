import { Controller, Get, Post, Body } from '@nestjs/common';
import { FinancesService } from './finances.service';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Get('overview')
  async getOverview() {
    return this.financesService.getOverview();
  }

  @Get('transactions')
  async getTransactions() {
    return this.financesService.getTransactions();
  }

  @Post('request-payout')
  async requestPayout(@Body() body: { amount: number }) {
    try {
      const payout = await this.financesService.requestPayout(body.amount);
      return { success: true, payout };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}
