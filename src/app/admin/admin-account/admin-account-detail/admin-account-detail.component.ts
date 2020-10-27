import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-account-detail',
  templateUrl: './admin-account-detail.component.html',
  styleUrls: ['./admin-account-detail.component.css']
})
export class AdminAccountDetailComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user = new User();
  showPass = false;
  showPassTwo = false;
  passTwo = '';
  checkPass = false;
  showSpinner = false;
  existEmail = false;
  roleArr = [];
  birthDate: any;

  constructor(private userService: UserService,
              private toasService: ToastrService,
              private activeRoute: ActivatedRoute) {
    this.user.sex = true;
    this.user.active = true;
    this.user.role = 'USER';
    this.user.date = new Date().getTime().toString();
  }

  ngOnInit() {
    this.getData();
  }

  appPageChange(page) {

  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  showPasswordTwo() {
    this.showPassTwo = !this.showPassTwo;
  }

  // changePass() {
  //   if (this.user.password !== undefined) {
  //     if (this.user.password === this.passTwo && this.passTwo.length > 0) {
  //       this.checkPass = false;
  //     } else {
  //       this.checkPass = true;
  //     }
  //   }
  // }

  getData() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.showSpinner = true;
      this.userService.getById(id).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          const result = data.items || [];
          this.user = result[0];
          this.user.role = result[0].roleName;
          if (this.user.birthday !== '') {
            this.birthDate = new Date(Number.parseInt(this.user.birthday));
          } else {
            this.user.birthday = '';
          }
          console.log(this.user);
        }
      }, error => {
        this.showSpinner = false;
      });
    }
    this.userService.getRole().subscribe(data => {
      if (data.type) {
        this.roleArr = data.items || [];
        this.roleArr.splice(this.roleArr.findIndex(x => x.roleName === 'ADMINISTRATOR'), 1);
      }
    });
  }

  saveUser() {
    this.showSpinner = true;
    switch (this.birthDate) {
      case 'Invalid Date': this.user.birthday = ''; break;
      case null: this.user.birthday = ''; break;
      case '': this.user.birthday = ''; break;
      case undefined:
        this.user.birthday = '';
        break;
      default:  this.user.birthday = this.birthDate.getTime().toString();
    }
    // if (this.user.phone === null || this.user.phone === undefined) {
    //   this.user.phone = '';
    // }
    // if(this.user.address === null || this.user.address === undefined){
    //   this.user.address = '';
    // }
    this.user.active = true;
    if (this.user.id) {
      this.userService.saveUser(this.user).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          this.toasService.success('Cập nhật thành công', 'Sửa người dùng');
        } else {
          this.toasService.error('Cập nhật thất bại', 'Sửa người dùng');
        }
      }, err => {
        this.showSpinner = false;
      });
    } else {
      this.userService.saveUser(this.user).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          if (data.email) {
            this.existEmail = true;
            this.toasService.error('Thêm mới thất bại, Email đã tồn tại', 'Thêm người dùng');
          } else {
            this.user.id = data.id;
            this.toasService.success('Thêm mới thành công', 'Thêm người dùng');
            this.existEmail = false;
          }
        } else {
          this.toasService.error('Thêm mới thất bại', 'Thêm người dùng');
        }
      }, err => {
        this.showSpinner = false;
      });
    }
  }

  checkedSex() {
    this.user.sex = !this.user.sex;
  }

  addUser() {
    this.user = new User();
  }
}
