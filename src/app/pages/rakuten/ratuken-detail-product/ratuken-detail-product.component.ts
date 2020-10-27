import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RakutenService} from '../../../service/rakuten.service';
import {Rakuten} from '../../../models/rakuten';

declare var $: any;

@Component({
  selector: 'app-ratuken-detail-product',
  templateUrl: './ratuken-detail-product.component.html',
  styleUrls: ['./ratuken-detail-product.component.css']
})
export class RatukenDetailProductComponent implements OnInit {
  rakuten = new Rakuten();
  statusSlides = 1;
  showSpinner = false;

  constructor(private route: ActivatedRoute,
              private rakutenService: RakutenService,
              private router: Router) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.showSlides(this.statusSlides);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rakutenService.getByItemCode(id).subscribe(data => {
          this.showSpinner = false;
          this.rakuten = data.Items[0].Item || {};
          if (this.rakuten.mediumImageUrls.length > 0) {
            this.rakuten.mediumImageUrls.forEach(val => {
              val.imageUrl = val.imageUrl.toString().replace('?_ex=128x128', '');
            });
          }
        },
        err => {
          this.showSpinner = false;
        });
    }
  }

  categoryEvent(val) {
    this.router.navigate(['/rakuten/list-rakuten', {category: val}]);
  }

  plusSlides(n) {
    this.showSlides(this.statusSlides + n);
  }

  showSlides(n) {
    this.statusSlides = n;
  }

  openTranslateDes() {
    const pos = {
      x: (screen.width / 2) - (800 / 2),
    };
    const features = `width=${800} height=${800} left=${pos.x} `;
    window.open('https://tomoniglobal.org/rakuten/detail/description/translate/' + this.rakuten.itemCode.toString() + '#googtrans(ja|vi)', 'windowChild', features);
  }
}
