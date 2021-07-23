import { HostListener, Renderer2, SimpleChanges } from '@angular/core';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnChanges {
  @Input() tooltip!: string;
  @Input() delay!: string;
  customTitle!: HTMLElement;
  count = 0;
  @HostListener('mouseover') onMouseOver() {
    console.log("this.customTitle", this.customTitle);
    if (!this.count) {
      this.create();
    }
  }
  @HostListener("mouseleave") onLeave() {
    this.remove();
  }
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  create(): void {
    (this.el.nativeElement as HTMLElement).style.backgroundColor = 'pink';
    this.customTitle = this.renderer.createElement('span');
    const text = this.renderer.createText(this.tooltip);
    this.renderer.appendChild(this.customTitle, text);
    this.customTitle.style.transition = `${+this.delay ? +this.delay / 1000 : 0}s`;
    this.customTitle.classList.add('tooltip-ne');
    setTimeout(() => {
      this.customTitle.style.opacity = "1";
    }, +this.delay)
    this.renderer.appendChild(this.el.nativeElement, this.customTitle);
    this.count = 1;
  }

  remove(): void {
    if (this.count) {
      this.customTitle.style.opacity = "0";
      setTimeout(() => {
        this.renderer.removeChild(this.el.nativeElement, this.customTitle);
        this.count = 0;
      }, +this.delay || 0)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
