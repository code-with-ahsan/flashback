import { Injectable } from '@nestjs/common';
import { Message } from '@memory-game-ws/api-interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
  async createUser() {
    const ahsan = await prisma.user.create({
      data: {
        email: 'muhd.ahsan@example.com',
        name: 'Muhammad Ahsan',
      },
    });

    console.log(ahsan);
    return ahsan;
  }
}
