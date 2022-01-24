import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Api } from '../enums/api';
import { Game } from '../models/game';
import { Jackpot } from '../interfaces/jackpot';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {
  private _jackpotsTimeOut: any;
  private _requestGames: Subscription;
  private _requestJackpots: Subscription;
  private _games: Game[] = [];
  get games(): Game[] {
    return this._games;
  }
  set games(games: Game[]) {
    this._games = [];
    games.forEach((game: Game) => this._games.push(new Game(game.categories, game.name, game.image, game.id)));
    this._loadJackpots();
    this._jackpotsTimeOut = setInterval(() => {this._loadJackpots();}, 1000);
  }
  
  private _jackpots: Jackpot[];
  get jackpots(): Jackpot[] {
    return this._jackpots;
  }
  set jackpots(jackpots: Jackpot[]) {
    this._jackpots = jackpots;
    this._updateGamesJackpots();
    this.updatedGame.emit(this.games);
  }

  updatedGame = new EventEmitter<Game[]>();

  constructor(
    private requestService: RequestService
  ) {
    this._requestGames = this.requestService.get({api: Api.games}).subscribe(
      (data: Game[]) => this.games = data
    )
  }

  ngOnDestroy(): void {
    clearInterval(this._jackpotsTimeOut);
    this._requestGames.unsubscribe();
    this._requestJackpots.unsubscribe();
  }

  private _updateGamesJackpots() {
    for (let a = 0; a < this.jackpots.length; a++) {
      const jackpot = this.jackpots[a];
      const game = this.games.filter(game => game.id.includes(jackpot.game))[0];
      game.jackspot = jackpot.amount;
      game.categories.push('jackpots');
    }
  }

  private _loadJackpots(): void {
    this._requestJackpots = this.requestService.get({api: Api.jackpots}).subscribe(
      (data: Jackpot[]) => this.jackpots = data
    )
  }
}
