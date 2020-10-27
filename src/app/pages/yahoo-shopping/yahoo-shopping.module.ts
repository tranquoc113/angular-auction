import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YahooShoppingComponent } from './yahoo-shopping.component';
import { YahooShoppingDetailComponent } from './yahoo-shopping-detail/yahoo-shopping-detail.component';
import { YahooShoppingCategoryComponent } from './yahoo-shopping-category/yahoo-shopping-category.component';
import { YahooShoppingListComponent } from './yahoo-shopping-list/yahoo-shopping-list.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PaginationModule} from "ngx-bootstrap";
import {ProductService} from "../../service/product.service";



@NgModule({
  declarations: [
    YahooShoppingComponent,
    YahooShoppingDetailComponent,
    YahooShoppingCategoryComponent,
    YahooShoppingListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationModule.forRoot()
  ],
  providers: [
    ProductService
  ]
})
export class YahooShoppingModule { }
