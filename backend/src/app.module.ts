// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VapiModule } from './vapi/vapi.module';
import { AssistantModule } from './assistant/assistant.module';
import { PaymentModule } from './payment/payment.module';
<<<<<<< HEAD
import { MigrationController } from './app/migration.controller';
=======
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';
import { ChatbotModule } from './chatbot/chatbot.module';
>>>>>>> dbd282375793b9117bc24f61f7f33ce6341a2cc6

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    VapiModule,
    AssistantModule,
    PaymentModule,
    NotificationModule,
    UserModule,
    ChatbotModule,
    BusinessModule,
  ],
  controllers: [AppController, MigrationController],
  providers: [AppService],
})
export class AppModule {}