import {Component, OnInit, TemplateRef} from '@angular/core';
import {FinanceService} from '../../../service/finance.service';
import {Finance} from '../../../models/finance';
import {UserService} from '../../../service/user.service';
import {BsModalRef, BsModalService, TypeaheadMatch} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-admin-finance-list',
  templateUrl: './admin-finance-list.component.html',
  styleUrls: ['./admin-finance-list.component.css']
})
export class AdminFinanceListComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  modalRef: BsModalRef;
  showSpinner = false;
  listFinance = new Array<Finance>();
  finane = new Finance();
  price: any;
  keySearch = '';
  sortType = 'NEW';
  customerList = [];
  selectedValue: string;
  itemsPerPage = 10;
  toTal = 0;
  checkBoxEmail = false;
  currentPage = 1;
  checkInputMoney = false;
  minDate: Date;
  maxDate: Date;
  fromDay: any;
  toDay: any;

  constructor(private financeService: FinanceService,
              private userService: UserService,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.userService.getListCustomer().subscribe(res => {
      if (res.type) {
        this.customerList = res.items || [];
      }
    });
    this.searchFinance();
  }

  searchFinance() {
    let checkFromDate = false;
    let checkToDate = false;
    let fromDateEnd = '';
    let toDateEnd = '';
    if (this.fromDay !== undefined && this.fromDay !== 'Invalid Date' && this.fromDay !== 0) {
      checkFromDate = true;
    }
    if (this.toDay !== undefined && this.toDay !== 'Invalid Date' && this.toDay !== 0) {
      checkToDate = true;
    }
    if (checkFromDate) {
      fromDateEnd = new Date(this.fromDay).getTime().toString();
    }
    if (checkToDate) {
      toDateEnd = new Date(this.toDay).getTime().toString();
    }
    const position = this.customerList.findIndex(x => x.email === this.selectedValue);
    let userID = '';
    if (position !== -1) {
      userID = this.customerList[position].userID;
    }
    const object = {
      keySearch: this.keySearch,
      sort: this.sortType,
      show: this.itemsPerPage,
      page: this.currentPage,
      userId: userID,
      fromDate: fromDateEnd,
      toDate: toDateEnd
    };
    this.showSpinner = true;
    this.financeService.search(object).subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
        this.listFinance = new Array<Finance>();
        if (data.type) {
          this.listFinance = data.items || [];
        }
        this.toTal = data.toTal;
      }, 2000);

    }, error => {
      this.showSpinner = false;
    });
  }

  openModal(template: TemplateRef<any>, email?) {
    if (email) {
      this.selectedValue = email;
      this.checkBoxEmail = true;
    } else {
      this.selectedValue = '';
      this.checkBoxEmail = false;
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  appPageChange(eventPage) {
    this.currentPage = eventPage.page;
  }

  changeMoney() {
    this.checkInputMoney = this.price ? true : false;
  }

  saveFinance() {
    const position = this.customerList.findIndex(x => x.email === this.selectedValue);
    if (position !== -1) {
      this.finane.userID = this.customerList[position].userID;
      this.finane.manager = this.authenticationService.getUser().email;
      this.finane.moneyInput = this.price.toString().replace(',', '');
      this.finane.status = 'ADD';
      this.showSpinner = true;
      this.financeService.save(this.finane).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          this.modalRef.hide();
          this.toastr.success('Thêm mới thành công', 'Thêm mới tài chính');
          const object = {
            keySearch: this.keySearch,
            sort: this.sortType,
            show: this.itemsPerPage,
            page: this.currentPage
          };
          this.financeService.search(object).subscribe(res => {
            this.listFinance = new Array<Finance>();
            if (res.type) {
              this.listFinance = res.items || [];
            }
            this.toTal = res.toTal;
          }, error => {
          });
        } else {
          this.toastr.error('Thêm mới thất bại', 'Thêm mới tài chính');
        }
      }, error => {
        this.showSpinner = false;
        this.toastr.error('Sever error', 'Thêm mới tài chính');
      });
    } else {
      this.modalRef.hide();
      this.toastr.error('Email nhập không tồn tại', 'Thêm tài chính');
    }
  }
}
