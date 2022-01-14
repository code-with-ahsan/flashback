import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { takeWhile } from 'rxjs/operators';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';
import { User } from '@prisma/client';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { GameState } from '../interfaces/Game.interface';

@Component({
  selector: 'mg-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  showGameModal = false;
  fbUser!: firebase.User | null;
  user!: User | null;
  componentIsAlive = true;
  gameUrl = '';
  constructor(
    private auth: AngularFireAuth,
    private gameService: GameService,
    private userService: UserService,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.userService.user$
      .pipe(takeWhile(() => this.componentIsAlive))
      .subscribe((user) => {
        this.user = user;
      });
  }

  async letsGo() {
    if (!this.user) {
      try {
        await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.showGameModal = true;
      } catch (err) {
        console.error(err);
      }
    } else {
      this.showGameModal = true;
    }
  }

  async logout() {
    await this.auth.signOut();
    this.userService.logout();
  }

  closeModal() {
    this.showGameModal = false;
  }

  createNewGame() {
    if (!this.user) {
      return;
    }
    this.gameService.createNewGame(this.user?.id).subscribe((game) => {
      this.gameUrl = `${location.origin}/#/game/${game.url}/lobby`;
      this.db.object(`games/${game.url}`).set({
        ...game,
        state: GameState.Waiting,
      });
    });
  }

  joinGame(url: string) {
    this.router.navigate(['/game', url, 'lobby']);
  }
}
