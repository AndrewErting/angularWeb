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

    resize(): void {
        var sideBarHeight: any;
        var heightString: string;

        if (!document.getElementById('side-bar')) {
            heightString = '400px';
        } else {
            sideBarHeight = document.getElementById('side-bar')?.clientHeight;
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

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.resize();
    }
    ngAfterViewInit(): void {}
}
