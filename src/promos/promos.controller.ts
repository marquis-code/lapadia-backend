import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PromosService } from './promos.service';

@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Post()
  create(@Body() createPromoDto: any) {
    return this.promosService.create(createPromoDto);
  }

  @Get()
  findAll() {
    return this.promosService.findAll();
  }

  @Get('validate/:code')
  validate(@Param('code') code: string) {
    return this.promosService.validate(code);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promosService.remove(id);
  }
}
