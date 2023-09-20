import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-canvas',
    template: '<canvas #canvas id="canvas" class="my-canvas"></canvas>',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') public canvas!: ElementRef;
    private htmlCanvas!: HTMLElement | null;
    private ctx!: CanvasRenderingContext2D | null;

    ngAfterViewInit(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.htmlCanvas = document.getElementById('canvas');
        if (canvasEl && this.htmlCanvas) {
            this.ctx = canvasEl.getContext('2d');

            this.ctx!.fillStyle = 'blue';

            this.paintArray();
        } else {
            console.log('Returned Early');
            return;
        }
    }

    paintArray() {
        this.fillBackground();
        this.paintNodes();
        this.drawLines();
    }

    fillBackground() {}

    paintNodes() {}

    drawLines() {
        console.log('Allegedly drawing lines...');
        this.ctx!.beginPath();
        this.ctx!.strokeStyle = 'red';

        this.ctx!.beginPath();
        this.ctx!.moveTo(20, 20);
        this.ctx!.lineTo(20, 100);
        this.ctx!.lineTo(70, 100);
        this.ctx!.strokeStyle = 'red';
        this.ctx!.stroke();
    }
}
