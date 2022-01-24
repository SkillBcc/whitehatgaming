import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

import { GameListComponent } from './game-list.component';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
        })
      ],
      declarations: [ GameListComponent ],
      providers: [GameService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('event game emit', () => {
    let game = new Game(
      ["top"],
      "The Wish Master",
      "//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg",
      "NETHEWISHMASTER"
    );
    component.category = 'top';
    component.gameService.games = [game];
    component.gameService.updatedGame.emit([game]);
    expect(component.games).toEqual([game]);
  });

  it('event game list other', () => {
    let game = new Game(
      ["virtual"],
      "The Wish Master",
      "//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg",
      "NETHEWISHMASTER"
    );
    component.category = 'other';
    component.gameService.games = [game];
    component.gameService.updatedGame.emit([game]);
    expect(component.games).toEqual([game]);
  });
});
