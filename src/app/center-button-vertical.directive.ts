import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCenterButtonVertical]'
})
export class CenterButtonVerticalDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { 
    const sideBarHeight = document.getElementById("side-bar");
  }

}
