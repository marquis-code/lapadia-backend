import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const adminEmail = 'admin@lapadia.com';
    const existingAdmin = await this.userModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        name: 'Lapadia Admin',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      console.log('Admin user seeded (admin@lapadia.com / admin123)');
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: any): Promise<UserDocument> {
    const { name, email, password } = userData;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      name,
      email,
      passwordHash,
      role: 'user',
    });
    return user.save();
  }

  async updateProfile(userId: string, data: { name?: string; phone?: string; savedAddresses?: any[] }) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).select('-passwordHash');
  }

  async updatePaystackCustomer(userId: string, customerCode: string, authCode: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      paystackCustomerCode: customerCode,
      paystackAuthCode: authCode,
    });
  }

  async findAll() {
    return this.userModel.find().select('-passwordHash').exec();
  }

  async addFavorite(userId: string, productId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: productId } },
      { new: true }
    ).populate('favorites');
  }

  async removeFavorite(userId: string, productId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: productId } },
      { new: true }
    ).populate('favorites');
  }

  async getFavorites(userId: string) {
    const user = await this.userModel.findById(userId).populate('favorites').exec();
    return user ? user.favorites : [];
  }
}
