import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://busier-desk-kjo5.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();