import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import slugify from 'slugify';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const slug = slugify(createEventDto.title, { lower: true, strict: true });
    const existing = await this.eventModel.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Math.floor(Math.random() * 10000)}` : slug;

    const newEvent = new this.eventModel({
      ...createEventDto,
      slug: finalSlug,
    });
    return newEvent.save();
  }

  async findAll(status?: string): Promise<Event[]> {
    const query = status ? { status } : {};
    return this.eventModel.find(query).sort({ date: 1 }).exec();
  }

  async findOne(slugOrId: string): Promise<Event> {
    const event = await this.eventModel.findOne({
      $or: [{ slug: slugOrId }, { _id: slugOrId.match(/^[0-9a-fA-F]{24}$/) ? slugOrId : null }],
    }).exec();
    
    if (!event) {
      throw new NotFoundException(`Event with ID/Slug ${slugOrId} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async remove(id: string): Promise<Event> {
    const event = await this.eventModel.findByIdAndDelete(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
