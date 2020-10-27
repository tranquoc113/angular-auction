import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const url = environment.apiUrlRakuten;

@Injectable()
export class RakutenService {
  constructor(private http: HttpClient) {
  }

  getByCategory(param): Observable<any> {
    const list = url + 'genreId=' + param.genreId + '&hits=' + param.hits + '&page=' + param.page + '&sort=' + param.sort;
    return this.http.get(list);
  }

  searchProduct(param): Observable<any> {
    const search = url + 'keyword=' + param.keyword + '&hits=' + param.hits + '&page=' + param.page + '&sort=' + param.sort;
    return this.http.get(search);
  }

  getByItemCode(param): Observable<any> {
    const link = url + 'itemCode=' + param;
    return this.http.get(link);
  }
}
