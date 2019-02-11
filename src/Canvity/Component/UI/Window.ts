namespace Canvity.Component.UI {
    // TODO: Refactor into smaller, more generic components
    @Canvity.Component.Requires(RectTransform, Physics.RectCollider)
    export class Window extends Graphics.RectRenderer {
        public constructor(color: Util.Color) {
            super(color);
        }

        public Draw(deltaTime: Util.Time, ctx: Render.IRenderingContext): void {
            // TODO: Add configurable border width
            ctx.strokeRect(this.Rect, this.Color, 2);
        }
    }
}