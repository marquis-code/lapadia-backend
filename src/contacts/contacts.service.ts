import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage, ContactMessageDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(ContactMessage.name) private contactModel: Model<ContactMessageDocument>
  ) {}

  async create(data: Partial<ContactMessage>): Promise<ContactMessage> {
    const newContact = new this.contactModel(data);
    return newContact.save();
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<ContactMessage> {
    const contact = await this.contactModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();

    if (!contact) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }

    return contact;
  }
}
