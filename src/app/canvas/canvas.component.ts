import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-canvas',
    template:
        '<canvas #viewChildHook id="canvas" class="my-canvas"><span #line class="lines"></span><span #back class="bg"></span><span #indicator class="indic"></span></canvas>',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('viewChildHook', { static: true }) canvas!: ElementRef;
    @ViewChild('line', { static: true }) lines!: ElementRef;
    @ViewChild('back', { static: true }) back!: ElementRef;
    @ViewChild('indicator', { static: true }) indicator!: ElementRef;
    private htmlCanvas!: HTMLElement | null;
    private ctx!: CanvasRenderingContext2D | null;
    private mouseEntered: boolean = false;
    private host!: ElementRef;

    private xPosScale: number = 0;
    private yPosScale: number = 0;
    private stepValue: number = 10;

    constructor(elem: ElementRef) {
        this.host = elem;
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.mouseEntered = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.mouseEntered = false;
    }

    @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
        if (this.mouseEntered) {
            var rect = this.htmlCanvas!.getBoundingClientRect();
            var boundX = rect.left;
            var boundY = rect.top;

            this.xPosScale =
                (event.clientX - boundX) /
                this.canvas.nativeElement.clientWidth;
            this.yPosScale =
                (event.clientY - boundY) /
                this.canvas.nativeElement.clientHeight;
            this.paintArray();
        }
    }

    ngAfterViewInit(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.htmlCanvas = document.getElementById('canvas');
        if (canvasEl && this.htmlCanvas) {
            this.ctx = canvasEl.getContext('2d');
            this.ctx?.scale(1, 1);
            this.paintArray();
        } else {
            return;
        }
    }

    paintArray() {
        this.fillBackground();
        this.paintNodes();
        if (this.mouseEntered) {
            this.paintIndicator();
        }
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
    }

    paintNodes() {}

    paintIndicator() {
        if (this.mouseEntered) {
            var xIndex = Math.floor(
                (this.xPosScale * this.ctx!.canvas.width) / this.stepValue
            );
            var yIndex = Math.floor(
                (this.yPosScale * this.ctx!.canvas.height) / this.stepValue
            );

            this.ctx!.fillStyle = getComputedStyle(
                this.indicator.nativeElement
            ).getPropertyValue('background-color');
            this.ctx?.fillRect(
                xIndex * this.stepValue,
                yIndex * this.stepValue,
                this.stepValue,
                this.stepValue
            );
        }
    }

    drawLines() {
        this.ctx!.strokeStyle = getComputedStyle(
            this.lines.nativeElement
        ).getPropertyValue('background-color');
        this.ctx!.lineWidth = 1;
        this.ctx!.beginPath();
        this.ctx!.translate(-0.5, -0.5);

        for (let x = 0; x < 30; x++) {
            this.ctx!.moveTo(this.stepValue * x, 0);
            this.ctx!.lineTo(this.stepValue * x, this.htmlCanvas!.clientHeight);
        }

        for (let y = 0; y < 15; y++) {
            this.ctx!.moveTo(0, this.stepValue * y);
            this.ctx!.lineTo(this.htmlCanvas!.clientWidth, this.stepValue * y);
        }

        this.ctx!.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx!.stroke();
        this.ctx!.closePath();
    }
}
