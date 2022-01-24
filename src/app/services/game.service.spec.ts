import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Game } from '../models/game';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('games', () => {
    const game = new Game(
      ["new", "slots", "top"],
      "The Wish Master",
      "//stage.whgstage.com/scontent/images/games/NEJACKANDTHEBEANSTALK.jpg",
      "NEJACKANDTHEBEANSTALK"
    );

    service.games = [game];
    expect(service.games).toEqual([game]);
  });

  it('jackpots', () => {
    const game = new Game(
      ["new", "slots", "top"],
      "The Wish Master",
      "//stage.whgstage.com/scontent/images/games/NEJACKANDTHEBEANSTALK.jpg",
      "NEJACKANDTHEBEANSTALK"
    );
    const jackpot = {"game": "NEJACKANDTHEBEANSTALK", "amount": 127872};

    service.games = [game];
    service.jackpots = [jackpot];
    expect(service.jackpots).toEqual([jackpot]);
    expect(service.jackpots[0].amount).toEqual(service.games[0].jackspot as number);
  });
});
