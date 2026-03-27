import { Module } from '@nestjs/common';
import { VapiService } from './vapi.service';
import { VapiController } from './vapi.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [PrismaModule, WhatsAppModule],
  controllers: [VapiController],
  providers: [VapiService],
  exports: [VapiService],
})
export class VapiModule {}
