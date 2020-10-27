import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFinanceListComponent } from './admin-finance-list/admin-finance-list.component';
import { AdminFinanceDetailComponent } from './admin-finance-detail/admin-finance-detail.component';
import {FormsModule} from '@angular/forms';
import {AdminFinanceRoutingModule} from './admin-finance-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FinanceService} from '../../service/finance.service';
import {CoreModule} from '../../core/core.module';
import {BsDatepickerModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import {UserService} from '../../service/user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {JwtInterceptorProvider} from '../../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../core/helpers/error.interceptor';



@NgModule({
  declarations: [AdminFinanceListComponent, AdminFinanceDetailComponent],
  imports: [
    AdminFinanceRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    CoreModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    FinanceService,
    UserService,
    AuthenticationService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AdminFinanceModule { }
