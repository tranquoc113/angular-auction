import {Component, OnInit} from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../service/order.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  showSpinner = false;
  order = new Order();

  constructor(private orderService: OrderService,
              private toastr: ToastrService,
              private activeRouter: ActivatedRoute) {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.order.id = id;
    }
  }

  ngOnInit() {
    this.showSpinner = true;
    this.orderService.getById(this.order.id).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        const result = data.items || [];
        this.order = result[0];
      }
    }, error => {
      this.showSpinner = false;
    });
  }

  changeStatus() {
    console.log(this.order.orderStatusID);
    const object = {
      id: this.order.id,
      status: this.order.orderStatusID
    };
    this.orderService.changeOrderStatus(object).subscribe(data => {
      if (data.type) {
        this.toastr.success('Đã chuyển trạng thái thành công');
      } else {
        this.toastr.error('Chuyển trạng thái thất bại');
      }
    }, error => {
      this.toastr.error('Máy chủ đang bảo trì hãy thử lại');
    });
  }
}
