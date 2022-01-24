import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  private _updatedGame: Subscription;
  category = 'top';
  games: Game[] = [];

  constructor(
    public gameService: GameService,
    private router: Router
  ) {
    this._updatedGame = this.gameService.updatedGame.subscribe(
      games => {this._loadGamesList()}
    )
  }

  ngOnInit(): void {
    this._getCategory();
    this._loadGamesList();
  }

  ngOnDestroy(): void {
    this._updatedGame.unsubscribe();
  }

  private _getCategory(): void {
    this.category = this.router.url.replace('/','')
  }

  private _loadGamesList(): void {
    const games = this.gameService.games;
    if (games && games.length) {
      if (this.category !== 'other') {
        this.games = games.filter(game => game.hasCategory(this.category));
      } else {
        const otherArray = ['virtual', 'fun', 'ball'];
        this.games = games.filter(game => otherArray.some(i => game.hasCategory(i)));
      }
    }
  }
}
