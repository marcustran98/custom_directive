
import { Input, AfterViewInit, ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})

export class TextareaAutosizeDirective implements AfterViewInit {

    private el: HTMLTextAreaElement;
    private _minHeight!: string;
    private _maxHeight!: string;
    private _clientWidth: number;

    @Input('minHeight')
    get minHeight(): string {
        return this._minHeight;
    }
    set minHeight(val: string) {
        this._minHeight = val;
        this.updateMinHeight();
    }

    @Input() set value(value: string) {
        this.el.value = value;
        this.adjust();
    }

    @Input('maxHeight')
    get maxHeight(): string {
        return this._maxHeight;
    }
    set maxHeight(val: string) {
        this._maxHeight = val;
        this.updateMaxHeight();
    }

    @HostListener('window:resize', ['$event.target'])
    onResize(textArea: HTMLTextAreaElement): void {
        // Only apply adjustment if element width had changed.
        if (this.el.clientWidth === this._clientWidth) {
            return
        };
        this._clientWidth = this.element.nativeElement.clientWidth;
        this.adjust();
    }

    @HostListener("input")
    onInput(): void {
        this.adjust();
    }

    constructor(private element: ElementRef) {
        this.el = this.element.nativeElement;
        this._clientWidth = this.el.clientWidth;
    }

    ngAfterViewInit(): void {
        // set element resize allowed manually by user
        const style = window.getComputedStyle(this.el, null);
        if (style.resize === 'both') {
            this.el.style.resize = 'horizontal';
        } else if (style.resize === 'vertical') {
            this.el.style.resize = 'none';
        }
        // run first adjust
        this.adjust();
    }

    adjust(): void {
        // perform height adjustments after input changes, if height is different
        if (this.el.style.height == this.element.nativeElement.scrollHeight + 'px') {
            return;
        }
        this.el.style.overflow = 'hidden';
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + 'px';
    }

    updateMinHeight(): void {
        // Set textarea min height if input defined
        this.el.style.minHeight = this._minHeight + 'px';
    }

    updateMaxHeight(): void {
        // Set textarea max height if input defined
        this.el.style.maxHeight = this._maxHeight + 'px';
    }

}