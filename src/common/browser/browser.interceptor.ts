import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const userAgent = req.header('user-agent')
    console.log(`Browser: ${userAgent}`)
    const browserAgent = userAgent || 'unknown'
    req.headers.browser = browserAgent
    return next.handle();
  }
}
