import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _events: Subscription;
  menuOpened: boolean = false;
  activateRoute: string;
  headers: string[] = [
    'top',
    'new',
    'slots',
    'jackpots',
    'live',
    'blackjack',
    'roulette',
    'table',
    'poker',
    'other'
  ]

  constructor(
    private router: Router
  ) {
    this._events = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activateRoute = val.url.replace('/','')
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._events.unsubscribe();
  }

  toogleMenu() {
    this.menuOpened = !this.menuOpened;
  }

}
