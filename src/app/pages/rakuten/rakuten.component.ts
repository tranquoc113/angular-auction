import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rakuten',
  templateUrl: './rakuten.component.html',
  styleUrls: ['./rakuten.component.css']
})
export class RakutenComponent implements OnInit {
  constructor(
    private router: Router) { }
  ngOnInit() {
  }
  productCategory(category){
    this.router.navigate(['/rakuten/list-rakuten',{category: category}]);
  }
}
