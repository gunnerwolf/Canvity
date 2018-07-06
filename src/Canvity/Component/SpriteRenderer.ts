namespace Canvity.Component {
    export class SpriteRenderer extends CanvasComponent {
        private sprite: Assets.Sprite;

        public get ComponentName(): string { return 'SpriteRenderer'; }

        public constructor(sprite: Assets.Sprite) {
            super();

            this.sprite = sprite;
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            let pos: Util.Vector2 = new Util.Vector2();
            if (this.Transform !== null) {
                pos = this.Transform.Position;
            }

            ctx.drawSprite(this.sprite, pos.X, pos.Y);
        }
    }
}