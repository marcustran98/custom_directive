import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[apphighlight]"
})
export class HightLightDirective {
  @HostListener("mouseover") mouseOOver() {
    this.el.nativeElement.style.backgroundColor = "red";
  }

  @HostListener("mouseleave") mouseOMove() {

    this.el.nativeElement.style.backgroundColor = "yellow";
  }
  constructor(private el: ElementRef) {
    console.log("ele", el);
    this.el.nativeElement.style.backgroundColor = "yellow";
  }
}