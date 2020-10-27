import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  categoryYahooAuction(category) {
    this.router.navigate(['/yahoo-auction/list-yahoo-auction', {category: category}]);
  }
  categoryRakuten(category) {
    this.router.navigate(['/rakuten/list-rakuten', {category: category}]);
  }
}
