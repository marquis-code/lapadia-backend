import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() updateData: any) {
    return this.settingsService.updateSettings(updateData);
  }
}
