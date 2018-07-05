namespace Canvity.Component.Physics {
    export class RectCollider extends BaseCollider {
        protected rect: Util.Rect;
        public get Rect(): Util.Rect {
            if (!(this.Transform instanceof RectTransform)) {
                let pos: Util.Vector2 = new Util.Vector2();
                if (this.Transform !== null) {
                    pos = this.Transform.Position;
                }
                return new Util.Rect(pos.X + this.rect.X, pos.Y + this.rect.Y, this.rect.W, this.rect.H);
            } else {
                return (<RectTransform>this.Transform).Rect;
            }
        }
        public set Rect(val: Util.Rect) {
            if (!(this.Transform instanceof RectTransform)) {
                this.rect = val;
            } else {
                (<RectTransform>this.Transform).Rect = val;
            }
        }

        public constructor() {
            super();
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            return this.rect.ContainsPoint(point);
        }
    }
}