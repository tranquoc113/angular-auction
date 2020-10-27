import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-amazon-category',
  templateUrl: './amazon-category.component.html',
  styleUrls: ['./amazon-category.component.css']
})
export class AmazonCategoryComponent implements OnInit {

  constructor(private titles: ElementRef) { }

  ngOnInit() {
  }
  openDetailProduct(category, title?){

}

}
