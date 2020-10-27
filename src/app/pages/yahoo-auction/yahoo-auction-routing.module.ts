import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YahooAuctionComponent} from './yahoo-auction.component';
import {YahooAutionDetailComponent} from './yahoo-aution-detail/yahoo-aution-detail.component';
import {YahooAuctionListComponent} from './yahoo-auction-list/yahoo-auction-list.component';

const yahooAuctionRoutes: Routes = [
  {
    path: '', component: YahooAuctionComponent,
  },
  {
    path: 'list-yahoo-auction', component: YahooAuctionListComponent
  },
  { path: 'detail/:id', component: YahooAutionDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(yahooAuctionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class YahooAuctionRoutingModule {
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
