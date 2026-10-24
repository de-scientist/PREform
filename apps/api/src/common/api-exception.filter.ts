import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const adapter = host.getHttpAdapter();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const response =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    const message = this.getMessage(exception, response, status);
    const error = HttpStatus[status] ?? 'Error';
    const request = http.getRequest<{ url?: string }>();

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const name = exception instanceof Error ? exception.name : 'UnknownError';
      this.logger.error(`Unhandled request error: ${name} (${status})`);
    }

    adapter.reply(
      http.getResponse(),
      {
        statusCode: status,
        error,
        message,
        path: request.url ?? '/',
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }

  private getMessage(
    exception: unknown,
    response: string | object | undefined,
    status: number,
  ): string {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return 'Internal server error';
    }

    if (typeof response === 'string') {
      return response;
    }

    if (response && typeof response === 'object' && 'message' in response) {
      const message = response.message;
      if (typeof message === 'string') {
        return message;
      }
      if (Array.isArray(message) && message.every((item) => typeof item === 'string')) {
        return message.join('; ');
      }
    }

    return exception instanceof HttpException
      ? exception.message
      : 'Request failed';
  }
}
