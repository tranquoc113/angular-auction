import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../models/user';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../service/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-account-list',
  templateUrl: './admin-account-list.component.html',
  styleUrls: ['./admin-account-list.component.css']
})
export class AdminAccountListComponent implements OnInit {
  userList = [];
  modalRef: BsModalRef;
  showSpinner = false;
  currentUser: User;
  user: User;
  itemsPerPage = 10;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
    this.getData();
  }

  appPageChange(page) {

  }

  getData() {
    this.showSpinner = true;
    this.userService.listUser().subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.userList = data.items || [];
        this.userList.splice(this.userList.findIndex(x => x.roleName === this.authenticationService.getUser().role), 1);
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  activeChange(item: User) {
    const param = {
      active: item.active,
      id: item.id
    };
    this.showSpinner = true;
    this.userService.activeUser(param).subscribe((res: any) => {
      if (res.type) {
        setTimeout(() => {
          this.showSpinner = false;
          return this.toastr.success('Thay đổi trạng thái thành công!');
        }, 1000);
      }
    }, error => {
      this.showSpinner = false;
      this.toastr.error('Thay đổi trạng thái thất bại!');
    });
  }

  openModal(template: TemplateRef<any>, data: User) {
    this.user = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDelete(key: string): void {
    this.modalRef.hide();
    this.showSpinner = true;
    this.userService.delete(key).subscribe(
      res => {
        if (res.type) {
          this.showSpinner = false;
          this.userList = [];
          this.toastr.success('Đã xóa thành công!');
          this.userList = res.items || [];
        }
      }, error => {
        this.showSpinner = false;
        this.toastr.error('Xóa thất bại!');
      });
  }
}
