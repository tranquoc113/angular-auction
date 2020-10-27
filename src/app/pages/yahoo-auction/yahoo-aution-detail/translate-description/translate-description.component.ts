import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from '../../../../models/product';
import {ProductService} from '../../../../service/product.service';
declare var $: any;
@Component({
  selector: 'app-translate-description',
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css']
})
export class TranslateDescriptionComponent implements OnInit {
  product = new Product();
  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getById(id).subscribe(data => {
      const _data = data.Result || {};
      this.product = _data;
    });
    $.getScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  }
}
