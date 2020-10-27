import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAccountListComponent} from './admin-account-list/admin-account-list.component';
import {AdminAccountDetailComponent} from './admin-account-detail/admin-account-detail.component';

const accountRoutes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AdminAccountListComponent},
  {path: 'create', component: AdminAccountDetailComponent},
  {path: 'detail/:id', component: AdminAccountDetailComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminAccountRoutingModule {
}
