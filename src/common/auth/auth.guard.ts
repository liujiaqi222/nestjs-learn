import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // 声明需要的依赖，通过Dependency Injection 注入到类中
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    this.logger.info('auth guard 调用');
    const apiKey = req.header('x-api-key');
    // 硬编码，如果apiKey不为 SECRET 则无法进行访问
    return apiKey === 'SECRET';
  }
}
