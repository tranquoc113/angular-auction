import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  @Output() headerChange = new EventEmitter();
  positionMenu = 1;
  positionChild = 0;
  check = false;
  currentUser = new User();
  subsVar: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.subsVar = this.authenticationService.currentUser.subscribe(data => {
      if (data) {
        if (this.authenticationService.getUser()) {
          this.currentUser = this.authenticationService.getUser();
          console.log('header:  ', this.currentUser);
        }
      }
    });
  }

  ngOnInit() {
    if (this.router.url.toString().includes('account')) {
      if (this.router.url.toString().includes('list')) {
        this.positionMenu = 2;
        this.positionChild = 1;
      } else if (this.router.url.toString().includes('create')) {
        this.positionMenu = 2;
        this.positionChild = 2;
      } else if (this.router.url.toString().includes('detail')) {
        this.positionMenu = 2;
        this.check = false;
      }
    } else if (this.router.url.toString().includes('order')) {
        this.positionMenu = 3;
    } else if (this.router.url.toString().includes('finance')) {
      this.positionMenu = 4;
    }
  }

  openSider() {
    this.headerChange.emit();
  }

  onSelect(position) {
    if (this.positionMenu === position) {
      this.check = !this.check;
    } else {
      this.positionMenu = position;
      this.positionChild = 0;
      this.check = false;
    }
  }

  onSelectChild(position) {
    this.positionChild = position;
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }
}
