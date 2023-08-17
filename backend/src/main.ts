import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase the payload size limit
  app.use(express.json({ limit: '10mb' }));

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(4000);
}

bootstrap();
