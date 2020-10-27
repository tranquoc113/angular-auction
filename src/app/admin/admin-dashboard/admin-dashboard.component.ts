import { Component, OnInit }    from '@angular/core';
import {DashboardService} from '../../service/dashboard.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showSpinner = false;
  object = {
    user: 0,
    order: 0,
    total: 0
  };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.showSpinner = true;
    this.dashboardService.list().subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.object = data.item || {};
      }
    }, error => {
      this.showSpinner = false;
    });
  }
}
