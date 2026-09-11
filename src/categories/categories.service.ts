import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    return this.categoryModel.find().sort({ sortOrder: 1, name: 1 }).exec();
  }

  async findActive() {
    return this.categoryModel.find({ isActive: true }).sort({ sortOrder: 1, name: 1 }).exec();
  }

  async findById(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async create(data: Partial<Category>) {
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(id: string, data: Partial<Category>) {
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    return this.categoryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
