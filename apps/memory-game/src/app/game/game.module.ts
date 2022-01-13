import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { RoundComponent } from './round/round.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { RoundSplashScreenComponent } from './components/round-splash-screen/round-splash-screen.component';

const routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'round/1',
      },
      {
        path: 'round/:round',
        component: RoundComponent,
      },
      {
        path: 'round/:round/scoreboard',
        component: ScoreboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [GameComponent, RoundComponent, ScoreboardComponent, RoundSplashScreenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GameModule {}
