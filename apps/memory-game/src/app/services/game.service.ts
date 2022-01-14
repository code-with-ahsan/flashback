import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '@prisma/client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EMOJIS } from '../constants/emojis';
import { ICard } from '../interfaces/Card.interface';
import { IGame } from '../interfaces/Game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  apiUrl = environment.apiUrl;
  gameSource = new BehaviorSubject<IGame | null>(null);
  game$: Observable<IGame | null>;
  constructor(private http: HttpClient) {
    this.game$ = this.gameSource.asObservable();
  }

  setGame(game: IGame | null) {
    this.gameSource.next(game);
  }

  addScore({
    score,
    gameUrl,
    userId,
  }: {
    score: number;
    gameUrl: string;
    userId: string;
  }) {
    return this.http.post(`${this.apiUrl}/games/${gameUrl}/add-score`, {
      score,
      gameUrl,
      userId,
    });
  }

  createNewGame(userId: string) {
    return this.http.post<IGame>(`${this.apiUrl}/games`, {
      hostId: userId,
    });
  }

  joinGame(url: string, userId: string) {
    return this.http.post<IGame>(`${this.apiUrl}/games/${url}/join`, {
      userId,
    });
  }

  leaveGame(url: string, user: any) {
    return this.http.post<IGame>(`${this.apiUrl}/games/${url}/leave`, {
      userId: user.id,
    });
  }

  getGame(url: string) {
    return this.http.get<IGame>(`${this.apiUrl}/games/${url}`);
  }

  shuffleArray(array: ICard[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateRandomEmojis(count: number) {
    let arr = new Array(count / 2);
    arr = arr
      .fill(0)
      .map(() => EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
    const cards: ICard[] = [];
    arr.forEach((emoji) => {
      const targetEmoji = {
        value: emoji,
        isFlipped: false,
        isMatched: false,
      };
      cards.push({ ...targetEmoji });
      cards.push({ ...targetEmoji });
    });
    return this.shuffleArray(cards);
  }
}
