import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { Game } from 'src/app/models/game';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let methodSpy: jasmine.Spy;

  let routerEventRelaySubject: ReplaySubject<RouterEvent>;
  let routerMock;

  // const eventSubject = new ReplaySubject<RouterEvent>(1);
  // const routerMock = {
  //   navigate: jasmine.createSpy('navigate'),
  //   events: eventSubject.asObservable(),
  //   url: '/new'
  // }

  beforeEach(async () => {
    routerEventRelaySubject = new ReplaySubject<RouterEvent>(1);
    routerMock = {
      events: routerEventRelaySubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
        })
      ],
      declarations: [ HeaderComponent ],
      providers: [
        {provide: Router, useValue: routerMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toogleMenu', () => {
    component.menuOpened = false;
    component.toogleMenu();
    expect(component.menuOpened).toEqual(true);
  });

  it('route changed NavigationEnd', () => {
    const url = '/new';
    routerEventRelaySubject.next(new NavigationEnd(1, url, 'redirectUrl'));
    expect(component.activateRoute).toEqual('new');
  });
});

