namespace Canvity.Component {
    export class RectRenderer extends CanvasComponent {
        private color: Util.Color;

        public get Color(): Util.Color { return this.color; }
        public set Color(val: Util.Color) { this.color = val; }

        private rect: Util.Rect;
        public get Rect(): Util.Rect {
            if (!this.rect) {
                return (<RectTransform>this.Transform).Rect;
            } else {
                let pos: Util.Vector2 = new Util.Vector2();
                if (this.Transform !== null) {
                    pos = this.Transform.Position;
                }
                return new Util.Rect(pos.X + this.rect.X, pos.Y + this.rect.Y, this.rect.W, this.rect.H);
            }
        }
        public set Rect(val: Util.Rect) { this.rect = val; }

        public constructor(color: Util.Color) {
            super();

            this.Color = color;
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.fillStyle = this.Color.CssString;

            ctx.fillRect(this.Rect.X, this.Rect.Y, this.Rect.W, this.Rect.H);
        }
    }
}