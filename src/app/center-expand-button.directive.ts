import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appCenterExpandButton]'
})
export class CenterExpandButtonDirective implements AfterViewInit {

  private domElement: HTMLElement;

  @HostListener('window:resize') onresize() {
    this.resize();
  }

  resize(): void {
    var canvasHeight: any;
    var heightString: string;

    if (!document.getElementById('myCanvas')) {
        heightString = '400px';
    } else {
      canvasHeight = document.getElementById('myCanvas')?.clientHeight;
      canvasHeight =
      canvasHeight / 2 - 12; //I am well aware that using a magic number is BaD pRaCtIcE
      heightString = `${canvasHeight}px`;
    }        

    this.renderer.setStyle(
        this.element.nativeElement,
        'bottom',
        heightString
    );
  }

  constructor(private element: ElementRef, private renderer: Renderer2) { 
    this.domElement = this.element.nativeElement as HTMLElement;
  }
  ngAfterViewInit(): void {
      this.resize();
  }
}
