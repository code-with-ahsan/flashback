import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { combineLatestWith, delay, filter, first, takeWhile } from 'rxjs';
import { GameState, IGame } from '../../interfaces/Game.interface';
import { UserService } from '../../services/user.service';
import { ScoreService } from '../../services/score.service';
import { ICard } from '../../interfaces/Card.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'mg-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit, OnDestroy {
  splashVisible = false;
  gameUrl!: string | null;
  roundSplashTitle = 'Round Starting! Good luck!';
  score = 0;
  userId!: string;
  cards: ICard[] = [];
  firstSelection: ICard | null = null;
  secondSelection: ICard | null = null;
  wrongMatchDisplay = false;
  isComponentAlive = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private scoreService: ScoreService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.isComponentAlive = true;
    this.gameUrl = this.route.snapshot.paramMap.get('url');
    this.showSplashIfApplicable();
    this.listenToEvents();
    this.cards = this.gameService.generateRandomEmojis(14);
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }

  cardClicked(card: ICard) {
    if (this.wrongMatchDisplay) {
      return;
    }
    if (this.firstSelection) {
      this.secondSelection = card;
      this.secondSelection.isFlipped = true;
      this.checkForMatch(this.firstSelection, this.secondSelection);
    } else {
      this.firstSelection = card;
      this.firstSelection.isFlipped = true;
    }
  }

  checkForMatch(firstSelection: ICard, secondSelection: ICard) {
    if (firstSelection === secondSelection) {
      return;
    }
    if (
      firstSelection?.value === secondSelection?.value &&
      !firstSelection?.isMatched &&
      !secondSelection?.isMatched
    ) {
      firstSelection.isMatched = true;
      secondSelection.isMatched = true;
      this.increaseScore();
      this.checkIfGameIsFinished();
    } else {
      this.wrongMatchDisplay = true;
      setTimeout(() => {
        firstSelection.isFlipped = false;
        secondSelection.isFlipped = false;
        this.wrongMatchDisplay = false;
      }, 1500);
    }
    this.firstSelection = null;
    this.secondSelection = null;
  }

  checkIfGameIsFinished() {
    const isFinished = this.cards.every((card) => !!card.isMatched);
    if (isFinished) {
      this.finishRound();
    }
  }

  listenToEvents() {
    this.db
      .object<IGame>(`/games/${this.gameUrl}`)
      .valueChanges()
      .pipe(takeWhile(() => this.isComponentAlive))
      .subscribe((game) => {
        {
          if (game?.state === GameState.Finished) {
            this.finishRound();
          }
        }
      });
  }

  increaseScore() {
    this.score += 5;
  }

  showSplashIfApplicable() {
    if (!this.gameUrl) {
      this.router.navigate(['/welcome']);
      return;
    }
    this.db
      .object<IGame>(`/games/${this.gameUrl}`)
      .valueChanges()
      .pipe(
        combineLatestWith(this.userService.user$),
        filter(([game, user]) => !!game && !!user),
        first()
      )
      .subscribe(([game, user]) => {
        this.userId = user?.id || '';
        const isHost = user?.id === game?.hostId;
        if (game?.state === GameState.Starting) {
          this.splashVisible = true;
          setTimeout(() => {
            this.splashVisible = false;
          }, 3000);
          if (isHost) {
            this.db.object(`/games/${this.gameUrl}`).update({
              state: GameState.Playing,
            });
          }
        }
      });
  }

  async finishRound() {
    this.scoreService
      .addScore({
        score: this.score,
        gameUrl: this.gameUrl || '',
        userId: this.userId,
      })
      .subscribe(() => {
        this.db
          .object(`/games/${this.gameUrl}`)
          .update({
            state: GameState.Finished,
          })
          .then(() =>
            this.db.list(`games/${this.gameUrl}/Score`).push({
              score: this.score,
              gameUrl: this.gameUrl || '',
              userId: this.userId,
            })
          )
          .then(() => {
            this.router.navigate(['/game', this.gameUrl, 'scoreboard']);
          });
      });
  }
}
