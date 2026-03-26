import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AssistantService } from './assistant.service';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  async create(@Body() data: any) {
    // TODO: Get userId from session/auth
    const userId = "placeholder-user-id"; 
    return this.assistantService.create(userId, data);
  }

  @Get()
  async getAssistant() {
    const userId = "placeholder-user-id";
    return this.assistantService.findByUserId(userId);
  }

  @Get('calls')
  async getCalls() {
    const userId = "placeholder-user-id";
    return this.assistantService.getCalls(userId);
  }
}
