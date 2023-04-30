import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthorizationGuard)
  @Get('/hello')
  getHello() {
    return 'hi mom';
  }
}
