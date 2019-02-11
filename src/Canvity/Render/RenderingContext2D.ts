namespace Canvity.Render {
    export class RenderingContext2D implements IRenderingContext {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        public get contextWidth(): number { return this.canvas.width; }
        public get contextHeight(): number { return this.canvas.height; }

        private buffer: any;

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            var ctx = canvas.getContext('2d');
            if (ctx !== null) this.ctx = ctx;
            else throw new Error("Could not get 2d rendering context");
        }

        public drawRect(rect: Util.Rect, color: Util.Color): void {
            this.drawRectFromCoords(rect.X, rect.Y, rect.W, rect.H, color);
        }
        public drawRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color): void {
            var oldColor = this.ctx.fillStyle;
            this.ctx.fillStyle = color.CssString;
            this.ctx.fillRect(x, y, w, h);
            this.ctx.fillStyle = oldColor;
        }

        public strokeRect(rect: Util.Rect, color: Util.Color, lineWidth: number): void {
            this.strokeRectFromCoords(rect.X, rect.Y, rect.W, rect.H, color, lineWidth);
        }
        public strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color, lineWidth: number): void {
            var oldColor = this.ctx.strokeStyle;
            var oldLineWidth = this.ctx.lineWidth;

            this.ctx.strokeStyle = color.CssString;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeRect(x, y, w, h);

            this.ctx.strokeStyle = oldColor;
            this.ctx.lineWidth = oldLineWidth;
        }

        public drawSprite(sprite: Assets.Sprite, x: number, y: number): void {
            this.ctx.drawImage(sprite.Image, x, y);
        }
        public drawTintedSprite(sprite: Assets.Sprite, x: number, y: number, color: Util.Color): void {
            var buffer = this.createBufferCanvas(sprite.Image.width, sprite.Image.height);
            buffer.ctx.fillStyle = color.CssString;
            buffer.ctx.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);

            buffer.ctx.globalCompositeOperation = "destination-atop";
            buffer.ctx.drawImage(sprite.Image, 0, 0);

            this.ctx.drawImage(sprite.Image, x, y);
            this.ctx.globalAlpha = 0.5;
            this.ctx.drawImage(buffer.canvas, x, y);
            this.ctx.globalAlpha = 1;
        }

        public drawText(text: string, x: number, y: number, color: Util.Color): void {
            this.drawTextWithFont(text, x, y, "14px sans-serif", color);
        }
        public drawTextWithFont(text: string, x: number, y: number, font: string, color: Util.Color): void {
            var oldFont = this.ctx.font;
            var oldColor = this.ctx.fillStyle;

            this.ctx.font = font;
            this.ctx.fillStyle = color.CssString;
            this.ctx.fillText(text, x, y);

            this.ctx.font = oldFont;
            this.ctx.fillStyle = oldColor;
        }

        private createBufferCanvas(width: number, height: number): any {
            if (this.buffer == null) {
                var buffer = document.createElement('canvas');
                buffer.width = width;
                buffer.height = height;
                var bx = buffer.getContext('2d');

                this.buffer = { canvas: buffer, ctx: bx };
            } else {
                this.buffer.canvas.width = width;
                this.buffer.canvas.height = height;
            }

            return this.buffer;
        }
    }
}