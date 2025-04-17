import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LoggerService } from '../../logger.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockContext: ExecutionContext;
  let mockRequest: any;
  beforeEach(() => {
    authGuard = new AuthGuard(new LoggerService());
    mockRequest = {
      header: jest.fn(),
    };
    mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as ExecutionContext;
  });
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('返回true如果带有正确的api key', () => {
    mockRequest.header.mockReturnValue('SECRET');
    expect(authGuard.canActivate(mockContext)).toBe(true);
  });

  it('返回false如果api key不正确', () => {
    mockRequest.header.mockReturnValue('WRONG_KEY');
    expect(authGuard.canActivate(mockContext)).toBe(false);
  });

  it('返回false如果没有提供api key', () => {
    mockRequest.header.mockReturnValue(undefined);
    expect(authGuard.canActivate(mockContext)).toBe(false);
  });
});
