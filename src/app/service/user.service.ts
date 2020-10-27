import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = {
    role: environment.apiUrlNodejs + 'user/role',
    newUser: environment.apiUrlNodejs + 'user/save',
    list: environment.apiUrlNodejs + 'user/list',
    active: environment.apiUrlNodejs + 'user/active',
    delete: environment.apiUrlNodejs + 'user/delete',
    getId: environment.apiUrlNodejs + 'user/getId',
    getEmail: environment.apiUrlNodejs + 'user/getEmail',
    updateUser: environment.apiUrlNodejs + 'user/update',
    updatePass: environment.apiUrlNodejs + 'user/updatePass',
    updateAddress: environment.apiUrlNodejs + 'user/updateAddress',
    listAddress: environment.apiUrlNodejs + 'user/listAddress',
    deleteAddress: environment.apiUrlNodejs + 'user/deleteAddress',
    listcustomer: environment.apiUrlNodejs + 'user/listcustomer',
    getidbyemail: environment.apiUrlNodejs + 'user/getidbyemail'
  };

  constructor(private http: HttpClient) {
  }

  getRole(): Observable<any> {
    return this.http.get(this.url.role);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.url.newUser, user);
  }

  listUser(): Observable<any> {
    return this.http.get(this.url.list);
  }

  activeUser(user): Observable<any> {
    return this.http.post(this.url.active, user);
  }

  delete(id): Observable<any> {
    return this.http.get(this.url.delete, {params: {id: id}});
  }

  getById(id): Observable<any> {
    return this.http.get(this.url.getId, {params: {id: id}});
  }

  getByEmail(email, token?): Observable<any> {
    if (token) {
      return this.http.get(this.url.getEmail, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: {email: email}});
    }
    return this.http.get(this.url.getEmail, {params: {email: email}});
  }

  updateUser(user, token?): Observable<any> {
    if (token) {
      return this.http.post(this.url.updateUser, user, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
    }
    return this.http.post(this.url.updateUser, user);
  }

  updatePass(user, token?): Observable<any> {
    if (token) {
      return this.http.post(this.url.updatePass, user, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
    }
    return this.http.post(this.url.updatePass, user);
  }

  updateAddress(object, token?): Observable<any> {
    if (token) {
      return this.http.post(this.url.updateAddress, object);
    }
    return this.http.post(this.url.updateAddress, object, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});
  }

  getListAddressByEmail(email, token?): Observable<any> {
    if (token) {
      return this.http.get(this.url.listAddress, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        params: {email: email}
      });
    }
    return this.http.get(this.url.listAddress, {params: {email: email}});
  }

  deleteAddress(id, token?): Observable<any> {
    if (token) {
      return this.http.get(this.url.deleteAddress, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), params: {id: id}});
    }
    return this.http.get(this.url.deleteAddress, {params: {id: id}});
  }

  getIdByEmai(email, token?): Observable<any> {
    if (token) {
      return this.http.get(this.url.getidbyemail, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        params: {email: email}
      });
    }
    return this.http.get(this.url.getidbyemail, {params: {email: email}});
  }

  getListCustomer(): Observable<any> {
    return this.http.get(this.url.listcustomer);
  }
}
