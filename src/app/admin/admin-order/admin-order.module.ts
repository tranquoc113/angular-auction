import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderListComponent } from './admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import {CoreModule} from '../../core/core.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {OrderService} from '../../service/order.service';
import {AdminOrderRoutingModule} from './admin-order-routing.module';
import {BsDatepickerModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import {UserService} from '../../service/user.service';
import {JwtInterceptorProvider} from '../../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../core/helpers/error.interceptor';



@NgModule({
  declarations: [AdminOrderListComponent, AdminOrderDetailComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AdminOrderRoutingModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [
    OrderService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AdminOrderModule { }
