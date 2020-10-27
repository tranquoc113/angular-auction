import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PersonSettingComponent} from './person-setting/person-setting.component';
import {HistoryAuctionComponent} from './person-setting/history-auction/history-auction.component';
import {CardListComponent} from './person-setting/card-list/card-list.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../../core/core.module';
import {RouterModule} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AuctionService} from '../../service/auction.service';
import { UserChangeComponent } from './person-setting/user-change/user-change.component';
import { UserPasswordComponent } from './person-setting/user-password/user-password.component';
import { OrderAuctionComponent } from './person-setting/order-auction/order-auction.component';
import { OrderDetailComponent } from './person-setting/order-auction/order-detail/order-detail.component';
import { AddressComponent } from './person-setting/address/address.component';
import {CardService} from '../../service/card.service';
import { OrderBuyComponent } from './person-setting/order-auction/order-buy/order-buy.component';
import {OrderService} from '../../service/order.service';
import { FinanceComponent } from './person-setting/finance/finance.component';
import {FinanceService} from '../../service/finance.service';
import {JwtInterceptorProvider} from '../../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../core/helpers/error.interceptor';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PersonSettingComponent,
    HistoryAuctionComponent,
    CardListComponent,
    UserChangeComponent,
    UserPasswordComponent,
    OrderAuctionComponent,
    OrderDetailComponent,
    AddressComponent,
    OrderBuyComponent,
    FinanceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CoreModule,
    RouterModule
  ],
  providers: [
    UserService,
    AuctionService,
    CardService,
    OrderService,
    FinanceService,
    // JwtInterceptorProvider,
    // ErrorInterceptorProvider
  ]
})
export class AccountModule { }
