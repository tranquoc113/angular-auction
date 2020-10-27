import {Component, OnInit} from '@angular/core';
import {Rakuten} from '../../../../models/rakuten';
import {RakutenService} from '../../../../service/rakuten.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-rakuten-translate-description',
  templateUrl: './rakuten-translate-description.component.html',
  styleUrls: ['./rakuten-translate-description.component.css']
})
export class RakutenTranslateDescriptionComponent implements OnInit {

  rakuten = new Rakuten();

  constructor(private rakutenService: RakutenService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rakutenService.getByItemCode(id).subscribe(data => {
        this.rakuten = data.Items[0].Item || {};
      });
    }
    $.getScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  }

}
