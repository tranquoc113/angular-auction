import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeSibar = false;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    const user = this.authenticationService.getUser();
    if(user.role){
      this.currentUser = user;
      if (this.currentUser.role == 'USER') {
        this.router.navigate(['']);
      }
    }
  }
  ngOnInit() {}
  changeSibar() {
    this.activeSibar = !this.activeSibar;
    console.log(this.activeSibar);
  }
}


