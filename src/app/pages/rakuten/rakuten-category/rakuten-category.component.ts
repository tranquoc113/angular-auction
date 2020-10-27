import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rakuten-category',
  templateUrl: './rakuten-category.component.html',
  styleUrls: ['./rakuten-category.component.css']
})
export class RakutenCategoryComponent implements OnInit {
@Output() categoryChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  openDetailProduct(category) {
    this.categoryChange.emit(category);
  }
}
