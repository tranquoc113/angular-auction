import {Component, OnInit, HostListener, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../service/product.service';
import {HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {User} from '../../../models/user';
import {Subscription} from 'rxjs';
import {CardService} from '../../../service/card.service';
import {Card} from '../../../models/card';
import {AuctionService} from '../../../service/auction.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  sideBar = false;
  _textSearch = '';
  statusHome = true;
  currentUser = new User();
  categoryYahoo = new CategoryYahoo();
  subsVar: Subscription;
  cards = new Array<Card>();
  sumMoney = 0;

  constructor(
    private yahooAuctionService: ProductService,
    private translate: TranslateService,
    private activeRouter: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private cardService: CardService,
    private router: Router,
    private auctionService: AuctionService) {
    translate.setDefaultLang('vi');
    this.subsVar = this.authenticationService.currentUser.subscribe(data => {
      if (data) {
        if (this.authenticationService.getUser()) {
          this.currentUser = data;
        } else {
          this.currentUser = new User();
        }
      }
    });
  }

  ngOnInit() {
    if (this.currentUser.role) {
      this.auctionService.listCard(this.currentUser.email, this.currentUser.token).subscribe(listCard => {
        if (listCard.type) {
          this.sumMoneyCard(listCard.items);
        }
      });
    }
    this.cardService.subjectCard.subscribe(data => {
      this.sumMoneyCard(data);
    });

    if (this.router.url.toString().includes('yahoo-auction') || this.router.url.toString().includes('rakuten')) {
      this.statusHome = false;
      if (this.router.url.toString().includes('yahoo-auction')) {
        const category = this.activeRouter.snapshot.paramMap.get('category');
        if (category) {
          this.loadDataCategory(category);
        } else {
          this.loadDataCategory('');
        }
      }
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
  //   if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
  //     this.minimized = true;
  //   } else {
  //     this.minimized = false;
  //   }
  // }
  categoryEvent(category) {
    this.router.navigate(['/yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  isMobile() {
    this.sideBar = !this.sideBar;
  }

  search() {
    if (this.router.url.toString().includes('yahoo-auction')) {
      this.router.navigate(['yahoo-auction/list-yahoo-auction', {search: this._textSearch}]);
    } else if (this.router.url.toString().includes('rakuten')) {
      this.router.navigate(['rakuten/list-rakuten', {search: this._textSearch}]);
    }
    this._textSearch = '';
  }

  yahooAuctionLoad(category) {
    this.statusHome = false;
    this.categoryYahoo = new CategoryYahoo();
    const param = new HttpParams()
      .set('categoryID', category);
    this.yahooAuctionService.redMenu(param).subscribe(data => {
      if (data.Result.IsLeaf === 'true') {
        const params = new HttpParams().set('categoryID', data.Result.ParentCategoryId);
        this.yahooAuctionService.redMenu(params).subscribe(datas => {
          this.categoryYahoo = datas.Result;
        });
      } else {
        this.categoryYahoo = data.Result || {};
      }
    });
  }

  openLink(category) {
    this.router.navigate(['yahoo-auction/list-yahoo-auction', {category: category}]);
  }

  back(category) {
    if (category === '0' || category === undefined) {
      this.statusHome = true;
      return;
    }
    this.loadDataCategory(category);
  }

  private loadDataCategory(category) {
    this.categoryYahoo = new CategoryYahoo();
    const param = new HttpParams()
      .set('categoryID', category);
    this.yahooAuctionService.redMenu(param).subscribe(data => {
      this.categoryYahoo = data.Result || {};
    });
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }

  viewCard() {
    this.router.navigate(['person-setting', {view: 'card'}]);
  }

  private sumMoneyCard(listCard): void {
    this.sumMoney = 0;
    this.cards = listCard;
    for (let i = 0; i < this.cards.length; i++) {
      this.sumMoney += parseFloat(this.cards[i].priceAuction.toString());
    }
  }
}

class CategoryYahoo {
  CategoryId = '';
  ParentCategoryId = '';
  ChildCategory = [];
}
