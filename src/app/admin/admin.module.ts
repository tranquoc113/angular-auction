import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {CoreModule} from '../core/core.module';
import {AuthGuard} from '../core/guard/auth.guard';
import {AuthenticationService} from '../service/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {JwtInterceptorProvider} from '../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../core/helpers/error.interceptor';
import {DashboardService} from '../service/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    DashboardService
  ]
})
export class AdminModule {
}


