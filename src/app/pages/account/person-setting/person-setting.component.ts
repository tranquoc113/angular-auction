import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {Card} from '../../../models/card';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserService} from '../../../service/user.service';
import {CardService} from '../../../service/card.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuctionService} from '../../../service/auction.service';
import {AddressComponent} from './address/address.component';
import {ProductService} from '../../../service/product.service';
import {Address} from '../../../models/address';
import {OrderService} from '../../../service/order.service';
import {FinanceComponent} from './finance/finance.component';

@Component({
  selector: 'app-person-setting',
  templateUrl: './person-setting.component.html',
  styleUrls: ['./person-setting.component.css']
})
export class PersonSettingComponent implements OnInit {
  @ViewChild(AddressComponent, {static: false})
  private adddressComponent: AddressComponent;
  @ViewChild(FinanceComponent, {static: false})
  private financeComponent: FinanceComponent;
  checkError = false;
  checkSuccess = false;
  checkOrderBuy = false;
  messageErro = '';
  messageSuccess = '';
  showSpinner = false;
  currentUser: User;
  cards = new Array<Card>();
  user = new User();
  checkOrder = false;
  itemList = 1;
  orderDetail: any;
  addressArr = new Array<Address>();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private cardService: CardService,
              private auctionSerivice: AuctionService,
              private yahooAuctionService: ProductService,
              private orderService: OrderService) {
    const card = activeRouter.snapshot.paramMap.get('view');
    if (card) {
      this.itemList = 3;
    }
    const code = activeRouter.snapshot.paramMap.get('viewOrder');
    if (code === 'wating') {
      this.checkOrderBuy = true;
      this.itemList = 4;
    } else if (code === 'processing') {
      this.checkOrder = true;
      this.itemList = 4;
    }
  }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if (user.email) {
      this.auctionSerivice.listCard(user.email, user.token).subscribe(listCard => {
        if (listCard.type) {
          this.cards = listCard.items || [];
          let arrIDCardOld = [];
          this.cards.forEach(val => {
            let timeOld = val.timeEnd;
            const dateCurrent = new Date();
            val['repeatAuction'] = timeOld < dateCurrent.getTime() ? false : true;
            // let year = val.timeEnd;
            // console.log(new Date(val.timeEnd).getFullYear());
            // if(new Date(timeOld).getFullYear() >  dateCurrent.getFullYear()) {
            //   arrIDCardOld.push(val.id);
            // }else if(new Date(timeOld).getMonth() > dateCurrent.getMonth()) {
            //   arrIDCardOld.push(val.id);
            // }else if(dateCurrent.getDay() - new Date(timeOld).getDay() >= 10) {
            //   arrIDCardOld.push(val.id);
            // }
          });
        }
      });
      this.getListAddress(user.email);
    }
  }

  itemChange(item) {
    this.itemList = item;
    this.removeMessage();
    this.checkOrderBuy = false;
    this.adddressComponent.changeLayoutFromParent();
  }

  emitServiceUserChange(check: boolean) {
    this.message(check, 'Cập nhật thông tin thành công');
  }

  emitServicePassChange(check: boolean) {
    this.message(check, 'Mật khẩu cũ không chính xác');
  }

  emitAddressChange(object: any) {
    if (object.type && object.remove) {
      this.removeMessage();
    } else if (object.type && !object.remove) {
      this.message(true, object.message);
    } else {
      this.message(false, object.message);
    }
  }

  private message(check: boolean, mess?) {
    if (check) {
      this.checkSuccess = true;
      this.checkError = false;
      this.messageSuccess = mess;
      this.messageErro = '';
    } else {
      this.checkError = true;
      this.checkSuccess = false;
      this.messageErro = mess;
      this.messageSuccess = '';
    }
  }
  private getListAddress(email) {
    this.addressArr = new Array<Address>();
    this.userService.getListAddressByEmail(email, this.authenticationService.getUser().token).subscribe(data => {
      if (data.type) {
        this.addressArr = data.items || [];
      }
    });
  }
  private removeMessage(): void {
    this.checkOrder = false;
    this.checkSuccess = false;
    this.checkError = false;
    this.messageSuccess = '';
    this.messageErro = '';
  }
  eventResetMess(status) {
    if (status) {
      this.removeMessage();
    } else {
      this.orderDetail = status;
      this.checkOrder = true;
      this.checkOrderBuy = false;
    }
  }

  eventOrderStatus(event) {
    if (event.status) {
      this.checkOrderBuy = true;
    } else {
      this.getOderById(event.code);
    }
  }

  private getOderById(id): void {
    this.showSpinner = true;
    this.orderService.getById(id, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        const orders = data.items || [];
        this.orderDetail = orders[0] || {};
        this.checkOrder = true;
      }
    }, error => {
      this.showSpinner = false;
    });
  }

  emitGetOrderById(id) {
    this.getOderById(id);
    this.checkOrder = true;
    this.checkOrderBuy = false;
    this.financeComponent.searchFinance();
  }

  statusAddress(status) {
    if (status.delete && !status.update) {
      this.getListAddress(this.authenticationService.getUser().email);
      this.message(true, 'Xóa địa chỉ thành công');
    } else if (!status.delete && !status.update) {
      this.message(false, 'Xóa địa chỉ thất bại');
    } else if (status.update && !status.delete) {
      this.getListAddress(this.authenticationService.getUser().email);
      this.message(true, 'Cập nhật địa chỉ thành công');
    } else {
      this.message(false, 'Cập nhật địa chỉ thất bại');
    }
  }

  showDetailOrderFromIdOrderFianance(id) {
    this.getOderById(id);
    this.itemList = 4;
    this.checkOrder = true;
    this.checkOrderBuy = false;
  }
}
