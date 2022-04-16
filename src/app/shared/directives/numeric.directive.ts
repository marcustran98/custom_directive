import { Directive, ElementRef, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

export enum KEY_CODE {
  ARROW_UP = 38,
  ARROW_DOWN = 40
}

export const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);


@Directive({
  selector: '[appNumeric]'
})

export class NumericDirective {

  @Input() decimals!: number;
  @Input() max!: number;
  @Input() min!: number;

  private readonly EPSILON: number = 1.0e-6;

  constructor(
    private el: ElementRef,
    @Optional() @Self() private ngControl: NgControl) {

    if (isIEOrEdge) {
      this.handleKeyUpOrDownOnIE();
    }
    this.el.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      const isRequiredInteger = this.decimals === 0 && event.key === ".";

      // When the input[type="number"] value is invalid by HTML5 validator, that value is removed.
      // ex: -123 is valid,
      //     --123 is invalid => input value is removed by default.
      const isAlreadyNegativeOrZero = (event.target as HTMLInputElement).valueAsNumber <= 0 && event.key === "-";

      if (isRequiredInteger || isAlreadyNegativeOrZero) {
        event.preventDefault();
      }
    });
    this.el.nativeElement.addEventListener('input', (event: any) => this.checkValue(event.target.value));
  }

  private handleKeyUpOrDownOnIE(): void {
    this.el.nativeElement.addEventListener('keyup', (event: any) => {
      const { keyCode } = event;
      if (keyCode !== KEY_CODE.ARROW_UP && keyCode !== KEY_CODE.ARROW_DOWN) {
        return;
      }

      let inputValue = +this.el.nativeElement.value;

      if (!this.decimals) {
        inputValue = keyCode === KEY_CODE.ARROW_UP ? inputValue + 1 : inputValue - 1;
      } else {
        inputValue = keyCode === KEY_CODE.ARROW_UP ? inputValue + Math.pow(10, -this.decimals) : inputValue - Math.pow(10, -this.decimals);
      }

      this.setValue(inputValue);
      this.checkValue(this.el.nativeElement.value);
    });
  }

  private checkValue(value: number | string): void {
    if (value === null || value === undefined || value === '') {
      this.setValue(null || 0);
    } else if (typeof this.min === 'number' && this.min > +value) {
      this.setValue(this.min);
    } else if (typeof this.max === 'number' && this.max < +value) {
      this.setValue(this.max);
    } else if (!this.checkPattern(String(value))) {
      this.setValue(this.fixedDecimals(+value));
    }
  }

  private setValue(value: number): void {
    if (this.ngControl instanceof NgControl) {
      this.ngControl.control?.setValue(value);
    } else {
      this.el.nativeElement.value = value;
    }
  }

  private fixedDecimals(value: number): number {
    const extra = Math.pow(10, this.decimals);
    if (value < 0) {
      return this.ceil(value * extra) / extra;
    }
    return this.floor(value * extra) / extra;
  }



  private checkPattern(value: string): boolean {
    if (this.decimals > 0) {
      const regExpString = "^\\s*-?((\\d+(\\.\\d{0," + this.decimals + "})?)|((\\d*(\\.\\d{1," + this.decimals + "}))))\\s*$";
      return !!String(value).match(new RegExp(regExpString));
    } else if (this.decimals === 0){
      return !!String(value).match(new RegExp(/^-?\d+$/));
    }
    return true;
  }


  private ceil(value: number): number {
    return Math.ceil(+value - this.EPSILON);
  }

  private  floor(value: number): number {
    return Math.floor(+value + this.EPSILON);
  }
}
