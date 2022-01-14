import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GameModalComponent } from './components/game-modal/game-modal.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

const routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  declarations: [WelcomeComponent, GameModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule,
    ClipboardModule,
  ],
})
export class WelcomeModule {}
