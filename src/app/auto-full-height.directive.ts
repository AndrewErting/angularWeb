import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
    Input,
} from '@angular/core';

@Directive({
    selector: '[appAutoFullHeight]',
})
export class AutoFullHeightDirective implements AfterViewInit {
    bufferElem: HTMLElement | null;
    bufferHeight: number;

    @HostListener('window:resize') onresize() {
        this.resize();
    }

    @Input() bufferedContainer: string;

    resize(): void {
        if (this.bufferedContainer === '' || !this.bufferElem) {
            this.bufferHeight = 0;
        } else {
            this.bufferHeight = this.bufferElem.clientHeight;
        }

        const windowHeight = window.innerHeight - this.bufferHeight;
        const calculatedHeight = `${windowHeight}px`;
        this.renderer.setStyle(
            this.element.nativeElement,
            'height',
            calculatedHeight
        );
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.bufferedContainer = '';
        this.bufferHeight = 0;
        this.bufferElem = null;
    }

    ngAfterViewInit(): void {
        this.bufferElem = document.getElementById(this.bufferedContainer);
        this.resize();
    }
}
