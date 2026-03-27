import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAssistantDto } from './dto/update-assistant.dto';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  // Get or Create the Assistant for the logged-in user
  async getOrCreateAssistant(userId: string) {
    let assistant = await this.prisma.businessAssistant.findUnique({
      where: { userId },
      include: { context: true, products: true, faqs: true },
    });

    if (!assistant) {
      assistant = await this.prisma.businessAssistant.create({
        data: {
          userId,
          name: 'My AI Assistant',
          firstMessage: 'Hello! How can I help your business today?',
        },
        include: { context: true, products: true, faqs: true },
      });
    }
    return assistant;
  }

  async updateAssistant(userId: string, dto: UpdateAssistantDto) {
    return this.prisma.businessAssistant.update({
      where: { userId },
      data: dto,
    });
  }

  async updateContext(userId: string, content: string) {
    const assistant = await this.getOrCreateAssistant(userId);
    return this.prisma.businessContext.upsert({
      where: { assistantId: assistant.id },
      update: { content },
      create: { assistantId: assistant.id, content },
    });
  }
}