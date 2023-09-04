import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Directive({
    selector: '[appCenterButtonVertical]',
})
export class CenterButtonVerticalDirective implements AfterViewInit {
    @HostListener('window:resize') onresize() {
        this.changeHeight();
    }

    resize() { this.changeHeight(); }

    constructor(private element: ElementRef, private renderer: Renderer2) {  }

    changeHeight(): void {
        var sideBarHeight: any;
        var heightString: string;
        const elem = document.getElementById("pfSidenav");

        if (!elem) {
            heightString = '20px';
            return;
        } else {
            sideBarHeight = elem.clientHeight;
            sideBarHeight =
                sideBarHeight / 2 - this.element.nativeElement.offsetHeight / 2;
            heightString = `${sideBarHeight}px`;
        }

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
