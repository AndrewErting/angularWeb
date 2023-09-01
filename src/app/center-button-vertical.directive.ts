import {
    Directive,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appCenterButtonVertical]',
})
export class CenterButtonVerticalDirective implements AfterViewInit {
    @HostListener('window:resize') onresize() {
        this.resize();
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.resize();
    }

    resize(): void {
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

    ngAfterViewInit(): void {}
}
