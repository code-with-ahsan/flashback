import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  combineLatestWith,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  firstValueFrom,
  mergeMap,
  Observable,
  of,
  take,
  takeWhile,
  throwError,
} from 'rxjs';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { GameState, IGame } from '../../interfaces/Game.interface';
import { User } from '@prisma/client';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'mg-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {
  user$ = this.userService.user$;
  game$: Observable<IGame>;
  isHost = false;
  isParticipating = false;
  isComponentAlive = true;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.game$ = this.gameService.game$ as Observable<IGame>;
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }

  ngOnInit(): void {
    this.isComponentAlive = true;
    const url = this.route.snapshot.paramMap.get('url');
    if (!url) {
      return;
    }
    this.getGame(url);
  }

  getGame(url: string) {
    this.gameService
      .getGame(url)
      .pipe(
        catchError((err) => {
          if (err) {
            alert('Game not found');
            this.router.navigate(['/welcome']);
          }
          return throwError(err);
        }),
        combineLatestWith(this.userService.user$),
        filter(([game, user]) => !!game && !!user)
      )
      .subscribe(([game, user]) => {
        this.gameService.setGame(game);
        if (!user?.id) {
          return;
        }
        this.isHost = game.hostId === user?.id;
        this.isParticipating = game.participantsIds.some(
          (id) => id === user?.id
        );
        if (!game.participantsIds.some((id) => id === user?.id)) {
          const confirm = window.confirm('Do you want to join the lobby?');
          if (confirm) {
            this.joinGame(url, user);
          }
        }
        this.listenToGameEvents(url);
      });
  }

  listenToGameEvents(url: string) {
    this.db
      .object(`games/${url}`)
      .valueChanges()
      .pipe(
        filter((game) => !!game),
        takeWhile(() => this.isComponentAlive)
      )
      .subscribe((game) => {
        this.gameService.setGame(game as IGame);
      });
    this.db
      .object<IGame>(`games/${url}`)
      .valueChanges()
      .pipe(takeWhile(() => this.isComponentAlive))
      .pipe(
        distinctUntilChanged((a, b) => {
          return a?.state === b?.state;
        })
      )
      .subscribe((game) => {
        if (
          game?.state === GameState.Starting ||
          game?.state === GameState.Playing
        ) {
          this.router.navigate(['/game', url, 'round']);
        } else if (game?.state === GameState.Finished) {
          this.router.navigate(['/game', url, 'scoreboard']);
        }
      });
  }

  joinGame(url: string, user: User) {
    this.gameService.joinGame(url, user.id).subscribe((game) => {
      this.gameService.setGame(game);
      this.db.object(`games/${url}`).update({
        participants: game.participants,
      });
    });
  }

  async startGame(url: string) {
    await this.db.object(`games/${url}`).update({
      state: GameState.Starting,
    });
    this.router.navigate(['/game', url, 'round']);
  }

  leaveGame(url: string) {
    this.user$
      .pipe(
        filter((user) => !!user),
        first(),
        mergeMap((user) => {
          return this.gameService.leaveGame(url, user);
        })
      )
      .subscribe((game) => {
        this.gameService.setGame(game);
        this.db.object(`games/${url}`).update({
          participants: game.participants,
        });
      });
  }
}
