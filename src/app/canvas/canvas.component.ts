import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas id="canvas" class="my-canvas"></canvas>',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas!: ElementRef;
  private htmlCanvas!: HTMLElement | null;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.htmlCanvas = document.getElementById('canvas');
    if(canvasEl && this.htmlCanvas) {
      this.ctx = canvasEl.getContext('2d');
      
      this.ctx!.fillStyle = "blue";
      this.ctx!.fillRect(10, 10, 100, 100);

      this.fillBackground();
    }
    else {
      console.log("Returned Early");
      return;
    }
  }

  paintArray() {
    this.fillBackground();
  }

  fillBackground() {
    this.ctx!.fillRect(10, 10, 100, 100);
  }

  paintNodes() {

  }

  drawLines() {

  }
}
