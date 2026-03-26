import { Module } from '@nestjs/common';
import { VapiService } from './vapi.service';
import { VapiController } from './vapi.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VapiController],
  providers: [VapiService],
  exports: [VapiService],
})
export class VapiModule {}
