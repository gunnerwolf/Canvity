namespace Canvity.Component.Graphics {
    export class TextRenderer extends CanvasComponent {
        private color: Util.Color;
        public get Color(): Util.Color { return this.color; }
        public set Color(val: Util.Color) { this.color = val; }

        private text: string;
        public get Text(): string { return this.text; }
        public set Text(val: string) { this.text = val; }

        public constructor(text: string, color: Util.Color) {
            super();

            this.text = text;
            this.color = color;
        }

        public Draw(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.fillStyle = this.Color.CssString;
            ctx.fillText(this.Text, this.Position.X, this.Position.Y);
        }
    }
}