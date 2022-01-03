import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WelcomeModule {}
