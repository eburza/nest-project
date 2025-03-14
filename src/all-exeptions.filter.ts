import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

// define the response object
// this is formatting the response object to be sent to the client
type ResponseObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

// this is the filter that catches all exceptions
@Catch(HttpException, PrismaClientValidationError)
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  // this is the catch method that catches all exceptions
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // this is the response object that will be sent to the client
    const responseObject: ResponseObject = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      // if the exception is an http exception, set the status code and response
      responseObject.statusCode = exception.getStatus();
      responseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      // if the exception is a prisma client validation error, set the status code and response
      responseObject.statusCode = HttpStatus.BAD_REQUEST;
      responseObject.response = exception.message.replace(/\n/g, '');
    } else {
      // if the exception is not an http exception or a prisma client validation error, set the status code and response
      responseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObject.response = 'Internal server error';
    }
    // send the response to the client
    response.status(responseObject.statusCode).json(responseObject);
    // log the error
    this.logger.error(
      typeof responseObject.response === 'string'
        ? responseObject.response
        : JSON.stringify(responseObject.response),
      AllExceptionsFilter.name,
    );

    // call the parent catch method
    super.catch(exception, host);
  }
}
