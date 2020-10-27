import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Finance} from '../../../models/finance';
import {FinanceService} from '../../../service/finance.service';
import {ToastrService} from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-finance-detail',
  templateUrl: './admin-finance-detail.component.html',
  styleUrls: ['./admin-finance-detail.component.css']
})
export class AdminFinanceDetailComponent implements OnInit {
  finance = new Finance();
  financeHistory = [];
  showSpinner = false;
  itemsPerPage = 10;
  sortType = 'NEW';
  toTal = 0;
  statusFinance = '';
  keySearch = '';
  minDate: Date;
  maxDate: Date;
  fromDay: any;
  toDay: any;
  currentPage = 1;
  IdUpdate = '';
  moneyUpdate: any;
  sumMoney = 0;
  constructor(private activeRouter: ActivatedRoute,
              private financeService: FinanceService,
              private location: Location,
              private toasService: ToastrService) {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.finance.id = id;
    }
  }

  ngOnInit() {
    this.searchFinanceHistoryById();
  }

  searchFinanceHistoryById() {
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
    const object = {
      id: this.finance.id,
      keySearch: this.keySearch,
      sort: this.sortType,
      show: this.itemsPerPage,
      page: this.currentPage,
      fromDate: fromDateEnd,
      toDate: toDateEnd,
      status: this.statusFinance
    };
    this.showSpinner = true;
    this.financeService.searchFinanceHistoryById(object).subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
        this.financeHistory = new Array<Finance>();
        if (data.type) {
          this.financeHistory = data.items || [];
          this.financeHistory.forEach(value => {
            if(value.financeStatusID != 'UPDATE'){
              this.sumMoney += Number.parseInt(value.moneyInput);
            }
          });
        }
        this.toTal = data.toTal;
      }, 2000);

    }, error => {
      this.showSpinner = false;
    });
  }

  save() {
    this.showSpinner = true;
    if (this.finance.id) {
      this.financeService.save(this.finance).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          this.toasService.success('Cập nhật thành công', 'Sửa tài chính');
        } else {
          this.toasService.error('Cập nhật thất bại', 'Sửa tài chính');
        }
      }, error => {
        this.showSpinner = false;
      });
    } else {
      this.financeService.save(this.finance).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          this.finance.id = data.id || '';
          this.toasService.success('Thêm mới thành công', 'Thêm tài chính');
        } else {
          this.toasService.error('Thêm mới thất bại', 'Thêm tài chính');
        }
      }, error => {
        this.showSpinner = false;
      });
    }
  }

  appPageChange(event) {

  }

  searchFinance() {
    this.searchFinanceHistoryById();
  }

  editUpdate(item) {
    this.IdUpdate = item.id;
    this.moneyUpdate = item.moneyInput.toString();
    console.log(this.IdUpdate);
  }

  cancelUpdate() {
    this.IdUpdate = '';
  }

  updateMoneyInput(item) {
    this.IdUpdate = '';
    const object = {
      IdChild: item.id,
      IdParent: this.finance.id,
      status: 'UPDATE',
      moneyInput: this.moneyUpdate.toString().replace(',', ''),
      moneyOld: item.moneyInput,
      surplus: item.surplus
    };
    this.showSpinner = true;
    this.financeService.updateMoney(object).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.sumMoney = 0;
        this.financeHistory = new Array<Finance>();
        this.financeHistory = data.items || [];
        this.financeHistory.forEach(value => {
          this.sumMoney += Number.parseInt(value.moneyInput);
        });
        this.toasService.success('Đã cập nhật thành công');
      }
      this.toTal = data.toTal;
    }, error => {
      this.showSpinner = false;
    });
  }
  back() {
    this.location.back();
  }
  changeMoney() {
    if (this.moneyUpdate) {
      return true;
    } else {
      this.moneyUpdate = '0';
    }
  }
}
