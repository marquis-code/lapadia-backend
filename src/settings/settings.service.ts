import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class SettingsService implements OnModuleInit {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async onModuleInit() {
    await this.ensureSettingsExist();
  }

  async ensureSettingsExist() {
    const allSettings = await this.settingModel.collection.find({}).toArray();
    if (allSettings.length === 0) {
      const defaultSettings = new this.settingModel({});
      await defaultSettings.save();
      this.logger.log('Created default settings document');
    } else if (allSettings.length > 1) {
      const idsToDelete = allSettings.slice(1).map(s => s._id);
      await this.settingModel.collection.deleteMany({ _id: { $in: idsToDelete } });
      this.logger.warn(`Removed ${idsToDelete.length} duplicate settings documents`);
    }
  }

  async getSettings() {
    let settings = await this.settingModel.collection.findOne({});
    if (!settings) {
      const defaultSettings = new this.settingModel({});
      const saved = await defaultSettings.save();
      settings = await this.settingModel.collection.findOne({ _id: saved._id });
    }
    return settings;
  }

  async updateSettings(updateData: any) {
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.__v;

    let settings = await this.getSettings();
    
    if (!settings) return null;

    // Use native driver update
    await this.settingModel.collection.updateOne(
      { _id: new ObjectId(settings._id.toString()) },
      { $set: updateData }
    );

    const updatedSettings = await this.settingModel.collection.findOne({ _id: new ObjectId(settings._id.toString()) });
    return updatedSettings;
  }
}
