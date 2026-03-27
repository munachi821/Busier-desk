import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AssistantModule } from '../assistant/assistant.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AssistantModule, AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
