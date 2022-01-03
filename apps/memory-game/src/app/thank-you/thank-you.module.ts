import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankYouComponent } from './thank-you.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ThankYouComponent,
  },
];

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThankYouModule {}
