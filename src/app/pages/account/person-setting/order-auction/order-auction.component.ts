import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuctionService} from '../../../../service/auction.service';
import {OrderService} from '../../../../service/order.service';
import {Order} from '../../../../models/order';
import {AuthenticationService} from '../../../../service/authentication.service';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-order-auction',
  templateUrl: './order-auction.component.html',
  styleUrls: ['./order-auction.component.css']
})
export class OrderAuctionComponent implements OnInit {
  @Output() emitOrderStatus = new EventEmitter<any>();
  orderList = new Array<Order>();
  keySearch = '';
  sortType = 'NEW';
  minDate: Date;
  maxDate: Date;
  toDay: any;
  fromDay: any;
  statusOrder = '';
  toTal = 0;
  itemsPerPage = 10;
  pageCurrent = 1;
  showSpinner = false;
  userID = '';
  countStatusOrder = {
    WAITING: 0,
    RECEIVE: 0,
    PROCESS: 0,
    SUCCESS: 0
  };

  constructor(private router: Router,
              private auctionService: AuctionService,
              private orderService: OrderService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getIdByEmai(this.authenticationService.getUser().email, this.authenticationService.getUser().token).subscribe(data => {
      if (data.type) {
        this.userID = data.id || '';
        this.searchOrder();
        this.countStatus(this.userID);
      }
    });
  }

  private countStatus(userID): void {
    this.orderService.countOrderStatusUser(userID, this.authenticationService.getUser().token).subscribe(data => {
      if (data.type) {
        const result = data.item || {};
        this.countStatusOrder = result;
      }
    });
  }
  viewDetail() {
    this.router.navigate(['/person-setting', {viewOrder: 'processing'}]);
  }

  viewWaiting(order: Order) {
    this.orderService.setOrder(order);
    this.emitOrderStatus.emit({status: true});
  }

  viewDetailOrder(id) {
    this.emitOrderStatus.emit({status: false, code: id});
  }

  appPageChange(item) {
    this.pageCurrent = item.page;
    this.searchOrder();
  }

  searchOrder() {
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
      status: this.statusOrder,
      show: this.itemsPerPage,
      userID: this.userID,
      fromDate: fromDateEnd,
      toDate: toDateEnd
    };
    this.showSpinner = true;
    this.orderService.search(object, this.authenticationService.getUser().token).subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
        this.orderList = new Array<Order>();
        if (data.type) {
          this.orderList = data.items || [];
        }
        this.toTal = data.toTal;
      }, 2000);
    }, error => {
      this.showSpinner = false;
    });
  }
}
