import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssistantService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { name: string; systemPrompt?: string; firstMessage?: string }) {
    return this.prisma.businessAssistant.create({
      data: {
        userId,
        name: data.name,
        systemPrompt: data.systemPrompt,
        firstMessage: data.firstMessage,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.businessAssistant.findUnique({
      where: { userId },
      include: { faqs: true, products: true, resourceLinks: true },
    });
  }

  async updateVapiId(assistantId: string, vapiAssistantId: string) {
    return this.prisma.businessAssistant.update({
      where: { id: assistantId },
      data: { vapiAssistantId },
    });
  }
}
