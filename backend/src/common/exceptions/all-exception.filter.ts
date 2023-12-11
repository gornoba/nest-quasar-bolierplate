import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { RecordRepository } from '../repositorys/record.repository';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly recordRepository: RecordRepository) {
    super();
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestBody: any = request.body;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as
            | string
            | {
                error: string;
                statusCode: number;
                message: string | string[];
              })
        : exception instanceof QueryFailedError
        ? {
            error: 'Database Error',
            statusCode: status,
            message: exception.message,
          }
        : {
            error: 'Internal Server Error',
            statusCode: status,
            message: exception.message,
          };
    const sessionId = request.session?.id;

    const payload = {
      result: false,
      url: request.url,
      status,
      message:
        typeof error === 'string' ? error : error.error + ' ' + error.message,
      method: request.method,
      session: sessionId,
      created_writer: null, // 나중에 firebase auth로 추가해야함
      body: requestBody ? JSON.stringify(requestBody) : null,
    };

    await this.recordRepository.insertData(payload);
    this.logger.error(payload);

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: typeof error === 'string' ? error : { ...error },
    });
  }
}
