import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {
  @Input() orderDetail: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    console.log(this.orderDetail);
  }
}
