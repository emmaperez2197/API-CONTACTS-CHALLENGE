import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from './error.response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const defaultHttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    // Initialize default error properties
    let message = exception.message ?? 'Internal server error';
    let httpStatus = defaultHttpStatus;

    if (exception instanceof HttpException) {
      message = (exception.getResponse() as { message: string })?.message;
      httpStatus = exception.getStatus();
    }

    if (exception.codeName === 'DuplicateKey') {
      const fields = Object.keys(exception.keyValue);
      message = `Document with ${JSON.stringify(fields)} fields already exists`;
      httpStatus = HttpStatus.BAD_REQUEST;
    }

    const responseBody: ErrorResponse = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter?.getRequestUrl(ctx.getRequest()) ?? '',
      message,
    };

    httpAdapter?.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
