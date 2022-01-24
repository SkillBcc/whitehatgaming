import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: 'top', component: GameListComponent },
  { path: 'new', component: GameListComponent },
  { path: 'slots', component: GameListComponent },
  { path: 'jackpots', component: GameListComponent },
  { path: 'live', component: GameListComponent },
  { path: 'blackjack', component: GameListComponent },
  { path: 'roulette', component: GameListComponent },
  { path: 'table', component: GameListComponent },
  { path: 'poker', component: GameListComponent },
  { path: 'other', component: GameListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
