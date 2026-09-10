import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCode, PromoCodeDocument } from './schemas/promo.schema';

@Injectable()
export class PromosService {
  constructor(
    @InjectModel(PromoCode.name) private promoModel: Model<PromoCodeDocument>,
  ) {}

  async create(createData: any) {
    const newPromo = new this.promoModel(createData);
    return newPromo.save();
  }

  async findAll() {
    return this.promoModel.find().sort({ createdAt: -1 }).exec();
  }

  async validate(code: string) {
    const promo = await this.promoModel.findOne({ code: code.toUpperCase() });
    
    if (!promo) {
      throw new NotFoundException('Promo code not found');
    }

    if (!promo.isActive) {
      throw new BadRequestException('Promo code is inactive');
    }

    if (promo.maxUses && promo.usageCount >= promo.maxUses) {
      throw new BadRequestException('Promo code usage limit reached');
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      throw new BadRequestException('Promo code has expired');
    }

    return promo;
  }

  async incrementUsage(code: string) {
    return this.promoModel.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usageCount: 1 } },
      { new: true }
    );
  }

  async remove(id: string) {
    return this.promoModel.findByIdAndDelete(id);
  }
}
