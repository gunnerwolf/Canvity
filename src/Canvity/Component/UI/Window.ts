namespace Canvity.Component.UI {
    @Canvity.Component.Requires(RectTransform, Physics.RectCollider)
    export class Window extends RectRenderer {
        public get ComponentName(): string { return 'Window'; }

        public constructor(color: Util.Color) {
            super(color);
        }

        public Draw(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.strokeStyle = this.Color.CssString;
            // TODO: Add configurable border width
            ctx.lineWidth = 2;

            ctx.strokeRect(this.Rect.X, this.Rect.Y, this.Rect.W, this.Rect.H);
        }
    }
}