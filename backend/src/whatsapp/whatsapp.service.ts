import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsAppService {
  private client: Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    
    if (accountSid && authToken) {
      try {
        this.client = new Twilio(accountSid, authToken);
      } catch (error) {
        console.error('[WhatsApp] Twilio initialization failed:', error.message);
      }
    }
  }

  async sendFollowUp(to: string, message: string) {
    const from = this.configService.get<string>('TWILIO_WHATSAPP_NUMBER');

    if (!this.client || !from) {
      console.warn('[WhatsApp] Twilio not configured. Message would be:', message);
      return { success: false, error: 'Twilio not configured' };
    }

    try {
      // Ensure the 'to' number is in E.164 format and prefixed with 'whatsapp:'
      const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      const formattedFrom = from.startsWith('whatsapp:') ? from : `whatsapp:${from}`;

      const response = await this.client.messages.create({
        body: message,
        from: formattedFrom,
        to: formattedTo,
      });

      console.log(`[WhatsApp] Message sent to ${to}. SID: ${response.sid}`);
      return { success: true, sid: response.sid };
    } catch (error) {
      console.error(`[WhatsApp] Error sending message to ${to}:`, error);
      return { success: false, error: error.message };
    }
  }
}
