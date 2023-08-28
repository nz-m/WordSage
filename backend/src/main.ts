import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WordSage API')
    .setDescription('The WordSage API description')
    .setVersion('1.0')
    .addTag('wordsage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Increase the payload size limit
  app.use(express.json({ limit: '10mb' }));

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(4000);
}

bootstrap();
