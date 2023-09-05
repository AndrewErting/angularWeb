import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { buffer } from 'rxjs';

@Directive({
    selector: '[appCenterButtonVertical]',
})
export class CenterButtonVerticalDirective implements AfterViewInit {
    @HostListener('window:resize') onresize() {
        this.changeHeight();
    }

    @Input() bufferedContainer: string;

    resize() {
        this.changeHeight();
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.bufferedContainer = '';
    }

    changeHeight(): void {
        var sideBarHeight: any;
        var heightString: string;
        var bufferHeight: number;
        const bufferElem = document.getElementById(this.bufferedContainer);
        const elem = document.getElementById('pfSidenav');

        if (this.bufferedContainer === '' || !bufferElem) {
            bufferHeight = 0;
        } else {
            bufferHeight =
                bufferElem.offsetHeight +
                parseInt(bufferElem.style.marginTop.replace(/[px]/, ''));
        }

        if (!elem) {
            return;
        } else {
            sideBarHeight = elem.clientHeight;
            sideBarHeight =
                sideBarHeight / 2 -
                this.element.nativeElement.offsetHeight / 2 -
                bufferHeight;
            heightString = `${sideBarHeight}px`;
        }
        console.log('Sidebar Height: ', elem.clientHeight);
        console.log('Buffer Height: ', bufferHeight);
        console.log('Calculated Height: ', sideBarHeight);

        this.renderer.setStyle(
            this.element.nativeElement,
            'margin-top',
            heightString
        );
    }

    ngAfterViewInit(): void {
        this.changeHeight();
    }
}
