import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminOrderListComponent} from './admin-order-list/admin-order-list.component';
import {AdminOrderDetailComponent} from './admin-order-detail/admin-order-detail.component';

const orderRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AdminOrderListComponent},
  {path: 'detail/:id', component: AdminOrderDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminOrderRoutingModule {
}
