import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-canvas',
    template:
        '<canvas #viewChildHook id="canvas" class="my-canvas"><span #line class="lines"></span><span #back class="bg"></span></canvas>',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('viewChildHook', { static: true }) canvas!: ElementRef;
    @ViewChild('line', { static: true }) lines!: ElementRef;
    @ViewChild('back', { static: true }) back!: ElementRef;
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

    fillBackground() {
        this.ctx!.fillStyle = getComputedStyle(
            this.back.nativeElement
        ).getPropertyValue('background-color');
        this.ctx?.fillRect(
            0,
            0,
            this.htmlCanvas!.clientWidth,
            this.htmlCanvas!.clientHeight
        );
        console.log(
            (this.ctx!.fillStyle = getComputedStyle(
                this.back.nativeElement
            ).getPropertyValue('background-color'))
        );
    }

    paintNodes() {}

    drawLines() {
        this.ctx!.strokeStyle = getComputedStyle(
            this.lines.nativeElement
        ).getPropertyValue('background-color');
        console.log(
            (this.ctx!.fillStyle = getComputedStyle(
                this.lines.nativeElement
            ).getPropertyValue('background-color'))
        );

        this.ctx!.lineWidth = 1;
        this.ctx!.beginPath();

        this.ctx!.translate(0.5, 0.5);
        for (let x = 0; x < 10; x++) {
            this.ctx!.moveTo(10 * x, 0);
            this.ctx!.lineTo(10 * x, this.htmlCanvas!.clientHeight);
        }

        for (let y = 0; y < 10; y++) {
            this.ctx!.moveTo(0, 10 * y);
            this.ctx!.lineTo(this.htmlCanvas!.clientWidth, 10 * y);
        }

        this.ctx!.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx!.stroke();
        this.ctx!.closePath();
    }
}
