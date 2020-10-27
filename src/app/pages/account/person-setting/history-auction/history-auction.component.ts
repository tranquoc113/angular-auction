import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-history-auction',
  templateUrl: './history-auction.component.html',
  styleUrls: ['./history-auction.component.css']
})
export class HistoryAuctionComponent implements OnInit, OnChanges {
 @Input() historyAuctionsIn: Array<any>;
  constructor() { }

  ngOnInit() {}
  ngOnChanges() {
    console.log('change2:    ', this.historyAuctionsIn);
  }
}
