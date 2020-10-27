import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {PageShareModule} from './page-share/page-share.module';
import {TranslateRankingComponent} from './yahoo-auction/yahoo-aution-detail/translate-ranking/translate-ranking.component';
import {TranslateDescriptionComponent} from './yahoo-auction/yahoo-aution-detail/translate-description/translate-description.component';
import {RakutenTranslateDescriptionComponent} from './rakuten/ratuken-detail-product/rakuten-translate-description/rakuten-translate-description.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';
import {AuthGuard} from '../core/guard/auth.guard';
import {AccountModule} from './account/account.module';
import {AuthenticationService} from '../service/authentication.service';
import {AuctionService} from '../service/auction.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    PageShareModule,
    HttpClientModule,
    CoreModule.forRoot(),
    AccountModule
  ],
  declarations: [
    PagesComponent,
    TranslateRankingComponent,
    TranslateDescriptionComponent,
    RakutenTranslateDescriptionComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class PagesModule {}
