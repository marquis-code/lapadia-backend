import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactMessage } from './schemas/contact.schema';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() data: Partial<ContactMessage>) {
    return this.contactsService.create(data);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.contactsService.updateStatus(id, status);
  }
}
