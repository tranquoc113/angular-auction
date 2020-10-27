import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RakutenComponent} from './rakuten.component';
import {RakutenListComponent} from './rakuten-list/rakuten-list.component';
import {RatukenDetailProductComponent} from './ratuken-detail-product/ratuken-detail-product.component';
const rakutenRoutes: Routes = [
  {
    path: '', component: RakutenComponent,
  },
  {
    path: 'list-rakuten', component: RakutenListComponent
  },
  { path: 'detail/:id', component: RatukenDetailProductComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(rakutenRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RakutenRoutingModule {
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
