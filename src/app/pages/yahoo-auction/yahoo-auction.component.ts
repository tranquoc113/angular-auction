import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-yahoo-auction',
  templateUrl: './yahoo-auction.component.html',
  styleUrls: ['./yahoo-auction.component.css']
})
export class YahooAuctionComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  categoryEvent(category) {
    this.router.navigate(['/yahoo-auction/list-yahoo-auction', {category: category}]);
  }
}
