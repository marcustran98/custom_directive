import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[apphighlight]',
})
export class HightLightDirective {
  @HostListener('mouseover') mouseOOver() {
    (<HTMLElement>this.el.nativeElement).style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') mouseOMove() {
    (<HTMLElement>this.el.nativeElement).style.backgroundColor = 'yellow';
  }

  @HostListener('click') onCLick() { }
  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('ele', el);
    (<HTMLElement>this.el.nativeElement).style.backgroundColor = 'yellow';
  }
}
