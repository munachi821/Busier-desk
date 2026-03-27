// src/notification/notification.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: NotificationGateway,
  ) {}

  /**
   * Creates a notification in the DB and pushes it live to the user.
   * Call this from any other service (CallService, LeadService, etc.)
   */
  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: dto.userId,
        type: dto.type,
        title: dto.title,
        body: dto.body,
        metadata: (dto.metadata as Prisma.InputJsonValue) ?? ({} as Prisma.InputJsonValue),
      },
    });

    // Push to connected frontend immediately
    this.gateway.sendToUser(dto.userId, notification);

    return notification;
  }

  /**
   * Get all notifications for a user.
   * Pass unreadOnly=true to filter unread ones.
   */
  async findAll(userId: string, query: QueryNotificationDto) {
    return this.prisma.notification.findMany({
      where: {
        userId,
        ...(query.unreadOnly ? { read: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Returns the count of unread notifications — useful for a badge.
   */
  async unreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, read: false },
    });
    return { count };
  }

  /**
   * Mark a single notification as read.
   */
  async markOneRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId }, // userId guard prevents reading other users' data
      data: { read: true },
    });
  }

  /**
   * Mark ALL notifications for a user as read.
   */
  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  /**
   * Delete a single notification.
   */
  async remove(id: string, userId: string) {
    return this.prisma.notification.deleteMany({
      where: { id, userId },
    });
  }
}