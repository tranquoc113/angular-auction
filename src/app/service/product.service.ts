import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class ProductService {
  url = {
    list: environment.apiUrl + 'listsp.php',
    get_by_values: environment.apiUrl + 'get.php',
    auction: environment.apiUrl + 'bidauction.php'
  };

  constructor(private http: HttpClient) {}

  getById(AuctionID): Observable<any> {
    const param = new HttpParams()
      .set('AuctionID', AuctionID);
    return this.http.post(this.url.get_by_values, param);
  }

  searchProduct(param): Observable<any> {
    return this.http.post(this.url.get_by_values, param);
  }

  auction(param): Observable<any> {
    return this.http.post(this.url.auction, param);
  }

  redMenu(code): Observable<any> {
    return this.http.post(environment.apiUrl + 'category.php', code, {headers: new HttpHeaders()});
  }
}

