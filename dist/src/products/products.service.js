"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
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
    async findAll(limit) {
        let query = this.productModel.find();
        if (limit) {
            query = query.limit(limit);
        }
        return query.exec();
    }
    async findOne(id) {
        return this.productModel.findById(id).exec();
    }
    async create(data) {
        const newProduct = new this.productModel(data);
        return newProduct.save();
    }
    async update(id, data) {
        return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map