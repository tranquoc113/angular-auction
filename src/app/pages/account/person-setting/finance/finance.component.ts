import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication.service';
import {FinanceService} from '../../../../service/finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  @Output() emitIdOrderFromFinance = new EventEmitter<string>();
  showSpinner = false;
  toTal = 0;
  itemsPerPage = 10;
  listFinace = [];
  sortType = 'NEW';
  minDate: Date;
  maxDate: Date;
  fromDay: any;
  toDay: any;
  keySearch = '';
  status = '';
  pageCurrent = 1;
  balance = 0;

  constructor(private authenticationService: AuthenticationService,
              private financeService: FinanceService) {
  }

  ngOnInit() {
    this.searchFinance();
  }

  appPageChange(eventPage) {
  }

  searchFinance() {
    const user = this.authenticationService.getUser();
    let checkFromDate = false;
    let checkToDate = false;
    let fromDateEnd = '';
    let toDateEnd = '';
    if (this.fromDay !== undefined && this.fromDay !== 'Invalid Date') {
      checkFromDate = true;
    }
    if (this.toDay !== undefined && this.toDay !== 'Invalid Date') {
      checkToDate = true;
    }
    if (checkFromDate) {
      fromDateEnd = new Date(this.fromDay).getTime().toString();
    }
    if (checkToDate) {
      toDateEnd = new Date(this.toDay).getTime().toString();
    }
    const object = {
      keySearch: this.keySearch,
      page: this.pageCurrent,
      sort: this.sortType,
      status: this.status,
      show: this.itemsPerPage,
      email: user.email,
      fromDate: fromDateEnd,
      toDate: toDateEnd
    };
    this.showSpinner = true;
    this.financeService.searchFinanceByEmailUser(object, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.listFinace = data.items || [];
        if (this.listFinace.length > 0) {
          this.balance = this.listFinace[0].balance;
        }
      } else {
        this.listFinace = [];
      }
      this.toTal = data.toTal || 0;
    }, error => {
      this.showSpinner = false;
    });
  }

  openOrderDetail(id) {
    this.emitIdOrderFromFinance.emit(id);
  }
}
