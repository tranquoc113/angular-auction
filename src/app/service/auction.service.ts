import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {Card} from '../models/card';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  url = {
    save: environment.apiUrlNodejs + 'auction/save',
    list: environment.apiUrlNodejs + 'auction/list',
    history: environment.apiUrlNodejs + 'auction/history'
  };
  constructor(private http: HttpClient,
              private socket: Socket
  ) {}
  saveCard(card: Card, token?): Observable<any> {
    if(token){
      return this.http.post(this.url.save, card, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
    }
    return this.http.post(this.url.save, card);
  }
  listCard(email, token?): Observable<any> {
    if(token){
      return this.http.get(this.url.list, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: {email: email}});
    }
    return this.http.get(this.url.list, { params: {email: email}});
  }
  getHistoryByAuction(auctionID, email): Observable<any> {
    return this.http.get(this.url.history,{ params: {auctionID: auctionID, email: email}});
  }
  public sendMessage(message) {
    this.socket.emit('new-message', message);
    // return this.socket.on('new-message', (message));
  }

  public getMessages = (messagess) => {
    this.socket.emit('new-message', messagess);
    return Observable.create((observer) => {
      this.socket.on('my-message', (message) => {
        observer.next(message);
      });
    });
  }

  auction = (object) => {
    this.socket.emit('tomoni-auction', object);
    return Observable.create((obser) => {
      this.socket.on('tomoni-result-auction', (data) => {
        obser.next(data);
      });
    });
  }
}
