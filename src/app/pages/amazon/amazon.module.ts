import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmazonComponent } from './amazon.component';
import { AmazonListComponent } from './amazon-list/amazon-list.component';
import { AmazonDetailComponent } from './amazon-detail/amazon-detail.component';
import { AmazonCategoryComponent } from './amazon-category/amazon-category.component';
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../service/product.service";

@NgModule({
  declarations: [
    AmazonComponent,
    AmazonListComponent,
    AmazonDetailComponent,
    AmazonCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    ProductService
  ]
})
export class AmazonModule { }
