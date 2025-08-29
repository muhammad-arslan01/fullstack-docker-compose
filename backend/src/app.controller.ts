import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string; timestamp: string } {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; service: string } {
    return {
      status: 'ok',
      service: 'nestjs-backend',
    };
  }
}