import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {AuthenticationService} from '../../../../service/authentication.service';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.css']
})
export class UserChangeComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user = new User();
  existEmail = false;
  birthDate: any;
  showSpinner = false;
  currentUser: User;
  @Output() emitService = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if (user.role) {
      if (user.email) {
        this.userService.getByEmail(user.email, this.authenticationService.getUser().token).subscribe(data => {
          const result = data.items || [];
          this.user = result[0];
          this.user.emailOld = result[0].email;
          if (this.user.birthday !== '') {
            this.birthDate = new Date(Number.parseInt(this.user.birthday));
          } else {
            this.user.birthday = '';
          }
          this.currentUser = user;
        });
      }
    }
  }

  updateAccount() {
    this.showSpinner = true;
    switch (this.birthDate) {
      case 'Invalid Date':
        this.user.birthday = '';
        break;
      case null:
        this.user.birthday = '';
        break;
      case '':
        this.user.birthday = '';
        break;
      case undefined:
        this.user.birthday = '';
        break;
      default:
        this.user.birthday = this.birthDate.getTime().toString();
    }
    if (this.user.phone === null) {
      this.user.phone = '';
    }
    this.userService.updateUser(this.user, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.currentUser.email = this.user.email;
        this.currentUser.fullName = this.user.fullName;
        localStorage.setItem('currentUserTomoniGlobal', JSON.stringify(this.currentUser));
        this.authenticationService.currentUserSubject.next(this.currentUser);
        this.emitService.emit(true);
      } else {
        this.emitService.emit(false);
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  checkedSex() {
    this.user.sex = !this.user.sex;
  }
}
