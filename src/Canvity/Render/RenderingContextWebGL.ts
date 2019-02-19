import { IRenderingContext } from "./IRenderingContext";
import { Time } from "../Util/Time";
import { Rect } from "../Util/Rect";
import { Color } from "../Util/Color";
import { Vector2 } from "../Util/Vector2";
import { Sprite } from "../Assets/Sprite";

export class RenderingContextWebGL implements IRenderingContext {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    public get contextWidth(): number { return this.canvas.width; }
    public get contextHeight(): number { return this.canvas.height; }

    public get context(): any { return this.gl; }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        var gl = canvas.getContext('webgl2');
        if (gl instanceof WebGLRenderingContext) this.gl = gl;
        else throw new Error("Could not get WebGL2 context");
    }

    public draw(time: Time): void {
        // TODO: Draw composited 2D Texture
    }

    public drawRect(rect: Rect, color: Color): void {
        throw new Error("Method not implemented.");
    }
    public drawRectFromCoords(x: number, y: number, w: number, h: number, color: Color): void {
        throw new Error("Method not implemented.");
    }

    public drawPoly(vertices: Array<Vector2>, color: Color): void {
        throw new Error("Method not implemented.");
    }

    public strokeRect(rect: Rect, color: Color, lineWidth: number): void {
        throw new Error("Method not implemented.");
    }
    public strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Color, lineWidth: number): void {
        throw new Error("Method not implemented.");
    }

    public drawSprite(sprite: Sprite, x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    public drawTintedSprite(sprite: Sprite, x: number, y: number, color: Color): void {
        throw new Error("Method not implemented.");
    }

    public drawText(text: string, x: number, y: number, color: Color): void {
        throw new Error("Method not implemented.");
    }
    public drawTextWithFont(text: string, x: number, y: number, font: string, color: Color): void {
        throw new Error("Method not implemented.");
    }

    public drawLine(start: Vector2, end: Vector2, color: Color, lineWidth: number): void {
        throw new Error("Method not implemented.");
    }
    public drawLineFromCoords(startX: number, startY: number, endX: number, endY: number, color: Color, lineWidth: number): void {
        throw new Error("Method not implemented.");
    }
}