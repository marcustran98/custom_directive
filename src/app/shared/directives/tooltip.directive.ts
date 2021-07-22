import { HostListener, Renderer2, SimpleChanges } from '@angular/core';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnChanges {
  @Input() tooltip!: string;
  @HostListener('mouseover') onMouseOver() {
    (this.el.nativeElement as HTMLElement).style.backgroundColor = 'pink';
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(this.tooltip);
    this.renderer.appendChild(span, text);
    (span as HTMLElement).classList.add('tooltip-ne');
    this.renderer.appendChild(this.el.nativeElement, span);
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
