import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/user';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<User>;
  public currentUser =  new Observable<User>();
  user: User;
  url = {
    signin: environment.apiUrlNodejs + 'user/authenticate',
    register: environment.apiUrlNodejs + 'user/save',
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserTomoniGlobal')));
    if (this.currentUserSubject) {
      this.currentUser = this.currentUserSubject.asObservable();
    }
    // console.log('Init Service');
    // const userLocal = JSON.parse(localStorage.getItem('currentUser'));
    // if(userLocal){
    //   this.currentUser.next(userLocal);
    // }
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user) {
    return this.http.get<any>(this.url.signin, {headers: headers, params: user}).pipe(map(data => {
      // login successful if there's a jwt token in the response
      if (data && data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUserTomoniGlobal', JSON.stringify(data));
        this.currentUserSubject.next(data);
      }
      return data;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserTomoniGlobal');
    localStorage.removeItem('statusTomoniGlobal');
    this.currentUserSubject.next(new User());
  }

  register(user): Observable<any> {
    return this.http.post(this.url.register, user);
  }

  getUser(): User {
    const data = JSON.parse(localStorage.getItem('currentUserTomoniGlobal'));
    return data;
  }
}
