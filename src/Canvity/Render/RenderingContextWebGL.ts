namespace Canvity.Render {
    export class RenderingContextWebGL implements IRenderingContext {
        private canvas: HTMLCanvasElement;
        private gl: WebGLRenderingContext;

        public get contextWidth(): number { return this.canvas.width; }
        public get contextHeight(): number { return this.canvas.height; }

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            var gl = canvas.getContext('webgl2');
            if (gl instanceof WebGLRenderingContext) this.gl = gl;
            else throw new Error("Could not get WebGL2 context");
        }

        public draw(time: Util.Time): void {
            // TODO: Draw composited 2D Texture
        }

        public drawRect(rect: Util.Rect, color: Util.Color): void {
            throw new Error("Method not implemented.");
        }
        public drawRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color): void {
            throw new Error("Method not implemented.");
        }

        public drawPoly(vertices: Util.Vector2[], color: Util.Color): void {
            throw new Error("Method not implemented.");
        }

        public strokeRect(rect: Util.Rect, color: Util.Color, lineWidth: number): void {
            throw new Error("Method not implemented.");
        }
        public strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color, lineWidth: number): void {
            throw new Error("Method not implemented.");
        }

        public drawSprite(sprite: Assets.Sprite, x: number, y: number): void {
            throw new Error("Method not implemented.");
        }
        public drawTintedSprite(sprite: Assets.Sprite, x: number, y: number, color: Util.Color): void {
            throw new Error("Method not implemented.");
        }

        public drawText(text: string, x: number, y: number, color: Util.Color): void {
            throw new Error("Method not implemented.");
        }
        public drawTextWithFont(text: string, x: number, y: number, font: string, color: Util.Color): void {
            throw new Error("Method not implemented.");
        }

        public drawLine(start: Util.Vector2, end: Util.Vector2, color: Util.Color, lineWidth: number): void {
            throw new Error("Method not implemented.");
        }
        public drawLineFromCoords(startX: number, startY: number, endX: number, endY: number, color: Util.Color, lineWidth: number): void {
            throw new Error("Method not implemented.");
        }
    }
}