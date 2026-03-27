// src/user/user.controller.ts
import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SessionGuard } from '../auth/session.guard';

@UseGuards(SessionGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Req() req: any) {
    return this.userService.getProfile(req.user.id);
  }

  @Patch('update')
  updateMe(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.id, dto);
  }
}