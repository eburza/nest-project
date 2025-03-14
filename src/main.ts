import 'reflect-metadata';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exeptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors to allow the api to be accessed from the frontend
  // this will allow the api to be accesssed by any origin
  app.enableCors();
  // set the global prefix for the api
  app.setGlobalPrefix('api');
  // use global pipes to validate the data
  app.useGlobalPipes(new ValidationPipe());
  // use the all exceptions filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // listen for requests
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
