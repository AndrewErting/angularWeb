import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCenterButtonVertical]'
})
export class CenterButtonVerticalDirective implements AfterViewInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    var sideBarHeight: any;
    var heightString: string;
    if(!document.getElementById("side-bar")) {
      heightString = '400px'
    }
    else {
      sideBarHeight = document.getElementById("side-bar")?.clientHeight;
      sideBarHeight = (sideBarHeight/2) - 24;
      heightString = `${sideBarHeight}px`;
    };

    this.renderer.setStyle(this.element.nativeElement, 'margin-top', heightString);
  }
  ngAfterViewInit(): void {  }

}
