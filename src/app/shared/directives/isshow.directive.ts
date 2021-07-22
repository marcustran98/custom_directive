import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[isShow]',
})
export class IsShowDirective {
  constructor(private el: ElementRef) {
    (<HTMLElement>this.el.nativeElement).style.backgroundColor = 'yellow';
  }
}
