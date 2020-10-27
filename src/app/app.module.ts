import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotfoundComponent} from './page-notfound/page-notfound.component';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AuctionService} from './service/auction.service';
const config: SocketIoConfig = { url: 'https://tomoniserver.herokuapp.com:4392', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PageNotfoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({      // Register NgxToast NPM module
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [AuctionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
