import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const ROUTES = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
  },
  {
    path: 'thank-you',
    loadChildren: () =>
      import('./thank-you/thank-you.module').then((m) => m.ThankYouModule),
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
