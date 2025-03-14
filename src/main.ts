import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // buffer the logs to avoid any issues with the logger
  });
  // use the my logger service to log the messages
  app.useLogger(app.get(MyLoggerService));
  // enable cors to allow the api to be accessed from the frontend
  // this will allow the api to be accesssed by any origin
  app.enableCors();
  // set the global prefix for the api
  app.setGlobalPrefix('api');
  // use global pipes to validate the data
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
