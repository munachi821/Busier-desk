import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsAppService {
  async sendFollowUp(to: string, message: string) {
    console.log(`[WhatsApp Mock] Sending message to ${to}: ${message}`);
    // TODO: Integrate with Twilio WhatsApp API
    return { success: true };
  }
}
