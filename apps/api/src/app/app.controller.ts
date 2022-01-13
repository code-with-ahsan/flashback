import { Controller, Get, Post } from '@nestjs/common';

import { Message } from '@memory-game-ws/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post()
  createUser() {
    return this.appService.createUser();
  }
}
