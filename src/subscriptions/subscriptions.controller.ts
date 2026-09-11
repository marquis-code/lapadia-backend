import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('user')
  getUserSubscriptions(@Request() req: any) {
    let userId = req.headers['x-user-id']; // Fallback
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.userId) userId = payload.userId;
        if (payload.sub) userId = payload.sub;
      } catch(e) {}
    }
    if (!userId) throw new Error('Unauthorized');
    return this.subscriptionsService.getUserSubscriptions(userId);
  }

  @Put('user/:id/cancel')
  cancelSubscription(@Param('id') id: string, @Request() req: any, @Body() body: { reason?: string }) {
    let userId = req.headers['x-user-id'];
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.userId) userId = payload.userId;
        if (payload.sub) userId = payload.sub;
      } catch(e) {}
    }
    if (!userId) throw new Error('Unauthorized');
    return this.subscriptionsService.cancelSubscription(id, userId, body.reason);
  }

  @Put('user/:id/swap')
  swapSubscriptionItems(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    let userId = req.headers['x-user-id'];
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.userId) userId = payload.userId;
        if (payload.sub) userId = payload.sub;
      } catch(e) {}
    }
    if (!userId) throw new Error('Unauthorized');
    return this.subscriptionsService.swapSubscriptionItems(id, userId, body.items);
  }

  @Get('plans')
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @Post('plans')
  createPlan(@Body() body: any) {
    return this.subscriptionsService.createPlan(body);
  }

  @Put('plans/:id')
  updatePlan(@Param('id') id: string, @Body() body: any) {
    return this.subscriptionsService.updatePlan(id, body);
  }

  @Delete('plans/:id')
  deletePlan(@Param('id') id: string) {
    return this.subscriptionsService.deletePlan(id);
  }

  @Get('admin/user-subscriptions')
  getAdminUserSubscriptions() {
    // In a real app, verify admin role here
    return this.subscriptionsService.getAdminUserSubscriptions();
  }

  @Put('admin/user-subscriptions/:id/status')
  updateAdminUserSubscriptionStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.subscriptionsService.updateSubscriptionStatus(id, body.status);
  }
}
