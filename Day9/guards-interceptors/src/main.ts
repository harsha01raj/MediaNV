/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { InterceptorLoggerInterceptor } from './interceptor-logger/interceptor-logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  app.useGlobalInterceptors(new InterceptorLoggerInterceptor)
  app.useGlobalFilters(new HttpExceptionFilter());
  //Apply Globally filter or i have applied with with module too.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
