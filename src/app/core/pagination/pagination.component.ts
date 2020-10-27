import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnChanges  {
  pager =  {
    pages: new Array<any>(),
    currentPage: 1,
    totalPages: 0
  };
  @Input() totalItems=20;
  @Input() currentPage=1;
  @Input() pageSize = 20;
  @Input() maxPages = 8;
  @Output() pageChanges = new EventEmitter<number>();
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {}
  ngOnChanges() {
    this.pager=this.paginate(this.totalItems, this.currentPage, this.pageSize, this.maxPages);
  }
  setPage(page: number) {
    this.pageChanges.emit(page);
    this.pager.currentPage=page;
  }
 private paginate(totalItems: number, currentPage, pageSize: number, maxPages: number) {
   // calculate total pages
   let totalPages = Math.ceil(totalItems / pageSize);

   // ensure current page isn't out of range
   if (currentPage < 1) {
     currentPage = 1;
   } else if (currentPage > totalPages) {
     currentPage = totalPages;
   }

   let startPage: number, endPage: number;
   if (totalPages <= maxPages) {
     // total pages less than max so show all pages
     startPage = 1;
     endPage = totalPages;
   } else {
     // total pages more than max so calculate start and end pages
     let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
     let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
     if (currentPage <= maxPagesBeforeCurrentPage) {
       // current page near the start
       startPage = 1;
       endPage = maxPages;
     } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
       // current page near the end
       startPage = totalPages - maxPages + 1;
       endPage = totalPages;
     } else {
       // current page somewhere in the middle
       startPage = currentPage - maxPagesBeforeCurrentPage;
       endPage = currentPage + maxPagesAfterCurrentPage;
     }
   }

   // calculate start and end item indexes
   let startIndex = (currentPage - 1) * pageSize;
   let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

   // create an array of pages to ng-repeat in the pager control
   let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

   // return object with all pager properties required by the view
   return {
     totalItems: totalItems,
     currentPage: currentPage,
     pageSize: pageSize,
     totalPages: totalPages,
     startPage: startPage,
     endPage: endPage,
     startIndex: startIndex,
     endIndex: endIndex,
     pages: pages
   };
 }
}
