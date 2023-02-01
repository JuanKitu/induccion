import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import _ from 'lodash';
@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly isProd: boolean) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    //const status = exception.getStatus();
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
    let message: string | object;
    let detail: string | object;
    let exceptionStack;
    if (!this.isProd) {
      exceptionStack = 'stack' in exception ? exception.stack : '';
    }
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = HttpStatus[exception.getStatus()];
      const exMessage = getErrorMessage(
        exception.getResponse(),
        exception.getStatus(),
      );
      message = exMessage.message;
    } else {
      const error = exception as any;
      message = error.message;
      detail = error.detail;
    }
    response.status(status).json({
      meta: {
        url: request.url,
        method: request.method,
        status,
      },
      data: null,
      message,
      detail,
      exceptionStack,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
function getErrorMessage(error, code) {
  let message;
  let detail;
  if (typeof error === 'string') {
    message = error;
  } else if (_.isArray(error.message)) {
    message = HttpStatus[code];
    detail = _.map(error.message, (_message) => ({ message: _message }));
  } else {
    message = HttpStatus[code];
    detail = error.errors;
  }
  return {
    message,
    detail,
  };
}
