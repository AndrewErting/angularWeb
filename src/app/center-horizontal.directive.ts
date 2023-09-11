import {     
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostListener,
  Input,
  Output,
  EventEmitter, } from '@angular/core';

@Directive({
  selector: '[appCenterHorizontal]'
})
export class CenterHorizontalDirective {
  @HostListener('window:resize') onresize() {
    this.changeMargin();
}

@Input() bufferedContainer: string;

resize() {
    this.changeMargin();
}

constructor(private element: ElementRef, private renderer: Renderer2) {
    this.bufferedContainer = '';
}

  changeMargin(): void {
      var windowWidth: number;
      var widthString: string;
      var buffer: number;

      const bufferElem = document.getElementById(this.bufferedContainer);
      const elem = this.element.nativeElement;

      if (this.bufferedContainer === '' || !bufferElem) {
        buffer = 0;
      } else {
        buffer = bufferElem.clientHeight;
      }

      if (!elem) {
          return;
      } else {
        windowWidth = window.innerWidth;
        windowWidth =
        windowWidth / 2 -
              elem.offsetWidth / 2 -
              buffer;
              widthString = `${windowWidth}px`;
      }
      this.renderer.setStyle(
          this.element.nativeElement,
          'margin-left',
          widthString
      );

      this.renderer.setStyle(
        this.element.nativeElement,
        'margin-right',
        widthString
    );
  }

  ngAfterViewInit(): void {
      this.changeMargin();
  }
}
