import { Injectable, OnDestroy } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  subject = webSocket(environment.baseWsUrl + "/jackpots.php");
  
  constructor() {
    this.subject.subscribe(
      msg => console.log('WS MESSAGE: ' + msg), // Called whenever there is a message from the server.
      err => console.log('WS ERROR:', err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('WS COMPLETE') // Called when connection is closed (for whatever reason).
    );
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
  
}
