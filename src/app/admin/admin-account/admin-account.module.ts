import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccountListComponent } from './admin-account-list/admin-account-list.component';
import {AdminAccountRoutingModule} from './admin-acount-routing.module';
import {CoreModule} from '../../core/core.module';
import {BsDatepickerModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {HttpClientModule} from '@angular/common/http';
import { AdminAccountDetailComponent } from './admin-account-detail/admin-account-detail.component';
import {AuthenticationService} from '../../service/authentication.service';
import {JwtInterceptorProvider} from '../../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../core/helpers/error.interceptor';

@NgModule({
  declarations: [AdminAccountListComponent, AdminAccountDetailComponent],
  imports: [
    CommonModule,
    AdminAccountRoutingModule,
    CoreModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CoreModule,
    ModalModule.forRoot(),
  ],
  providers: [UserService,
  AuthenticationService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider]
})
export class AdminAccountModule { }
