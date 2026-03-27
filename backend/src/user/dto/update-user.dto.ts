// src/user/dto/update-user.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsUrl()
  @IsOptional()
  image?: string;
}