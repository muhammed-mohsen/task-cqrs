import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
