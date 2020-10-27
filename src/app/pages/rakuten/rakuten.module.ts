import {NgModule} from '@angular/core';
import {RakutenComponent} from './rakuten.component';
import {RakutenCategoryComponent} from './rakuten-category/rakuten-category.component';
import {RakutenListComponent} from './rakuten-list/rakuten-list.component';
import {RatukenDetailProductComponent} from './ratuken-detail-product/ratuken-detail-product.component';
import {RakutenService} from '../../service/rakuten.service';
import {PaginationModule} from 'ngx-bootstrap';
import {PageShareModule} from '../page-share/page-share.module';
import {RakutenRoutingModule} from './rakuten-routing.module';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RakutenComponent,
    RakutenCategoryComponent,
    RakutenListComponent,
    RatukenDetailProductComponent,
  ],
  imports: [
    PaginationModule.forRoot(),
    PageShareModule,
    CoreModule,
    RakutenRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    RakutenService
  ]
})
export class RakutenModule {
}
