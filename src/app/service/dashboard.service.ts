import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = {
    orderuserfinance: environment.apiUrlNodejs + 'dashboard/orderuserfinance'
  };
  constructor(private http: HttpClient) {}
  list(): Observable<any>{
    return this.http.get(this.url.orderuserfinance);
  }
}
