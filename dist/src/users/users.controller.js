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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async addFavorite(productId, req) {
        const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2';
        return this.usersService.addFavorite(userId, productId);
    }
    async removeFavorite(productId, req) {
        const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2';
        return this.usersService.removeFavorite(userId, productId);
    }
    async getFavorites(req) {
        const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2';
        return this.usersService.getFavorites(userId);
    }
    async updateProfile(body, req) {
        const authHeader = req.headers.authorization;
        let userId = req.headers['x-user-id'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                if (payload.userId)
                    userId = payload.userId;
                if (payload.sub)
                    userId = payload.sub;
            }
            catch (e) { }
        }
        if (!userId) {
            throw new Error('Unauthorized');
        }
        return this.usersService.updateProfile(userId, { name: body.name, phone: body.phone, savedAddresses: body.savedAddresses });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('favorites/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)('favorites/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Get)('favorites'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map