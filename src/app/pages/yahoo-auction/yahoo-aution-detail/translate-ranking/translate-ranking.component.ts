import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../../service/product.service';

declare var $: any;

@Component({
  selector: 'app-translate-ranking',
  templateUrl: './translate-ranking.component.html',
  styleUrls: ['./translate-ranking.component.css']
})
export class TranslateRankingComponent implements OnInit {
  ranking = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const param = new HttpParams().set('Rankingshop', id);
      this.productService.searchProduct(param).subscribe(data => {
        const _data = data.Result;
        console.log(data)
        if (Array.isArray(_data)) {
          this.ranking = _data;
        } else {
          this.ranking.push(_data);
        }
      });
    }
    $.getScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  }
}
