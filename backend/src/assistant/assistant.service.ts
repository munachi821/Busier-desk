import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssistantService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { name: string; systemPrompt?: string; firstMessage?: string; vapiAssistantId?: string }) {
    return this.prisma.businessAssistant.upsert({
      where: { userId },
      update: {
        name: data.name,
        systemPrompt: data.systemPrompt,
        firstMessage: data.firstMessage,
        vapiAssistantId: data.vapiAssistantId,
      },
      create: {
        userId,
        name: data.name,
        systemPrompt: data.systemPrompt,
        firstMessage: data.firstMessage,
        vapiAssistantId: data.vapiAssistantId,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.businessAssistant.findUnique({
      where: { userId },
      include: { 
        faqs: true, 
        products: true, 
        resourceLinks: true,
        user: {
          include: { transactions: { orderBy: { createdAt: 'desc' }, take: 10 } }
        }
      },
    });
  }

  async updateVapiId(assistantId: string, vapiAssistantId: string) {
    return this.prisma.businessAssistant.update({
      where: { id: assistantId },
      data: { vapiAssistantId },
    });
  }

  async getCalls(userId: string) {
    const assistant = await this.findByUserId(userId);
    if (!assistant) return [];
    
    return this.prisma.call.findMany({
      where: { assistantId: assistant.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLeads(userId: string) {
    return this.prisma.lead.findMany({
      where: { businessId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
