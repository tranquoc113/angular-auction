import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginationComponent} from './pagination/pagination.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {NumberPasteDirective} from './number-paste.directive';
import {NumberPipePipe} from './number-pipe.pipe';
import {AuthenticationService} from '../service/authentication.service';
import { NumberPhoneDirective } from './number-phone.directive';
import {CardService} from '../service/card.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    PaginationComponent,
    SpinnerComponent,
    NumberPasteDirective,
    NumberPipePipe,
    NumberPhoneDirective
  ],
  exports: [
    PaginationComponent,
    SpinnerComponent,
    NumberPasteDirective,
    NumberPipePipe,
    NumberPhoneDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthenticationService, CardService]
    };
  }
}
