import {Component, OnInit, TemplateRef} from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../service/order.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService, TypeaheadMatch} from 'ngx-bootstrap';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {
  showSpinner = false;
  fromDay: any;
  toDay: any;
  modalRef: BsModalRef;
  orderList = new Array<Order>();
  order = new Order();
  itemsPerPage = 10;
  toTal = 0;
  customerList = [];
  sortType = 'NEW';
  statusOrder = '';
  keySearch = '';
  pageCurrent = 1;
  minDate: Date;
  maxDate: Date;
  selectedValue: string;
  selectedOption = {
    userID: ''
  };

  constructor(private orderService: OrderService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.searchOrder();
    this.userService.getListCustomer().subscribe(res => {
      if (res.type) {
        this.customerList = res.items || [];
      }
    });
  }

  openModal(template: TemplateRef<any>, data: Order) {
    this.order = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDelete(id) {
    this.showSpinner = true;
    this.orderService.deleteOrder(id).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.orderList = new Array<Order>();
        this.toastr.success('Đã xóa thành công!');
        this.orderList = data.items || [];
      }
    }, error => {
      this.showSpinner = false;
      this.toastr.error('Xóa thất bại!');
    });
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
      userID: this.selectedOption.userID,
      fromDate: fromDateEnd,
      toDate: toDateEnd
    };
    console.log(this.selectedOption.userID);
    this.showSpinner = true;
    this.orderService.search(object).subscribe(data => {
      setTimeout(() => {
        this.showSpinner = false;
        this.orderList = new Array<Order>();
        if (data.type) {
          console.log(data);
          this.orderList = data.items || [];
        }
        this.toTal = data.toTal;
      }, 2000);

    }, error => {
      this.showSpinner = false;
    });
  }
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }
}
