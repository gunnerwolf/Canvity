import { SpriteAsset } from "../Asset/SpriteAsset";
import { Color } from "../Util/Color";
import { Rect } from "../Util/Rect";
import { Time } from "../Util/Time";
import { Vector2 } from "../Util/Vector2";
import { IRenderingContext } from "./IRenderingContext";

export class RenderingContext2D implements IRenderingContext {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public get contextWidth(): number { return this.canvas.width; }
    public get contextHeight(): number { return this.canvas.height; }

    public get context(): any { return this.ctx; }

    private buffer: any;
    private storedWorkspaceOpts: any;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        let ctx = canvas.getContext("2d");
        if (ctx !== null) this.ctx = ctx;
        else throw new Error("Could not get 2d rendering context");
    }

    public draw(time: Time): void { }

    public drawRect(rect: Rect, color: Color): void {
        this.drawRectFromCoords(rect.X, rect.Y, rect.W, rect.H, color);
    }
    public drawRectFromCoords(x: number, y: number, w: number, h: number, color: Color): void {
        this.startCanvasWorkspace({ fillStyle: color.CssString });
        this.ctx.fillRect(x, y, w, h);
        this.endCanvasWorkspace();
    }

    public drawPoly(vertices: Array<Vector2>, color: Color): void {
        this.startCanvasWorkspace({ fillStyle: color.CssString });

        this.ctx.beginPath();

        this.moveTo(vertices[0]);

        for (let i = 1; i < vertices.length; i++) {
            this.lineTo(vertices[i]);
        }

        this.ctx.fill();

        this.endCanvasWorkspace();
    }

    public strokeRect(rect: Rect, color: Color, lineWidth: number): void {
        this.strokeRectFromCoords(rect.X, rect.Y, rect.W, rect.H, color, lineWidth);
    }
    public strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Color, lineWidth: number): void {
        this.startCanvasWorkspace({ strokeStyle: color.CssString, lineWidth });
        this.ctx.strokeRect(x, y, w, h);
        this.endCanvasWorkspace();
    }

    public drawSprite(sprite: SpriteAsset, x: number, y: number): void {
        this.ctx.drawImage(sprite.Image, x, y);
    }
    public drawTintedSprite(sprite: SpriteAsset, x: number, y: number, color: Color): void {
        let buffer = this.createBufferCanvas(sprite.Image.width, sprite.Image.height);
        buffer.ctx.fillStyle = color.CssString;
        buffer.ctx.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);

        buffer.ctx.globalCompositeOperation = "destination-atop";
        buffer.ctx.drawImage(sprite.Image, 0, 0);

        this.ctx.drawImage(sprite.Image, x, y);
        this.startCanvasWorkspace({ globalAlpha: 0.5 });
        this.ctx.drawImage(buffer.canvas, x, y);
        this.endCanvasWorkspace();
    }

    public drawText(text: string, x: number, y: number, color: Color): void {
        this.drawTextWithFont(text, x, y, "14px sans-serif", color);
    }
    public drawTextWithFont(text: string, x: number, y: number, font: string, color: Color): void {
        if (text.indexOf("\n") >= 0) {
            this.drawLinesWithFont(text, x, y, font, color);
            return;
        }
        this.startCanvasWorkspace({ font, fillStyle: color.CssString });
        this.ctx.fillText(text, x, y);
        this.endCanvasWorkspace();
    }
    public drawLinesWithFont(text: string, x: number, y: number, font: string, color: Color): void {
        let fontSizeRegexMatch: RegExpExecArray | null = /^(\d+)(px|pt|em) .*$/.exec(font);
        if (fontSizeRegexMatch === null) {
            console.warn("Could not determine font size in " + font);
            return;
        }
        let fontSize: number = parseInt(fontSizeRegexMatch[1]);

        let lines = text.split("\n");
        let totalY = 0;
        for (let line of lines) {
            this.drawTextWithFont(line, x, y + totalY, font, color);
            totalY += fontSize;
        }
    }

    public drawLine(start: Vector2, end: Vector2, color: Color, lineWidth: number): void {
        this.drawLineFromCoords(start.X, start.Y, end.X, end.Y, color, lineWidth);
    }
    public drawLineFromCoords(startX: number, startY: number, endX: number, endY: number, color: Color, lineWidth: number): void {
        this.startCanvasWorkspace({ strokeStyle: color.CssString, lineWidth});

        this.ctx.beginPath();

        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);

        this.ctx.stroke();

        this.endCanvasWorkspace();
    }

    private createBufferCanvas(width: number, height: number): any {
        if (this.buffer == null) {
            let buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;
            let bx = buffer.getContext("2d");

            this.buffer = { canvas: buffer, ctx: bx };
        } else {
            this.buffer.canvas.width = width;
            this.buffer.canvas.height = height;
        }

        return this.buffer;
    }

    private startCanvasWorkspace(opts: any): void {
        let oldOpts: any = {};
        for (let key in opts) {
            if ((this.ctx as any)[key] !== undefined) {
                oldOpts[key] = (this.ctx as any)[key];
            }
        }

        this.applyCanvasOpts(opts);
        this.storedWorkspaceOpts = oldOpts;
    }
    private endCanvasWorkspace(): void {
        this.applyCanvasOpts(this.storedWorkspaceOpts);
    }

    private applyCanvasOpts(opts: any): void {
        for (let key in opts) {
            if ((this.ctx as any)[key] !== undefined) {
                (this.ctx as any)[key] = opts[key];
            }
        }
    }

    private moveTo(pos: Vector2): void {
        this.ctx.moveTo(pos.X, pos.Y);
    }
    private lineTo(pos: Vector2): void {
        this.ctx.lineTo(pos.X, pos.Y);
    }
}
