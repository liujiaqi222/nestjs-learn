import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // 可以指定要捕获的具体异常，不指定就是捕获全部异常
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const switchToHttp = host.switchToHttp();
    const res = switchToHttp.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : 500;
    res.status(statusCode); // 设置响应码
    res.json({
      message: isHttpException ? exception['message'] : 'Internal server error',
      statusCode,
      timestamp: new Date().toISOString(),
      path: switchToHttp.getRequest<Request>().url,
    });
  }
}
