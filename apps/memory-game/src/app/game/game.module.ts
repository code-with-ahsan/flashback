import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { RoundComponent } from './round/round.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { RoundSplashScreenComponent } from './components/round-splash-screen/round-splash-screen.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: ':url/lobby',
        component: LobbyComponent,
      },
      {
        path: ':url/round',
        component: RoundComponent,
      },
      {
        path: ':url/scoreboard',
        component: ScoreboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    GameComponent,
    RoundComponent,
    ScoreboardComponent,
    RoundSplashScreenComponent,
    LobbyComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GameModule {}
