import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = {
    save: environment.apiUrlNodejs + 'order/save',
    update: environment.apiUrlNodejs + 'order/update',
    list: environment.apiUrlNodejs + 'order/list',
    byId: environment.apiUrlNodejs + 'order/byId',
    delete: environment.apiUrlNodejs + 'order/delete',
    search: environment.apiUrlNodejs + 'order/search',
    countstatusorderuser: environment.apiUrlNodejs + 'order/countstatusorderuser',
    changeorderstatus: environment.apiUrlNodejs + 'order/changeorderstatus'
  };
  order = new Order();

  constructor(private http: HttpClient) {
  }

  saveOrder(order: Order): Observable<any> {
    return this.http.post(this.url.save, order);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.post(this.url.update, order);
  }

  getById(id, token?): Observable<any> {
    if(token){
      return this.http.get(this.url.byId, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: {id: id}});
    }
    return this.http.get(this.url.byId, {params: {id: id}});
  }

  deleteOrder(id): Observable<any> {
    return this.http.get(this.url.delete, {params: {id: id}});
  }

  countOrderStatusUser(id, token?): Observable<any> {
    if (token) {
      return this.http.get(this.url.countstatusorderuser, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        params: {userID: id}
      });
    }
    return this.http.get(this.url.countstatusorderuser, {params: {userID: id}});
  }

  setOrder(order: Order) {
    this.order = order;
  }

  listOrder(): Observable<any> {
    return this.http.get(this.url.list);
  }

  search(object, token?): Observable<any> {
    if(token){
      return this.http.get(this.url.search, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: object});
    }
    return this.http.get(this.url.search, {params: object});
  }

  changeOrderStatus(object): Observable<any> {
    return this.http.post(this.url.changeorderstatus, object);
  }

  getOrder(): Order {
    return this.order;
  }
}

