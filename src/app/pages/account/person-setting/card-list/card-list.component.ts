import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Card} from '../../../../models/card';
import {BsModalService, ModalDirective} from 'ngx-bootstrap';
import {AuctionService} from '../../../../service/auction.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../../service/product.service';
import {CardService} from '../../../../service/card.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @ViewChild('childModal', {static: false}) childModal: ModalDirective;
  @Input() cards: Array<Card>;
  historyAuctions = [];
  showSpinner = false;
  price: any;
  priceAuctionErro = false;
  Pricecallback = false;
  card = new Card();

  constructor(private modalService: BsModalService,
              private auctionService: AuctionService,
              private authenticationService: AuthenticationService,
              private yahooAuctionService: ProductService,
              private toastr: ToastrService,
              private cardService: CardService) {
  }

  ngOnInit() {}

  openModalHistory(auctionID) {
    const param = new HttpParams().set('HistoryBid', auctionID);
    this.yahooAuctionService.searchProduct(param).subscribe(data => {
      const datas = data.Result;
      if (Array.isArray(datas)) {
        this.historyAuctions = datas;
      } else {
        this.historyAuctions = [];
        this.historyAuctions.push(datas);
      }
    });
  }

  changePrice() {
    const priceInput = this.price.toString().replace(',', '');
    if (priceInput < this.card.priceMain) {
      this.priceAuctionErro = true;
    } else {
      this.priceAuctionErro = false;
    }
  }

  auction() {
    const param = new HttpParams()
      .set('BiddingAuctionID', this.card.auctionID)
      .set('Username', 'xxx')
      .set('Price', this.price.toString());
    this.childModal.hide();
    this.showSpinner = true;
    this.yahooAuctionService.auction(param).subscribe(data => {
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
        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
      });
  }

  openModalAuction(item: Card) {
    this.price = item.priceAuction.toString();
    this.card.auctionID = item.auctionID;
    this.card.email = this.authenticationService.getUser().email;

    console.log(this.card);
    this.childModal.show();
  }
}
