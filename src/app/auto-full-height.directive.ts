import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appAutoFullHeight]',
})
export class AutoFullHeightDirective implements AfterViewInit {
    @HostListener('window:resize') onresize() {
        this.resize();
    }

    resize(): void {
        const windowHeight = window.innerHeight - 64;
        const calculatedHeight = `${windowHeight}px`;
        this.renderer.setStyle(
            this.element.nativeElement,
            'height',
            calculatedHeight
        );
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.resize();
    }

    ngAfterViewInit(): void {}
}
