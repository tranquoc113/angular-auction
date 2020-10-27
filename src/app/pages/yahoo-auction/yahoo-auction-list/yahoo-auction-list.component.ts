import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Card} from '../../../models/card';
import {CardService} from '../../../service/card.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {AuctionService} from '../../../service/auction.service';
import {Product} from '../../../models/product';
import {FinanceService} from '../../../service/finance.service';

@Component({
  selector: 'app-yahoo-auction-list',
  templateUrl: './yahoo-auction-list.component.html',
  styleUrls: ['./yahoo-auction-list.component.scss']
})
export class YahooAuctionListComponent implements OnInit {
  @ViewChild('childModal', {static: false}) childModal: ModalDirective;
  @ViewChild('childModalFinanceUser', {static: false}) childModalFinanceUser: ModalDirective;
  _category = '';
  _page = 1;
  _itemsPerPage = 20;
  _valueSort = '00';
  _txtSearch = '';
  totalItems = 0;
  currentPage = 1;
  products = [];
  _statusSearch = false;
  _historyBid = [];
  showSpinner = false;
  err = false;
  Category = [];
  categoryText = '';
  categoryPathsHover = [];
  price: any;
  auctionID = '';
  Pricecallback = false;
  priceFirt: any;
  priceAuctionErro = false;
  card = new Card();
  message: string;
  messages = '';
  datas: any;

  constructor(private productService: ProductService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private translate: TranslateService,
              private toastr: ToastrService,
              private cardService: CardService,
              private auctionService: AuctionService,
              private financeService: FinanceService,
              private authenticationService: AuthenticationService,
              private toastrService: ToastrService) {
    translate.setDefaultLang('vi');
    const search = activeRouter.snapshot.paramMap.get('search');
    const category = activeRouter.snapshot.paramMap.get('category');
    if (category) {
      this._category = category;
      this.searchData();
      this._statusSearch = false;
    } else {
      this._txtSearch = search;
      this._statusSearch = true;
      this.searchData();
    }
    this.currentPage = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {

  }

  private setParam(check?): HttpParams {
    let param;
    if (check) {
      param = new HttpParams()
        .set('number_view', this._itemsPerPage.toString())
        .set('page', this._page.toString())
        .set('SearchItem', this._txtSearch)
        .set('typeauction', this._valueSort);
    } else {
      param = new HttpParams()
        .set('categoryLeaf', this._category)
        .set('number_view', this._itemsPerPage.toString())
        .set('page', this._page.toString())
        .set('typeauction', this._valueSort);
    }
    return param;
  }

  pageChange(page) {
    this._page = page.page;
    this.searchData();
  }

  sortPorduct() {
    this.searchData();
  }

  orderItem() {
    this.searchData();
  }

  private searchData() {
    const param = this._statusSearch ? this.setParam(true) : this.setParam();
    this.showSpinner = true;
    this.productService.searchProduct(param).subscribe(data => {
        this.showSpinner = false;
        this.setDataResult(data);
      },
      err => {
        this.showSpinner = false;
        this.err = true;
      });
  }

  historyBid(auctionID) {
    const param = new HttpParams().set('HistoryBid', auctionID);
    this.productService.searchProduct(param).subscribe(data => {
      const datas = data.Result;
      if (Array.isArray(datas)) {
        this._historyBid = datas;
      } else {
        this._historyBid = [];
        this._historyBid.push(datas);
      }
    });
  }

  private setDataResult(data: any): void {
    this.products = [];
    const dataPage = data['@attributes'];
    if (data.Result.Item) {
      const datas = data.Result.Item;
      if (Array.isArray(datas)) {
        this.products = datas;
      } else {
        this.products.push(datas);
      }
      this.totalItems = dataPage.totalResultsAvailable;
    } else {
      this.totalItems = 0;
    }
    this.err = this.totalItems > 0 ? false : true;
  }

  categoryFind() {
    this.Category = [];
    const param = new HttpParams()
      .set('categoryID', this.categoryText);
    this.productService.redMenu(param).subscribe(data => {
      this.Category = data.Result.ChildCategory;
    });
  }

  openLink(category) {
    this.router.navigate(['yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  public eventCategoryPath(arr: Array<any>) {
    arr.forEach(async value => {
      const param = new HttpParams()
        .set('categoryID', value);
      this.productService.redMenu(param).subscribe(data => {
        const result = data.Result.ChildCategory || [];
        const obi = {
          key: value,
          child: result
        };
        this.categoryPathsHover.push(obi);
        if (this.categoryPathsHover.length === arr.length) {
          for (let i = 0; i < arr.length; i++) {
            let old = arr[i];
            for (let j = 0; j < this.categoryPathsHover.length; j++) {
              if (this.categoryPathsHover[j].key === old) {
                this.categoryPathsHover.splice(i, 0, this.categoryPathsHover.splice(j, 1)[0]);
                break;
              }
            }
          }
        }
      });
    });
  }

  openModalAuction(product: any) {
    const user = this.authenticationService.getUser();
    if (user) {
      this.showSpinner = true;
      this.financeService.getFinanceUser(user.email, user.token).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          const moneyUser = data.financeUser || 0;
          const convertNumber = Number(product.CurrentPrice);
          const ofMoneyUser = (moneyUser * 100) / convertNumber;
          if (ofMoneyUser < 80) {
            this.childModalFinanceUser.show();
          } else {
            this.auctionID = product.AuctionID;
            this.priceFirt = convertNumber;
            this.price = convertNumber.toString();
            this.setCard(product);
            this.bidingPrice();
            this.childModal.show();
          }
        }
      });
    } else {
      const urlPath = this.router.url.toString();
      this.router.navigate(['/sign-in'], {queryParams: {returnUrl: urlPath}});
    }
  }

  setCard(product: Product) {
    this.card.auctionID = product.AuctionID;
    this.card.name = product.Title;
    this.card.img = product.Image;
    this.card.timeEnd = new Date(Date.parse(product.EndTime) + 7200000).getTime();
    this.card.timeAuction = new Date().getTime();
    this.card.priceMain = parseInt(product.CurrentPrice);
    this.card.email = this.authenticationService.getUser().email;
  }

  auction() {
    const param = new HttpParams()
      .set('BiddingAuctionID', this.auctionID)
      .set('Username', 'xxx')
      .set('Price', this.price.toString());
    this.childModal.hide();
    // this.showSpinner = true;
    this.card.priceAuction = this.price.toString().replace(',', '');
    this.auctionService.auction(this.card).subscribe((result) => {
      console.log(result);
      this.datas = result;
      // this.toastrService.success('Đấu giá thành công', 'Thông báo', {
      //   timeOut: 6000,
      //   closeButton: true,
      //   progressBar: true
      // });
      // this.toastrService.info('Đấu giá thành công', 'Thông báo', {
      //   timeOut: 8000,
      //   closeButton: true,
      //   progressBar: true
      // });
      this.toastrService.info('Đấu giá thành công  ' + result, 'Thông báo', {
        closeButton: true,
        progressBar: true,
        disableTimeOut: true
      });
      // this.card = new Card();
    });
    // this.productService.auction(param).subscribe(data => {
    //     if (data.Status == 'finish') {
    //       this.toastr.success('Đấu giá thành công!');
    //     } else if (data.Pricecallback) {
    //       this.childModal.show();
    //       this.Pricecallback = true;
    //       this.price = data.Pricecallback;
    //     }
    //     this.card.priceAuction = this.price.toString().replace(',', '');
    //     this.auctionService.saveCard(this.card, this.authenticationService.getUser().token).subscribe(card => {
    //       if (card.type) {
    //         this.showSpinner = false;
    //         this.cardService.emitCard(card.items);
    //       }
    //     });
    //   },
    //   err => {
    //     this.showSpinner = false;
    //   });
  }

  changePrice() {
    this.bidingPrice();
  }

  private bidingPrice() {
    const priceInput = this.price.toString().replace(',', '');
    console.log(priceInput);
    if (priceInput <= this.priceFirt) {
      this.priceAuctionErro = true;
    } else {
      this.priceAuctionErro = false;
    }
  }
}
