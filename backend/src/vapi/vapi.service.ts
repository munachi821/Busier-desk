import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';

@Injectable()
export class VapiService {
  constructor(
    private prisma: PrismaService,
    private whatsapp: WhatsAppService,
  ) {}

  async handleWebhook(payload: any) {
    console.log('Vapi Webhook Received:', JSON.stringify(payload, null, 2));

    const message = payload.message;

    if (message?.type === 'end-of-call-report') {
      const { call, summary, transcript, recordingUrl, analysis } = message;

      const assistant = await this.prisma.businessAssistant.findUnique({
        where: { vapiAssistantId: call.assistantId },
      });

      if (assistant) {
        const intent = analysis?.structuredData?.intent || null;
        const customerNumber = call.customer?.number || 'unknown';

        // Create lead FIRST so we have the leadId
        const lead = await this.prisma.lead.create({
          data: {
            businessId: assistant.userId,
            name: call.customer?.name || null,
            phoneNumber: customerNumber,
            intent,
          },
        });

        // Then create call using lead.id
        await this.prisma.call.create({
          data: {
            vapiCallId: call.id,
            leadId: lead.id,
            assistantId: assistant.id,
            customerNumber: customerNumber,
            summary: summary || null,
            transcript: transcript || null,
            recordingUrl: recordingUrl || null,
            intent,
            status: 'completed',
          },
        });

        if (intent && customerNumber !== 'unknown') {
          const followUpMessage = `Hello! This is ${assistant.name}. Thanks for calling! I've noted your interest in "${intent}". How else can I help?`;
          await this.whatsapp.sendFollowUp(customerNumber, followUpMessage);
        }

        console.log(`Call logged and lead captured for assistant: ${assistant.id}`);
      } else {
        console.warn(`No assistant found for Vapi Assistant ID: ${call.assistantId}`);
      }
    }

    return { status: 'received' };
  }
}