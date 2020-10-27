import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  url = {
    search: environment.apiUrlNodejs + 'finance/search',
    delete: environment.apiUrlNodejs + 'finance/delete',
    save: environment.apiUrlNodejs + 'finance/save',
    financeuser: environment.apiUrlNodejs + 'finance/countfinanceuser',
    searchfinancehistorybyid: environment.apiUrlNodejs + 'finance/searchfinancehistorybyid',
    updatemoneyfinance: environment.apiUrlNodejs + 'finance/updatemoneyfinance',
    searchfinancebyemailuser: environment.apiUrlNodejs + 'finance/searchfinancebyemailuser'
  };
  constructor(private http: HttpClient) {}

  search(object): Observable<any> {
   return this.http.get(this.url.search, {params: object});
  }
  searchFinanceHistoryById(object): Observable<any> {
    return this.http.get(this.url.searchfinancehistorybyid, {params: object});
  }
  searchFinanceByEmailUser(object, token?): Observable<any> {
    if(token){
      return this.http.get(this.url.searchfinancebyemailuser, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: object});
    }
    return this.http.get(this.url.searchfinancebyemailuser, {params: object});
  }
  delete(id): Observable<any> {
    return this.http.get(this.url.delete, {params: {id: id}});
  }
  save(object): Observable<any> {
    return this.http.post(this.url.save, object);
  }
  updateMoney(object): Observable<any> {
    return this.http.post(this.url.updatemoneyfinance, object);
  }
  getFinanceUser(email, token): Observable<any> {
    return this.http.get(this.url.financeuser, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: {email: email}});
  }
}
