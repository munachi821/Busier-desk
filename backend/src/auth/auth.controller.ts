import { Controller, Post, Req } from '@nestjs/common';
import { auth } from './auth';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Req() req) {
    return (auth.api as any).signUp({ body: req.body });
  }

  @Post('login')
  async login(@Req() req) {
    return (auth.api as any).signIn({ body: req.body });
  }
}