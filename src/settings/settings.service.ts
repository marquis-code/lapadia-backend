import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async onModuleInit() {
    await this.ensureSettingsExist();
  }

  async ensureSettingsExist() {
    const count = await this.settingModel.countDocuments();
    if (count === 0) {
      const defaultSettings = new this.settingModel({ expressDeliveryFee: 1500 });
      await defaultSettings.save();
    }
  }

  async getSettings(): Promise<SettingDocument> {
    let settings = await this.settingModel.findOne().exec();
    if (!settings) {
      settings = await new this.settingModel({ expressDeliveryFee: 1500 }).save();
    }
    return settings;
  }

  async updateSettings(updateData: { expressDeliveryFee?: number }): Promise<SettingDocument> {
    const settings = await this.getSettings();
    if (updateData.expressDeliveryFee !== undefined) {
      settings.expressDeliveryFee = updateData.expressDeliveryFee;
    }
    return settings.save();
  }
}
