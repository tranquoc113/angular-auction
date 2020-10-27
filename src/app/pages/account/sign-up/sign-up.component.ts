import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user = new User();
  showPass = false;
  showSpinner = false;
  errFail = false;
  success = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  signUp() {
    this.user.sex = true;
    this.user.date = new Date().getTime().toString();
    this.user.active = true;
    this.user.birthday = '';
    this.user.phone = '';
    this.showSpinner = true;
    this.authenticationService.register(this.user).subscribe(data => {
      this.showSpinner = false;
      if (data.type && data.email) {
        this.errFail = true;
        this.success = false;
      } else {
        this.errFail = false;
        this.success = true;
      }
    });

  }
}
