import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      const initialProducts = [
        { name: 'Organic Red Apples', description: 'Fresh, sweet, and crisp.', price: 4.99, imageUrl: 'default', category: 'Fruits', stock: 50, icon: '🍎' },
        { name: 'Fresh Bananas', description: 'Yellow and ripe.', price: 2.99, imageUrl: 'default', category: 'Fruits', stock: 100, icon: '🍌' },
        { name: 'Whole Milk', description: '1 Gallon of whole milk.', price: 3.49, imageUrl: 'default', category: 'Dairy', stock: 30, icon: '🥛' },
        { name: 'Sourdough Bread', description: 'Freshly baked.', price: 5.99, imageUrl: 'default', category: 'Pantry', stock: 20, icon: '🍞' },
        { name: 'Free Range Eggs', description: '1 Dozen large eggs.', price: 4.50, imageUrl: 'default', category: 'Dairy', stock: 40, icon: '🥚' },
        { name: 'Avocado', description: 'Perfectly ripe avocado.', price: 1.99, imageUrl: 'default', category: 'Produce', stock: 60, icon: '🥑' },
        { name: 'Carrots', description: 'Crunchy organic carrots.', price: 2.49, imageUrl: 'default', category: 'Produce', stock: 80, icon: '🥕' },
        { name: 'Chicken Breast', description: 'Boneless, skinless chicken.', price: 8.99, imageUrl: 'default', category: 'Meat', stock: 25, icon: '🥩' },
      ];
      await this.productModel.insertMany(initialProducts);
      console.log('Seeded initial products');
    }
  }

  async findAll(limit?: number, trending?: boolean) {
    let query = this.productModel.find();
    
    if (trending) {
      // For trending, let's sort by stock descending (or whichever criteria makes sense)
      query = query.sort({ stock: -1 });
    } else {
      query = query.sort({ _id: -1 });
    }

    if (limit) {
      query = query.limit(limit);
    }
    return query.exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async create(data: any) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, data: any) {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
