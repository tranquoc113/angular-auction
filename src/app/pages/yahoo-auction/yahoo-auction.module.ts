import {NgModule} from '@angular/core';
import {AccordionModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {YahooAuctionComponent} from './yahoo-auction.component';
import {YahooAuctionCategoryComponent} from './yahoo-auction-category/yahoo-auction-category.component';
import {YahooAutionDetailComponent} from './yahoo-aution-detail/yahoo-aution-detail.component';
import {ProductService} from '../../service/product.service';
import {YahooAuctionRoutingModule} from './yahoo-auction-routing.module';
import {YahooAuctionListComponent } from './yahoo-auction-list/yahoo-auction-list.component';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {RouterModule} from '@angular/router';
import {AuctionService} from '../../service/auction.service';
import {FinanceService} from '../../service/finance.service';
import {JwtInterceptorProvider} from '../../core/helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../core/helpers/error.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://tomoniserver.herokuapp.com:4392/', options: {} };

@NgModule({
  declarations: [
    YahooAuctionComponent,
    YahooAuctionCategoryComponent,
    YahooAutionDetailComponent,
    YahooAuctionListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    YahooAuctionRoutingModule,
    CoreModule,
    RouterModule,
    ModalModule.forRoot(),
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AccordionModule.forRoot(),
  ],
  providers: [
    ProductService,
    AuctionService,
    FinanceService,
    // JwtInterceptorProvider,
    // ErrorInterceptorProvider
  ]
})
export class YahooAuctionModule {}
