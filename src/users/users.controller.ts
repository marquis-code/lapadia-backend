import { Controller, Get, Post, Delete, Param, UseGuards, Request, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Assuming we use a simple header check for the demo, or mock a user ID if no guard
  // In a real app we would use @UseGuards(JwtAuthGuard)
  @Post('favorites/:productId')
  async addFavorite(@Param('productId') productId: string, @Request() req: any) {
    const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2'; // Fallback to mock user ID if not provided
    return this.usersService.addFavorite(userId, productId);
  }

  @Delete('favorites/:productId')
  async removeFavorite(@Param('productId') productId: string, @Request() req: any) {
    const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2';
    return this.usersService.removeFavorite(userId, productId);
  }

  @Get('favorites')
  async getFavorites(@Request() req: any) {
    const userId = req.headers['x-user-id'] || '64c8f5b8e4b0e5d9f0a2c1b2';
    return this.usersService.getFavorites(userId);
  }

  @Post('profile') // Use POST or PUT
  async updateProfile(@Body() body: any, @Request() req: any) {
    // Basic JWT decoding without needing full AuthGuard setup for now
    const authHeader = req.headers.authorization;
    let userId = req.headers['x-user-id']; // Fallback
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.userId) userId = payload.userId;
        if (payload.sub) userId = payload.sub;
      } catch(e) {}
    }

    if (!userId) {
      throw new Error('Unauthorized');
    }

    return this.usersService.updateProfile(userId, { name: body.name, phone: body.phone, savedAddresses: body.savedAddresses });
  }
}
