namespace Canvity.Component.Physics {
    export class RectCollider extends PolygonCollider {
        protected rect: Util.Rect;
        public get Rect(): Util.Rect { return this.BoundingBox; }
        public set Rect(val: Util.Rect) { this.vertices = val.Vertices; }

        private fetchRect: boolean;

        public constructor(rect: Util.Rect) {
            super();

            if (rect === null || rect === undefined) {
                this.fetchRect = true;
            } else {
                this.Vertices.push(new Util.Vector2(rect.X, rect.Y));
                this.Vertices.push(new Util.Vector2(rect.X + rect.W, rect.Y));
                this.Vertices.push(new Util.Vector2(rect.X + rect.W, rect.Y + rect.H));
                this.Vertices.push(new Util.Vector2(rect.X, rect.Y + rect.H));
            }
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            return this.checkBoundingBox(point);
        }

        protected onParentSet(): void {
            if (this.fetchRect) {
                let transform = this.Transform;
                if (transform !== null && transform instanceof RectTransform) {
                    this.fetchRect = false;
                    this.Rect = (<RectTransform>transform).Rect;
                }
            }
        }
    }
}