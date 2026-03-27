// src/notification/notification.controller.ts

import {
    Controller,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    Req,
    UseGuards,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { NotificationService } from './notification.service';
  import { QueryNotificationDto } from './dto/query-notification.dto';
  import { Request } from 'express';
import { SessionGuard } from 'src/auth/session.guard';
  
  @UseGuards(SessionGuard)
  @Controller('api/notifications')
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}
  
    /**
     * GET /notifications
     * GET /notifications?unreadOnly=true
     */
    @Get()
    findAll(@Req() req: any, @Query() query: QueryNotificationDto) {
      const userId = req.user.id; // adjust to how your auth guard attaches the user
      return this.notificationService.findAll(userId, query);
    }
  
    /**
     * GET /notifications/unread-count
     * Returns { count: number } — useful for the bell badge
     */
    @Get('unread-count')
    unreadCount(@Req() req: any) {
      return this.notificationService.unreadCount(req.user.id);
    }
  
    /**
     * PATCH /notifications/read-all
     * Marks every notification for this user as read
     */
    @Patch('read-all')
    @HttpCode(HttpStatus.OK)
    markAllRead(@Req() req: any) {
      return this.notificationService.markAllRead(req.user.id);
    }
  
    /**
     * PATCH /notifications/:id/read
     * Marks a single notification as read
     */
    @Patch(':id/read')
    markOneRead(@Param('id') id: string, @Req() req: any) {
      return this.notificationService.markOneRead(id, req.user.id);
    }
  
    /**
     * DELETE /notifications/:id
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string, @Req() req: any) {
      return this.notificationService.remove(id, req.user.id);
    }
  }