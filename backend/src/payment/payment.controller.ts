import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { SessionGuard } from '../auth/session.guard';
import { User } from '../auth/user.decorator';
import { SubscriptionTier } from '../generated/prisma';

@Controller('api/payment')
@UseGuards(SessionGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize')
  async initialize(@User('id') userId: string, @Body('tier') tier: SubscriptionTier) {
    return this.paymentService.initializeSubscription(userId, tier || SubscriptionTier.STARTER);
  }

  @Get('verify/:reference')
  async verify(@Param('reference') reference: string) {
    return this.paymentService.verifySubscription(reference);
  }
}
