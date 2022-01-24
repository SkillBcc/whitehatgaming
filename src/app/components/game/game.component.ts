import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private _game: Game;
  @Input()
  set game(game: Game) {
    this._game = game;
  }
  get game(): Game {
    return this._game;
  }
  activateRoute: string;
  ribbon: string;

  constructor(
    private router: Router
  ) {
    this.activateRoute = this.router.url.replace('/','');
  }

  ngOnInit(): void {
    if (this.activateRoute !== 'new' && this.game.hasCategory('new')) {
      this.ribbon = 'new';
    } else {
      if (this.activateRoute !== 'top' && this.game.hasCategory('top')) {
        this.ribbon = 'top';
      }
    }
  }

}
