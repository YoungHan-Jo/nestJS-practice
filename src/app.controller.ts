import { Controller, Get } from '@nestjs/common';
import { ServiceB } from './service-B';

@Controller()
export class AppController {
  constructor(private readonly serviceB: ServiceB) {}

  @Get('health')
  healthCheck(): string {
    return 'ok';
  }

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }
}
