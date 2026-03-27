import { Controller, Post, Body, Param } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('api/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post(':userid')
  async chat(
    @Param('userid') userId: string,
    @Body() dto: ChatRequestDto,
  ) {
    return this.chatbotService.getChatResponse(userId, dto.message);
  }
}