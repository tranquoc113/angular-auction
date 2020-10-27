import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {UserService} from '../../../../service/user.service';
import {AuthenticationService} from '../../../../service/authentication.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  user = new User();
  checkPass = true;
  showSpinner = false;
  @Output() emitServicePass = new EventEmitter<boolean>();

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if(user.email){
      this.user.email = user.email;
    }
  }

  changePass() {
    if (this.user.password !== undefined && this.user.passConfig !== undefined) {
      if (this.user.password === this.user.passConfig && this.user.passConfig.length > 0) {
        this.checkPass = true;
      } else if(this.user.passConfig.length > 0){
        this.checkPass = false;
      }
    }
  }

  changePassword() {
    this.showSpinner = true;
    this.userService.updatePass(this.user, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.emitServicePass.emit(true);
      } else {
        this.emitServicePass.emit(false);
      }
    }, err => {
      this.showSpinner = false;
    });
  }
}
