import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Catch()
export class MetricsExceptionFilter implements ExceptionFilter {
  constructor(private readonly metrics: MetricsService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const exceptionType =
      exception instanceof Error ? exception.constructor.name : typeof exception;

    this.metrics.unhandledExceptionsTotal.inc({ exception_type: exceptionType });

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
    });
  }
}
