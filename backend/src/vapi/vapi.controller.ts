import { Controller, Post, Body } from '@nestjs/common';
import { VapiService } from './vapi.service';

@Controller('api/vapi')
export class VapiController {
  constructor(private readonly vapiService: VapiService) {}

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.vapiService.handleWebhook(payload);
  }
}
