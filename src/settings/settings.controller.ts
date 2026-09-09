import { Controller, Get, Put, Body, Request, UnauthorizedException } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() body: any, @Request() req: any) {
    // In a real application, you would verify the admin role.
    // For this prototype, we'll allow updates.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Admin token required');
    }
    
    return this.settingsService.updateSettings({
      expressDeliveryFee: body.expressDeliveryFee,
    });
  }
}
