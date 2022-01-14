import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addScore({
    score,
    gameUrl,
    userId,
  }: {
    score: number;
    gameUrl: string;
    userId: string;
  }) {
    return this.http.post(`${this.apiUrl}/scores`, {
      score,
      gameUrl,
      userId,
    });
  }
}
