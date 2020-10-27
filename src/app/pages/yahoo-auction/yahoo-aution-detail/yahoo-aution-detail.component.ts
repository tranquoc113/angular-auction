import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {Ranking} from '../../../models/ranking';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../../../models/product';
import {ToastrService} from 'ngx-toastr';
import {ModalDirective} from 'ngx-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Card} from '../../../models/card';
import {AuthenticationService} from '../../../service/authentication.service';
import {AuctionService} from '../../../service/auction.service';
import {CardService} from '../../../service/card.service';
import {FinanceService} from '../../../service/finance.service';

@Component({
  selector: 'app-yahoo-aution-detail',
  templateUrl: './yahoo-aution-detail.component.html',
  styleUrls: ['./yahoo-aution-detail.component.scss']
})
export class YahooAutionDetailComponent implements OnInit {
  statusSlides = 1;
  @ViewChild('childModal', {static: false}) childModal: ModalDirective;
  @ViewChild('childModalDetailFinanceUser', { static: false }) childModalDetailFinanceUser: ModalDirective;
  product = new Product();
  images = [];
  _historyBid = [];
  _rankingShop = new Ranking();
  _diff: number;
  _days: number;
  _hours: number;
  _minutes: number;
  _seconds: number;
  showSpinner = false;
  price: any;
  products = [];
  auctionID = '';
  priceFirt: any;
  priceAuctionErro = false;
  card = new Card();
  Pricecallback = false;
  categoryPathsHover = [];
  domain = 'http://auction.saikoexpress.com//';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private auctionService: AuctionService,
    private cardService: CardService,
    private financeService: FinanceService) {
    translate.setDefaultLang('vi');
  }

  ngOnInit() {
    this.loadData();
    this.showSlides(this.statusSlides);
  }

  categoryEvent(category) {
    this.router.navigate(['/yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  auction(AuctionID) {
    const param = new HttpParams()
      .set('BiddingAuctionID', AuctionID)
      .set('Username', 'xxx')
      .set('Price', this.price.toString());
    this.childModal.hide();
    this.showSpinner = true;
    this.productService.auction(param).subscribe(data => {
        this.showSpinner = false;
        if (data.Status == 'finish') {
          this.toastr.success('Đấu giá thành công!');
        } else if (data.Pricecallback) {
          this.childModal.show();
          this.Pricecallback = true;
          this.price = data.Pricecallback;
        }
        this.card.priceAuction = this.price.toString().replace(',', '');
        this.auctionService.saveCard(this.card).subscribe(card => {
          if (card.type) {
            this.showSpinner = false;
            this.cardService.emitCard(card.items);
          }
        });
      },
      err => {
        this.showSpinner = false;
      });
  }

  openModal() {
    const user = this.authenticationService.getUser();
    if (user) {
      this.auctionID = this.product.AuctionID;
      this.bidingPrice();
      this.product.Image = this.images[0];
      this.setCard(this.product);
      this.childModal.show();
    } else {
      const urlPath = this.router.url.toString();
      this.router.navigate(['/sign-in'], {queryParams: {returnUrl: urlPath}});
    }
  }

  historyBid(AuctionID) {
    const param = new HttpParams().set('HistoryBid', AuctionID);
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

  private loadData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe(data => {
          this.showSpinner = false;
          this.setData(data);
        },
        err => {
          this.showSpinner = false;
        });
    }
  }

  private setData(data): void {
    const _data = data.Result || {};
    this.product = _data;
    const convertNumber = parseInt(this.product.Price.toString());
    this.priceFirt = convertNumber;
    this.price = convertNumber.toString();
    for (let key in _data.Img) {
      if (key != '0') {
        this.images.push([_data.Img[key]]);
      }
    }
    // category
    const arr = _data.CategoryIdPath.toString().split(',');
    this.eventCategoryPath(arr);

    const param = new HttpParams().set('Rankingshop', this.product.Seller.Id);
    this.productService.searchProduct(param).subscribe(data => {
      this._rankingShop = data;
    });

    const paramprod = new HttpParams()
      .set('categoryLeaf', _data.CategoryID)
      .set('number_view', '20')
      .set('page', '1')
      .set('typeauction', '00');
    this.productService.searchProduct(paramprod).subscribe(datass => {
      const datas = datass.Result.Item;
      if (Array.isArray(datas)) {
        this.products = datas;
      } else {
        this.products.push(datas);
      }
    });
    interval(1000).pipe(
      map((x) => {
        this._diff = (Date.parse(new Date(this.product.EndTime).toString()) + 7200000) - Date.parse(new Date().toString());
      })).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });
  }

  private getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  private getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  private getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  private getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  openTranslateDes() {
    const pos = {
      x: (screen.width / 2) - (800 / 2)
    };
    const features = `width=${800} height=${800} left=${pos.x} `;
    window.open(this.domain + 'yahoo-auction/detail/description/translate/' + this.product.AuctionID.toString() + '#googtrans(ja|vi)', 'windowChild', features);
  }

  plusSlides(n) {
    this.showSlides(this.statusSlides + n);
  }

  showSlides(n) {
    this.statusSlides = n;
  }

  openTranslateRanking() {
    const pos = {
      x: (screen.width / 2) - (800 / 2)
    };
    const features = `width=${800} height=${800} left=${pos.x} `;
    window.open(this.domain + 'yahoo-auction/detail/ranking/translate/' + this.product.Seller.Id.toString() + '#googtrans(ja|vi)', 'windowChild', features);
  }

  public eventCategoryPath(arr: Array<any>) {
    arr.forEach(async value => {
      const param = new HttpParams()
        .set('categoryID', value);
      this.productService.redMenu(param).subscribe(data => {
        let result = data.Result.ChildCategory || [];
        let obi = {
          key: value,
          child: result
        };
        this.categoryPathsHover.push(obi);
        if (this.categoryPathsHover.length === arr.length) {
          for (let i = 0; i < arr.length; i++) {
            let old = arr[i];
            for (let j = 0; j < this.categoryPathsHover.length; j++) {
              if (this.categoryPathsHover[j].key == old) {
                this.categoryPathsHover.splice(i, 0, this.categoryPathsHover.splice(j, 1)[0]);
                break;
              }
            }
          }
        }
      });
    });
  }

  openLink(category) {
    this.router.navigate(['yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  openModalAuction(product: Product) {
    const user = this.authenticationService.getUser();
    if (user) {
      this.financeService.getFinanceUser(user.email, user.token).subscribe(data => {
        this.showSpinner = false;
        if (data.type) {
          const moneyUser = data.financeUser || 0;
          const convertNumber = parseInt(product.CurrentPrice);
          const ofMoneyUser = (moneyUser * 100) / convertNumber;
          if (ofMoneyUser < 80) {
            this.childModalDetailFinanceUser.show();
          } else {
            this.auctionID = product.AuctionID;
            this.priceFirt = convertNumber;
            this.price = convertNumber.toString();
            this.setCard(product);
            this.childModal.show();
          }
        }
      });
    } else {
      const urlPath = this.router.url.toString();
      this.router.navigate(['/sign-in'], {queryParams: {returnUrl: urlPath}});
    }
  }

  changePrice() {
    this.bidingPrice();
  }

  private bidingPrice() {
    const priceInput = this.price.toString().replace(',', '');
    if (priceInput < this.priceFirt) {
      this.priceAuctionErro = true;
    } else {
      this.priceAuctionErro = false;
    }
  }

  private setCard(product: Product) {
    this.card.auctionID = product.AuctionID;
    this.card.name = product.Title;
    this.card.img = product.Image;
    this.card.priceMain = parseInt(product.CurrentPrice);
    this.card.timeEnd = new Date(Date.parse(product.EndTime) + 7200000).getTime();
    this.card.timeAuction = new Date().getTime();
    this.card.email = this.authenticationService.getUser().email;
  }
  viewCard() {
    this.router.navigate(['person-setting', {view: 'card'}]);
  }
}
