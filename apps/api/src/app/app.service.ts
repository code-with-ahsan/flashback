import { Injectable } from '@nestjs/common';
import { Message } from '@memory-game-ws/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
