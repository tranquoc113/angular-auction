import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Address} from '../../../../../models/address';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap';
import {UserService} from '../../../../../service/user.service';
import {AuthenticationService} from '../../../../../service/authentication.service';
import {Order} from '../../../../../models/order';
import {OrderService} from '../../../../../service/order.service';
import {FinanceService} from '../../../../../service/finance.service';

@Component({
  selector: 'app-order-buy',
  templateUrl: './order-buy.component.html',
  styleUrls: ['./order-buy.component.scss']
})
export class OrderBuyComponent implements OnInit, OnChanges {
  @ViewChild('childModalFinanceUser', {static: false}) childModalFinanceUser: ModalDirective;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  @Input() addressArr: Array<Address>;
  @Output() emitAddressStatus = new EventEmitter<any>();
  @Output() emitResetMessage = new EventEmitter<any>();
  @Output() emitIdOrder = new EventEmitter<string>();

  address = new Address();
  formAddressStatus = false;
  showSpinner = false;
  modalRef: BsModalRef;
  goEnd = false;
  COD = 2;
  order = new Order();

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private orderService: OrderService,
              private finaceService: FinanceService) {
  }

  ngOnInit() {}

  ngOnChanges(): void {
    const orderFromList = this.orderService.getOrder();
    if (orderFromList) {
      this.order = orderFromList;
      this.order.priceSum = this.order.price + this.COD;
    }
  }

  updateAddress() {
    this.showSpinner = true;
    this.address.email = this.authenticationService.getUser().email;
    this.userService.updateAddress(this.address, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.formAddressStatus = false;
        this.emitAddressStatus.emit({update: true, delete: false});
      } else {
        this.emitAddressStatus.emit({update: false, delete: false});
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  addAddress() {
    this.address = new Address();
    this.formAddressStatus = true;
  }

  editAddress(address: Address) {
    this.address = address;
    this.formAddressStatus = true;
  }

  confirmDelete(id) {
    this.showSpinner = true;
    this.userService.deleteAddress(id, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.emitAddressStatus.emit({delete: true, update: false});
        this.modalRef.hide();
      } else {
        this.emitAddressStatus.emit({delete: false, update: false});
        this.modalRef.hide();
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  openModaldeleteAddress(template: TemplateRef<any>, data: Address) {
    this.address = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  GoEnd(address: Address) {
    this.address = new Address();
    this.address = address;
    this.goEnd = true;
    this.emitResetMessage.emit(true);
  }

  editAdressEnd() {
    this.formAddressStatus = true;
    this.goEnd = false;
  }

  buyOrder() {
    this.finaceService.getFinanceUser(this.authenticationService.getUser().email, this.authenticationService.getUser().token).subscribe(data => {
      if (data.type) {
        const financeUser = Number.parseFloat(data.financeUser);
        if (financeUser < this.order.priceSum) {
          this.childModalFinanceUser.show();
        } else {
          const order = {
            id: this.order.id,
            priceSum: this.order.priceSum,
            orderStatusID: 'RECEIVE',
            addressID: this.address.id,
            userID: this.order.userID
          };
          this.showSpinner = true;
          this.orderService.updateOrder(order).subscribe(res => {
            this.showSpinner = false;
            if (res.type) {
              this.emitIdOrder.emit(this.order.id);
            }
          }, error => {
            this.showSpinner = false;
          });
        }
      }
    });
  }
}
