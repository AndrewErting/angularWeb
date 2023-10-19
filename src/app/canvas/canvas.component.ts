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
        '<canvas #viewChildHook id="canvas" class="my-canvas" width="600px" height="300px"><span #line class="lines"></span><span #back class="bg"></span><span #indicator class="indic"></span></canvas>',
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
    private stepValue: number = 20;

    private drawing = false;
    private erasing = false;

    private array: number[][] = [];
    private rows: number;
    private cols: number;

    constructor(elem: ElementRef) {
        this.host = elem;
        this.rows = 15;
        this.cols = 30;

        for (let y = 0; y < this.cols; y++) {
            this.array[y] = [];
            for (let x = 0; x < this.rows; x++) {
                this.array[y][x] = 0;
            }
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.mouseEntered = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.mouseEntered = false;
    }

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        if (event.button == 0) {
            this.drawing = true;
        }
        if (event.button == 2) {
            this.erasing = true;
        }
    }

    @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
        if (event.button == 0) {
            this.drawing = false;
        }
        if (event.button == 2) {
            this.erasing = false;
        }
    }

    private xIndex = 0;
    private yIndex = 0;
    @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
        if (this.mouseEntered) {
            var rect = this.htmlCanvas!.getBoundingClientRect();
            var boundX = rect.left;
            var boundY = rect.top;

            //Get the scalar value...
            this.xPosScale =
                (event.clientX - boundX) /
                this.canvas.nativeElement.clientWidth;
            this.yPosScale =
                (event.clientY - boundY) /
                this.canvas.nativeElement.clientHeight;

            //Apply scalar to width and divide for floored value...
            this.xIndex = Math.floor(
                (this.xPosScale * this.ctx!.canvas.width) / this.stepValue
            );
            this.yIndex = Math.floor(
                (this.yPosScale * this.ctx!.canvas.height) / this.stepValue
            );

            if (this.drawing == true) {
                this.array[this.yIndex][this.xIndex] = 1;
            } else if (this.erasing == true) {
                this.array[this.yIndex][this.xIndex] = 0;
            }
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

    paintNodes() {
        for (let y = 0; y < this.cols; y++) {
            for (let x = 0; x < this.rows; x++) {
                if (this.array[y][x] == 1) {
                    this.ctx!.fillStyle = 'blue';
                    this.ctx!.fillRect(
                        x * this.stepValue,
                        y * this.stepValue,
                        this.stepValue,
                        this.stepValue
                    );
                }
            }
        }
    }

    paintIndicator() {
        if (this.mouseEntered) {
            this.ctx!.fillStyle = getComputedStyle(
                this.indicator.nativeElement
            ).getPropertyValue('background-color');
            this.ctx?.fillRect(
                this.xIndex * this.stepValue,
                this.yIndex * this.stepValue,
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

        for (let x = 0; x < this.cols; x++) {
            this.ctx!.moveTo(this.stepValue * x, 0);
            this.ctx!.lineTo(this.stepValue * x, this.htmlCanvas!.clientHeight);
        }

        for (let y = 0; y < this.rows; y++) {
            this.ctx!.moveTo(0, this.stepValue * y);
            this.ctx!.lineTo(this.htmlCanvas!.clientWidth, this.stepValue * y);
        }

        this.ctx!.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx!.stroke();
        this.ctx!.closePath();
    }
}
