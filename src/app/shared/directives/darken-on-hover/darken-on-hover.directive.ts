import { Directive, ElementRef, HostListener, Renderer, Input } from "@angular/core";

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input()
    brightness: string = '70%';

    constructor(private el: ElementRef, private renderer: Renderer) {}

    @HostListener('mouseover')
    darkeOn() {
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOf() {
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}