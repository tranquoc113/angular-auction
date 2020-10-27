import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumberPhone]'
})
export class NumberPhoneDirective {
  regex = /^[0-9]/;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.code);
    if(event.key !== undefined){
      if (event.key === 'Backspace' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        return true;
      } else if (!event.key.match(this.regex)) {
        return false;
      }
    }
  }
}
