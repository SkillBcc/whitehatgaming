import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Game } from 'src/app/models/game';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ GameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.game = new Game(
      ["new", "slots", "top"],
      "The Wish Master",
      "//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg",
      "NETHEWISHMASTER"
    );
    component.activateRoute = 'new';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ribbon top', () => {
    expect(component.ribbon).toBe('top');
  });

  it('ribbon new', () => {
    component.activateRoute = 'top';
    component.ngOnInit();
    expect(component.ribbon).toBe('new');
  });
});
