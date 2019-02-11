namespace Canvity.Render {
    export class RenderingContext2D implements IRenderingContext {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        public get contextWidth(): number { return this.canvas.width; }
        public get contextHeight(): number { return this.canvas.height; }

        private buffer: any;
        private storedWorkspaceOpts: any;

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
            this.startCanvasWorkspace({ fillStyle: color.CssString });
            this.ctx.fillRect(x, y, w, h);
            this.endCanvasWorkspace();
        }

        public drawPoly(vertices: Array<Util.Vector2>, color: Util.Color): void {
            this.startCanvasWorkspace({ fillStyle: color.CssString });

            this.ctx.beginPath();

            this.moveTo(vertices[0]);

            for(var i = 1; i < vertices.length; i++) {
                this.lineTo(vertices[i]);
            }

            this.ctx.fill();

            this.endCanvasWorkspace();
        }

        public strokeRect(rect: Util.Rect, color: Util.Color, lineWidth: number): void {
            this.strokeRectFromCoords(rect.X, rect.Y, rect.W, rect.H, color, lineWidth);
        }
        public strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color, lineWidth: number): void {
            this.startCanvasWorkspace({ strokeStyle: color.CssString, lineWidth: lineWidth });
            this.ctx.strokeRect(x, y, w, h);
            this.endCanvasWorkspace();
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
            this.startCanvasWorkspace({ globalAlpha: 0.5 });
            this.ctx.drawImage(buffer.canvas, x, y);
            this.endCanvasWorkspace();
        }

        public drawText(text: string, x: number, y: number, color: Util.Color): void {
            this.drawTextWithFont(text, x, y, "14px sans-serif", color);
        }
        public drawTextWithFont(text: string, x: number, y: number, font: string, color: Util.Color): void {
            this.startCanvasWorkspace({ font: font, fillStyle: color.CssString });
            this.ctx.fillText(text, x, y);
            this.endCanvasWorkspace();
        }

        public drawLine(start: Util.Vector2, end: Util.Vector2, color: Util.Color, lineWidth: number): void {
            this.drawLineFromCoords(start.X, start.Y, end.X, end.Y, color, lineWidth);
        }
        public drawLineFromCoords(startX: number, startY: number, endX: number, endY: number, color: Util.Color, lineWidth: number): void {
            this.startCanvasWorkspace({ strokeStyle: color.CssString, lineWidth: lineWidth});

            this.ctx.beginPath();

            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);

            this.ctx.stroke();

            this.endCanvasWorkspace();
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

        private startCanvasWorkspace(opts: any): void {
            var oldOpts: any = {};
            for(var key in opts) {
                if ((<any>this.ctx)[key] != undefined)
                    oldOpts[key] = (<any>this.ctx)[key];
            }

            this.applyCanvasOpts(opts);
            this.storedWorkspaceOpts = oldOpts;
        }
        private endCanvasWorkspace(): void {
            this.applyCanvasOpts(this.storedWorkspaceOpts);
        }

        private applyCanvasOpts(opts: any): void {
            for(var key in opts) {
                if ((<any>this.ctx)[key] != undefined)
                    (<any>this.ctx)[key] = opts[key];
            }
        }

        private moveTo(pos: Util.Vector2): void {
            this.ctx.moveTo(pos.X, pos.Y);
        }
        private lineTo(pos: Util.Vector2): void {
            this.ctx.lineTo(pos.X, pos.Y);
        }
    }
}