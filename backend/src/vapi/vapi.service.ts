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
    
    // Vapi sends different message types. 'end-of-call-report' is usually best for summary.
    const message = payload.message;
    
    if (message?.type === 'end-of-call-report') {
      const { call, summary, transcript, recordingUrl, analysis } = message;

      // Find the business assistant that matches the Vapi Assistant ID
      const assistant = await this.prisma.businessAssistant.findUnique({
        where: { vapiAssistantId: call.assistantId },
      });

      if (assistant) {
        const intent = analysis?.structuredData?.intent || null;
        const customerNumber = call.customer?.number || 'unknown';

        // Save call log
        await this.prisma.call.create({
          data: {
            vapiCallId: call.id,
            assistantId: assistant.id,
            customerNumber,
            summary: summary || null,
            transcript: transcript || null,
            recordingUrl: recordingUrl || null,
            intent,
            status: 'completed',
          },
        });

        // Capture lead
        await this.prisma.lead.create({
          data: {
            userId: assistant.userId, // Link to business owner
            name: call.customer?.name || null,
            phone: customerNumber,
            intent,
          },
        });

        // WhatsApp Follow-up (example logic: only if intent is captured)
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
