import { NgModule, ModuleWithProviders } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import {CommonService} from './common.service';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        // CommonService
      ]
    };
  }
}
