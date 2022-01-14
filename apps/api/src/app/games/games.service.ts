import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Game, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GameCreateInput, hostId: string): Promise<Game> {
    const game: Prisma.GameCreateInput = {
      ...data,
      url: nanoid(12),
      host: {
        connect: {
          id: hostId,
        },
      },
      participants: {
        connect: {
          id: hostId,
        }
      }
    };
    return this.prisma.game.create({
      data: game,
      include: {
        participants: true,
        host: true,
      }
    });
  }

  async findOne(
    gameWhereUniqueInput: Prisma.GameWhereUniqueInput
  ): Promise<Game | null> {
    const game = await this.prisma.game.findUnique({
      where: gameWhereUniqueInput,
      include: {
        host: true,
        participants: true,
        Score: true,
      },
    });
    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  async findAll(): Promise<Game[] | null> {
    return this.prisma.game.findMany();
  }

  async update(params: {
    where: Prisma.GameWhereUniqueInput;
    data: Prisma.GameUpdateInput;
  }): Promise<Game> {
    const { where, data } = params;
    return this.prisma.game.update({
      data,
      where,
      include: {
        host: true,
        participants: true,
      },
    });
  }

  async remove(where: Prisma.GameWhereUniqueInput): Promise<Game> {
    return this.prisma.game.delete({
      where,
    });
  }
}
