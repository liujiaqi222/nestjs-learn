import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  info(msg: string) {
    console.log('[INFO]', msg);
  }
}
