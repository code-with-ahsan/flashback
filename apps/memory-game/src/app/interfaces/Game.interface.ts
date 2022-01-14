import { Game, User } from '@prisma/client';

export enum GameState {
  Starting = 'Starting',
  Playing = 'Playing',
  Finished = 'Finished',
  Waiting = 'Waiting',
}

export interface IGame extends Game {
  participants: User[];
  participantIds: string[];
  state: GameState;
  Score: { score: number; userId: string }[];
}
