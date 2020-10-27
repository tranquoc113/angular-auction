import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PageHeaderComponent } from './page-header/page-header.component';
import {PageFooterComponent } from './page-footer/page-footer.component';
import {PageHomeComponent } from './page-home/page-home.component';
import {RouterModule} from '@angular/router';
import {MenuMobileModule} from './menu-mobile/menu-mobile.module';
import {TabsModule} from 'ngx-bootstrap';
import {ProductService} from '../../service/product.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';

@NgModule({
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageHomeComponent
  ],
  exports: [
    PageHeaderComponent,
    PageFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MenuMobileModule,
    TabsModule.forRoot(),
    HttpClientModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ProductService
  ]
})
export class PageShareModule {}
