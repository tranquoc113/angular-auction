import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication.service';
import {User} from '../../../models/user';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  returnUrl: string;
  user = new User();
  savePass = false;
  showSpinner = false;
  errFail = false;
  checkCategory = false;
  checkSeach = false;
  numberAfter = '';


  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const path = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    if (path.includes(';')) {
      if (path.includes('category')) {
        this.checkCategory = true;
        this.checkSeach = false;
      } else if (path.includes('search')) {
        this.checkCategory = false;
        this.checkSeach = true;
      }
      this.returnUrl = path.toString().slice(0, path.indexOf(';'));
      this.numberAfter = path.toString().slice(path.toString().indexOf('=') + 1, path.length);
    } else {
      this.returnUrl = path;
    }
  }

  login() {
    this.showSpinner = true;
    this.authenticationService.login(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.showSpinner = false;
          if (data.type === false) {
            this.errFail = true;
          } else {
            this.errFail = false;
            if (this.savePass) {
              localStorage.setItem('statusTomoniGlobal', JSON.stringify(true));
            } else {
              localStorage.setItem('statusTomoniGlobal', JSON.stringify(false));
            }
            if (this.checkCategory) {
              this.router.navigate([this.returnUrl, {category: this.numberAfter}]);
            } else if (this.checkSeach) {
              this.router.navigate([this.returnUrl, {search: this.numberAfter}]);
            } else {
              this.router.navigate([this.returnUrl]);
            }
          }
        },
        error => {
          this.showSpinner = false;
        });
  }
}
