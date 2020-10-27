import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuYahooAuctionComponent } from './menu-yahoo-auction/menu-yahoo-auction.component';
import { MenuRakutenComponent } from './menu-rakuten/menu-rakuten.component';


@NgModule({
  declarations: [MenuYahooAuctionComponent, MenuRakutenComponent],
  exports: [
    MenuYahooAuctionComponent,
    MenuRakutenComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class MenuMobileModule { }
