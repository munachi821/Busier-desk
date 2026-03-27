// src/business/business.controller.ts
import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { SessionGuard } from '../auth/session.guard';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import { UpdateContextDto } from './dto/update-context.dto';

@UseGuards(SessionGuard)
@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('assistant')
  getAssistant(@Req() req: any) {
    return this.businessService.getOrCreateAssistant(req.user.id);
  }

  @Patch('assistant')
  updateAssistant(@Req() req: any, @Body() dto: UpdateAssistantDto) {
    return this.businessService.updateAssistant(req.user.id, dto);
  }

  @Patch('context')
  updateContext(@Req() req: any, @Body() dto: UpdateContextDto) {
    return this.businessService.updateContext(req.user.id, dto.content);
  }
}