import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}
  create(createScoreDto) {
    const { score, gameUrl, userId } = createScoreDto;
    return this.prisma.score.create({
      data: {
        score,
        game: {
          connect: {
            url: gameUrl,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        game: true,
        user: true,
      },
    });
  }

  findAll() {
    return `This action returns all scores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: Prisma.ScoreUpdateInput) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
