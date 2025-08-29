import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; timestamp: string } {
    return {
      message: 'Hello World from NestJS Backend!',
      timestamp: new Date().toISOString(),
    };
  }
}