import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VapiService {
  constructor(private prisma: PrismaService) {}

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
        // Save call log
        await this.prisma.call.create({
          data: {
            vapiCallId: call.id,
            assistantId: assistant.id,
            customerNumber: call.customer?.number || 'unknown',
            summary: summary || null,
            transcript: transcript || null,
            recordingUrl: recordingUrl || null,
            intent: analysis?.structuredData?.intent || null,
            status: 'completed',
          },
        });

        // Capture lead
        await this.prisma.lead.create({
          data: {
            businessId: assistant.userId, // Link to business owner
            name: call.customer?.name || null,
            phoneNumber: call.customer?.number || 'unknown',
            intent: analysis?.structuredData?.intent || null,
          },
        });

        console.log(`Call logged and lead captured for assistant: ${assistant.id}`);
      } else {
        console.warn(`No assistant found for Vapi Assistant ID: ${call.assistantId}`);
      }
    }

    return { status: 'received' };
  }
}
