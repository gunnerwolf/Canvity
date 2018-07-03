namespace Canvity.Component {
    export class RectRenderer extends CanvasComponent {
        private color: Util.Color;

        public get Color(): Util.Color { return this.color; }
        public set Color(val: Util.Color) { this.color = val; }

        private rect: Util.Rect;
        public get Rect(): Util.Rect {
            if (!(this.Transform instanceof RectTransform)) {
                let pos = this.Transform.Position;
                return new Util.Rect(pos.X + this.rect.X, pos.Y + this.rect.Y, this.rect.W, this.rect.H);
            } else {
                return (<RectTransform>this.Transform).Rect;
            }
        }
        public set Rect(val: Util.Rect) {
            if (!(this.Transform instanceof RectTransform)) {
                this.rect = val;;
            } else {
                (<RectTransform>this.Transform).Rect = val;
            }
        }

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