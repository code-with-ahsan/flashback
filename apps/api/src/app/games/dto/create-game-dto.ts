import { Prisma } from '@prisma/client';

export type CreateGameDto = Prisma.GameCreateInput & { hostId: string };
