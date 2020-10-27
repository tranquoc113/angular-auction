import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-yahoo-auction',
  templateUrl: './menu-yahoo-auction.component.html',
  styleUrls: ['./menu-yahoo-auction.component.css']
})
export class MenuYahooAuctionComponent implements OnInit {
  @Output() change = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openDetailProduct(val) {
    this.router.navigate(['./yahoo-auction/list-yahoo-auction', {category: val}]);
  }

  back() {
    this.change.emit();
  }
}
