import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../exception-filter';
import { GamesModule } from './games/games.module';
import { ScoresModule } from './scores/scores.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GamesModule, ScoresModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
