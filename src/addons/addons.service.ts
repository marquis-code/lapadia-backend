import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Addon, AddonDocument } from './schemas/addon.schema';
import { AddonCategory, AddonCategoryDocument } from './schemas/addon-category.schema';

@Injectable()
export class AddonsService {
  constructor(
    @InjectModel(Addon.name) private addonModel: Model<AddonDocument>,
    @InjectModel(AddonCategory.name) private addonCategoryModel: Model<AddonCategoryDocument>,
  ) {}

  // Categories
  async getCategories() {
    return this.addonCategoryModel.find().exec();
  }

  async createCategory(data: any) {
    const createdCategory = new this.addonCategoryModel(data);
    return createdCategory.save();
  }

  async updateCategory(id: string, data: any) {
    const updated = await this.addonCategoryModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async deleteCategory(id: string) {
    const deleted = await this.addonCategoryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Category not found');
    // Optionally, delete or unset category from addons
    await this.addonModel.deleteMany({ categoryId: id });
    return deleted;
  }

  // Addons
  async getAddons() {
    return this.addonModel.find().populate('categoryId').exec();
  }
  
  async getAddonsByCategory(categoryId: string) {
    return this.addonModel.find({ categoryId }).populate('categoryId').exec();
  }

  async createAddon(data: any) {
    const createdAddon = new this.addonModel(data);
    return createdAddon.save();
  }

  async updateAddon(id: string, data: any) {
    const updated = await this.addonModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Addon not found');
    return updated;
  }

  async deleteAddon(id: string) {
    const deleted = await this.addonModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Addon not found');
    return deleted;
  }
}
