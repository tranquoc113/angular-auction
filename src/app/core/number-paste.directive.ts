import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberPaste]'
})
export class NumberPasteDirective {
  regex = /^[0-9]/;

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.key == 'Backspace'){
      return true;
    }else if (!event.key.match(this.regex)) {
      return false;
    }
  }
}
