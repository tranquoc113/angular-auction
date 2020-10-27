import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RakutenService} from '../../../service/rakuten.service';

@Component({
  selector: 'app-ratuken-list',
  templateUrl: './rakuten-list.component.html',
  styleUrls: ['./rakuten-list.component.css']
})
export class RakutenListComponent implements OnInit {
  _listRakutens = [];
  _category = '';
  _page = 1;
  currentPage = 1;
  _hits = 20;
  _sort = 'standard';
  _keySearch = '';
  totalItems = 0;
  _checkSearch = false;
  showSpinner = false;
  err = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rakutenService: RakutenService
  ) {
    const search = this.route.snapshot.paramMap.get('search');
    const category = this.route.snapshot.paramMap.get('category');
    if (category) {
      this._category = category;
      this._checkSearch = false;
      this.getDataFromService();
    } else if (search.length > 1) {
      this._checkSearch = true;
      this._keySearch = search;
      this.getDataFromService();
    }
    this.currentPage = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {

  }

  categoryEvent(category) {
    this.router.navigate(['rakuten/list-rakuten', {category: category}]);
  }

  hitsItem() {
    this.getDataFromService();
  }

  pageChanged(event) {
    this._page = event.page;
    this.getDataFromService();
  }

  appPageChange(page: number) {
    this._page = page;
    this.currentPage = page;
  }

  sortRakuten() {
    this.getDataFromService();
  }

  private getDataFromService() {
    this.showSpinner = true;
    if (this._checkSearch) {
      this.rakutenService.searchProduct(this.setParam(true)).subscribe(x => {
          this.showSpinner = false;
          this.setData(x);
        },
        err => {
          this.showSpinner = false;
          this.err = true;
        });
    } else {
      this.rakutenService.getByCategory(this.setParam()).subscribe(x => {
          this.showSpinner = false;
          this.setData(x);
        },
        err => {
          this.showSpinner = false;
          this.err = true;
        });
    }

  }

  private setData(data) {
    this._listRakutens = [];
    this._listRakutens = data.Items || [];
    this._listRakutens.forEach(val => {
      if (val.Item.mediumImageUrls.length > 0) {
        val.Item.mediumImageUrls[0].imageUrl = val.Item.mediumImageUrls[0].imageUrl.toString().replace('?_ex=128x128', '');
      }
    });
    this.totalItems = data.count;
    this.err = this.totalItems > 0 ? false : true;
  }

  private setParam(check?) {
    let param;
    if (check) {
      param = {
        page: this._page,
        hits: this._hits,
        sort: this._sort.toString(),
        keyword: this._keySearch,
        genreId: this._category
      };
    } else {
      param = {
        page: this._page,
        hits: this._hits,
        sort: this._sort,
        genreId: this._category
      };
    }
    return param;
  }

}
