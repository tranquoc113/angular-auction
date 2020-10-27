import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-rakuten',
  templateUrl: './menu-rakuten.component.html',
  styleUrls: ['./menu-rakuten.component.css']
})
export class MenuRakutenComponent implements OnInit {
  @Output() change = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openDetailProduct(val) {
    this.router.navigate(['./rakuten/list-rakuten',{category: val}]);
  }

  back() {
    this.change.emit();
  }
}
