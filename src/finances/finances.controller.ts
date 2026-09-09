import { Controller, Get } from '@nestjs/common';
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
}
