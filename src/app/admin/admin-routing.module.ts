import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthGuard} from '../core/guard/auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']},
    children: [
      {
        path: '',
        children: [
          {path: '', component: AdminDashboardComponent},
          {
            path: 'account',
            loadChildren: () => import('./admin-account/admin-account.module').then(mod => mod.AdminAccountModule)
          },
          {
            path: 'order',
            loadChildren: () => import('./admin-order/admin-order.module').then(mod => mod.AdminOrderModule)
          },
          {
            path: 'finance',
            loadChildren: () => import('./admin-finance/admin-finance.module').then(mod => mod.AdminFinanceModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
