import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../service/product.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-yahoo-auction-category',
  templateUrl: './yahoo-auction-category.component.html',
  styleUrls: ['./yahoo-auction-category.component.css']
})
export class YahooAuctionCategoryComponent implements OnInit {
  @Output() categoryPath = new EventEmitter<Array<any>>();
  @Input() category: any;
  category_Parent = [];
  category_Child = [];
  showDowns = '';
  statusShow = false;

  constructor(private productService: ProductService,
              private translate: TranslateService,
              private router: Router) {
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
    this.getData();
  }

  loadMenuCategoryChild(CategoryId: any, event: boolean) {
    if (event) {
      this.category = CategoryId;
      this.category_Child = [];
      const param = new HttpParams()
        .set('categoryID', this.category);
      this.productService.redMenu(param).subscribe(data => {
        this.category_Child = data.Result.ChildCategory;
      });
    }
  }

  openLink(category) {
    this.router.navigate(['yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  openParent(category) {
    this.category = category;
    this.openLink(this.category);
  }

  getData() {
    this.category_Parent = [];
    const param = new HttpParams()
      .set('categoryID', this.category);
    this.productService.redMenu(param).subscribe(data => {
      if (data.Result.IsLeaf === 'true') {
        const params = new HttpParams().set('categoryID', data.Result.ParentCategoryId);
        this.productService.redMenu(params).subscribe(datas => {
          this.category_Parent = datas.Result.ChildCategory;
          const arr = datas.Result.CategoryIdPath.toString().split(',');
          this.categoryPath.emit(arr);
        });
      } else {
        this.category_Parent = data.Result.ChildCategory;
        const arr = data.Result.CategoryIdPath.toString().split(',');
        this.categoryPath.emit(arr);
      }

    });
  }

  showDown(item) {
    this.statusShow = !this.statusShow;
    this.showDowns = item;
  }

}
