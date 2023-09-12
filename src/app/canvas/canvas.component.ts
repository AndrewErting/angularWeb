import { AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  ngAfterViewInit(): void {
      
  }
}
