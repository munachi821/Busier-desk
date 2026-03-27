import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionTier } from '../generated/prisma';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly prisma: PrismaService) {}

  private getTierAmount(tier: SubscriptionTier): number {
    switch (tier) {
      case SubscriptionTier.STARTER: return 10000;
      case SubscriptionTier.PRO: return 25000;
      case SubscriptionTier.ENTERPRISE: return 50000;
      default: return 10000;
    }
  }

  async initializeSubscription(userId: string, tier: SubscriptionTier) {
    const amount = this.getTierAmount(tier);
    const reference = `BUSIER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        amount,
        reference,
        tier,
        status: 'PENDING',
      },
    });

    return {
      reference,
      amount: amount * 100, // Kobo
      merchantCode: process.env.INTERSWITCH_MERCHANT_CODE,
      tier,
    };
  }

  async verifySubscription(reference: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { reference },
    });

    if (!transaction) throw new Error('Transaction not found');
    if (transaction.status === 'SUCCESS') return transaction;

    // For Interswitch Webpay, we call the verification API
    // Amount in Kobo for the hash
    const amountInKobo = transaction.amount * 100;
    const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
    
    // In a real scenario, you'd call: 
    // https://webpay.interswitchgroup.com/v1/gettransaction.json?merchantcode=...&transactionreference=...&amount=...
    // But since we're in test mode, we'll simulate the successful response if the reference is valid
    // and ideally we'd check the Interswitch response header/body hash.
    
    // For now, let's reach out to the Interswitch API
    try {
      const url = `https://webpay.interswitchgroup.com/v1/gettransaction.json?merchantcode=${merchantCode}&transactionreference=${reference}&amount=${amountInKobo}`;
      const response = await fetch(url);
      const data: any = await response.json();

      // Interswitch Response Code '00' means success
      if (data.ResponseCode === '00' || process.env.INTERSWITCH_MODE === 'test') {
        const updatedTransaction = await this.prisma.transaction.update({
          where: { reference },
          data: { status: 'SUCCESS' },
        });

        // Update Assistant
        await this.prisma.businessAssistant.update({
          where: { userId: transaction.userId },
          data: {
            isSubscribed: true,
            subscriptionTier: transaction.tier,
            subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
        });

        return updatedTransaction;
      } else {
        await this.prisma.transaction.update({
          where: { reference },
          data: { status: 'FAILED' },
        });
        throw new Error(`Payment failed: ${data.ResponseDescription}`);
      }
    } catch (error) {
      // In TEST mode, if the API call fails or we want to bypass it for local dev:
      if (process.env.INTERSWITCH_MODE === 'test') {
        const updatedTransaction = await this.prisma.transaction.update({
          where: { reference },
          data: { status: 'SUCCESS' },
        });

        await this.prisma.businessAssistant.update({
          where: { userId: transaction.userId },
          data: {
            isSubscribed: true,
            subscriptionTier: transaction.tier,
            subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        return updatedTransaction;
      }
      throw error;
    }
  }
}
