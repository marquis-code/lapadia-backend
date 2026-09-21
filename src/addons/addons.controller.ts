import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AddonsService } from './addons.service';

@Controller('addons')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  // Categories
  @Get('categories')
  async getCategories() {
    return this.addonsService.getCategories();
  }

  @Post('categories')
  async createCategory(@Body() body: any) {
    return this.addonsService.createCategory(body);
  }

  @Put('categories/:id')
  async updateCategory(@Param('id') id: string, @Body() body: any) {
    return this.addonsService.updateCategory(id, body);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.addonsService.deleteCategory(id);
  }

  // Addons
  @Get()
  async getAddons(@Query('categoryId') categoryId?: string) {
    if (categoryId) {
      return this.addonsService.getAddonsByCategory(categoryId);
    }
    return this.addonsService.getAddons();
  }

  @Post()
  async createAddon(@Body() body: any) {
    return this.addonsService.createAddon(body);
  }

  @Put(':id')
  async updateAddon(@Param('id') id: string, @Body() body: any) {
    return this.addonsService.updateAddon(id, body);
  }

  @Delete(':id')
  async deleteAddon(@Param('id') id: string) {
    return this.addonsService.deleteAddon(id);
  }
}
