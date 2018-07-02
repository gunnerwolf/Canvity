namespace Canvity.Component {
    export class SpriteRenderer extends CanvasComponent {
        private sprite: Assets.Sprite;

        public constructor(sprite: Assets.Sprite) {
            super();

            this.sprite = sprite;
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            let pos: Util.Vector2 = this.Transform.Position;

            ctx.drawSprite(this.sprite, pos.X, pos.Y);
        }
    }
}