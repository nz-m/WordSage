import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration for Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('WordSage API')
    .setDescription('The WordSage API description')
    .setVersion('1.0')
    .addTag('wordsage')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  // Configuration for payload size limit
  const payloadSizeLimit = '10mb';

  // Apply middleware before starting the app
  app.use(express.json({ limit: payloadSizeLimit }));

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  const PORT = 4000;
  await app.listen(PORT);
  console.log(`Application is running on port ${PORT}`);
}

bootstrap();
