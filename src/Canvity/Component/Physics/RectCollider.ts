namespace Canvity.Component.Physics {
    export class RectCollider extends BaseCollider {
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

        public CheckIsCollision(point: Util.Vector2): boolean {
            return this.rect.ContainsPoint(point);
        }
    }
}