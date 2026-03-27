// src/notification/dto/query-notification.dto.ts

import { IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryNotificationDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  unreadOnly?: boolean;
}