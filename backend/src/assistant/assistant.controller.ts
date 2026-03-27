import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { SessionGuard } from '../auth/session.guard';
import { User } from '../auth/user.decorator';

@Controller('assistant')
@UseGuards(SessionGuard)
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  async create(@User() user: any, @Body() data: any) {
    return this.assistantService.create(user.id, data);
  }

  @Get()
  async getAssistant(@User() user: any) {
    return this.assistantService.findByUserId(user.id);
  }

  @Get('profile')
  async getProfile(@User() user: any) {
    return this.assistantService.findByUserId(user.id);
  }

  @Get('calls')
  async getCalls(@User() user: any) {
    return this.assistantService.getCalls(user.id);
  }

  @Get('leads')
  async getLeads(@User() user: any) {
    return this.assistantService.getLeads(user.id);
  }
}
