namespace Canvity.Component.UI {
    @Canvity.Component.Requires(UI.Window)
    export class ResizeTab extends CanvasComponent {
        private color: Util.Color;
        public get Color(): Util.Color { return this.color; }
        public set Color(val: Util.Color) { this.color = val; }

        public get ComponentName(): string { return 'ResizeTab'; }

        public constructor(color: Util.Color = new Util.Color(255, 255, 255, 100)) {
            super();

            this.Color = color;
        }

        public Draw(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.strokeStyle = this.Color.CssString;

            let rect: Util.Rect = (<RectTransform>this.Transform).Rect;

            ctx.beginPath();
            ctx.moveTo(rect.X + rect.W - 4, rect.Y + rect.H - 2);
            ctx.lineTo(rect.X + rect.W - 2, rect.Y + rect.H - 4);

            ctx.moveTo(rect.X + rect.W - 6, rect.Y + rect.H - 2);
            ctx.lineTo(rect.X + rect.W - 2, rect.Y + rect.H - 6);

            ctx.moveTo(rect.X + rect.W - 8, rect.Y + rect.H - 2);
            ctx.lineTo(rect.X + rect.W - 2, rect.Y + rect.H - 8);
        }
    }
}