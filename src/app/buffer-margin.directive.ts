import {
    Directive,
    Input,
    AfterViewInit,
    Renderer2,
    ElementRef,
    ViewChild,
} from '@angular/core';

@Directive({
    selector: '[appBufferMargin]',
})
export class BufferMarginDirective implements AfterViewInit {
    @Input() bufferedContainer: string;

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.bufferedContainer = '';
    }

    ngAfterViewInit(): void {
        var bufferElem;
        var bufferHeight;

        bufferElem = document.getElementById(this.bufferedContainer);
        console.log(bufferElem?.style.height);

        if (this.bufferedContainer === '' || !bufferElem) {
            bufferHeight = 0;
            console.log('Early return @ buffer-margin');
        } else {
            bufferHeight = bufferElem.clientHeight;
        }

        console.log(`${bufferHeight}px`);
        this.renderer.setStyle(
            this.element.nativeElement,
            'margin-top',
            `${bufferHeight}px`
        );
    }
}
