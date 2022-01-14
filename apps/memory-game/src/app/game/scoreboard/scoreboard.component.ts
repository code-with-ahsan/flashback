import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from '../../interfaces/Game.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'mg-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  score: Record<string, number> = {};
  game!: IGame;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    if (!url) {
      this.router.navigate(['/welcome']);
      return;
    }
    this.getGame(url);
  }

  getGame(url: string) {
    this.gameService.getGame(url).subscribe((game) => {
      console.log(game);
      this.game = game;
      this.gameService.setGame(game);
      game.participants.map((participant) => {
        const score = game.Score.find(
          (score) => score.userId === participant.id
        );
        this.score[participant.id] = score?.score || 0;
      });
    });
  }
}
