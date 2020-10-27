import { Component } from '@angular/core';
import {AuctionService} from './service/auction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // tslint:disable-next-line:only-arrow-functions
    window.onbeforeunload = function(e) {
      const key = JSON.parse(localStorage.getItem('statusTomoniGlobal'));
      if(!key){
        localStorage.removeItem('currentUserTomoniGlobal');
      }
    };
  }

}
