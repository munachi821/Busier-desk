// src/auth/auth.controller.ts
import { All, Controller, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All('*path')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    const protocol = req.protocol ?? 'http';
    const host = req.headers.host ?? 'localhost';
    const url = `${protocol}://${host}${req.originalUrl}`;

    const body =
      req.method !== 'GET' && req.method !== 'HEAD'
        ? JSON.stringify(req.body)
        : undefined;

    const webRequest = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body,
    });

    const response = await this.authService.instance.handler(webRequest);

    response.headers.forEach((value: string, key: string) =>
      res.setHeader(key, value),
    );
    res.status(response.status).send(await response.text());
  }
}