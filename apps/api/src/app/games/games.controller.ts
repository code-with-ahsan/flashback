import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Prisma } from '@prisma/client';
import { JoinGameDto } from './dto/join-game.dto';
import { LeaveGameDto } from './dto/leave-game.dto';
import { CreateGameDto } from './dto/create-game-dto';
import { AddGameScoreDto } from './dto/add-game-score-dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    const { hostId, ...rest } = createGameDto;
    return this.gamesService.create(rest, hostId);
  }

  @Post('/:url/join')
  joinGame(@Param('url') url: string, @Body() joinGameDto: JoinGameDto) {
    console.log('Trying the query', joinGameDto, url);
    this.gamesService.findOne({ url }).then(console.log);
    return this.gamesService.update({
      where: { url },
      data: {
        participants: {
          connect: {
            id: joinGameDto.userId,
          },
        },
      },
    });
  }

  @Post('/:url/leave')
  leaveGame(@Param('url') url: string, @Body() leaveGameDto: LeaveGameDto) {
    return this.gamesService.update({
      where: { url },
      data: {
        participants: {
          disconnect: {
            id: leaveGameDto.userId,
          },
        },
      },
    });
  }

  @Get(':url')
  findOne(@Param('url') url: string) {
    return this.gamesService.findOne({ url });
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameDto: Prisma.GameUpdateInput
  ) {
    return this.gamesService.update({
      where: { id },
      data: updateGameDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove({ id });
  }
}
