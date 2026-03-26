// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

  const port = process.env.PORT || 3000;
  async function bootstrap() {
    


  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });



  // Manually apply body parsers so req.body is populated
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.enableCors({
    origin: ['http://localhost:5173', 'https://busier-desk-kjo5.vercel.app/'],
    credentials: true,
  })

  await app.listen(port, "0.0.0.0");
}
bootstrap();