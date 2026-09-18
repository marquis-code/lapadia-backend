import { Controller, Get, Post, Delete, Param, Request, Body, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private extractUserId(req: any): string {
    const authHeader = req.headers.authorization;
    let userId = req.headers['x-user-id']; 
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.userId) userId = payload.userId;
        if (payload.sub) userId = payload.sub;
      } catch(e) {}
    }
    return userId;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('favorites/:productId')
  async addFavorite(@Param('productId') productId: string, @Request() req: any) {
    const userId = this.extractUserId(req);
    if (!userId) throw new UnauthorizedException('Unauthorized');
    try {
      return await this.usersService.addFavorite(userId, productId);
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete('favorites/:productId')
  async removeFavorite(@Param('productId') productId: string, @Request() req: any) {
    const userId = this.extractUserId(req);
    if (!userId) throw new UnauthorizedException('Unauthorized');
    try {
      return await this.usersService.removeFavorite(userId, productId);
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  @Get('favorites')
  async getFavorites(@Request() req: any) {
    const userId = this.extractUserId(req);
    if (!userId) throw new UnauthorizedException('Unauthorized');
    try {
      return await this.usersService.getFavorites(userId);
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  @Post('profile')
  async updateProfile(@Body() body: any, @Request() req: any) {
    const userId = this.extractUserId(req);
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.usersService.updateProfile(userId, { name: body.name, phone: body.phone, alternativePhone: body.alternativePhone, savedAddresses: body.savedAddresses });
  }
}
