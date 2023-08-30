import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFullHeight]'
})
export class AutoFullHeightDirective implements AfterViewInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { 
    const windowHeight = window.innerHeight - 64;
    const calculatedHeight = `${windowHeight}px`;
    this.renderer.setStyle(this.element.nativeElement, 'height', calculatedHeight);
  }

  ngAfterViewInit(): void {  }
}
