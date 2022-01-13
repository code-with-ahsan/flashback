import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
