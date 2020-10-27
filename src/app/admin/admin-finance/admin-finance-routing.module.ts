import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminFinanceListComponent} from './admin-finance-list/admin-finance-list.component';
import {AdminFinanceDetailComponent} from './admin-finance-detail/admin-finance-detail.component';

const financeRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AdminFinanceListComponent},
  {path: 'create', component: AdminFinanceDetailComponent},
  {path: 'detail/:id', component: AdminFinanceDetailComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(financeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminFinanceRoutingModule {
}
