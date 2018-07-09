namespace Canvity.Component.Physics {
    export class RectCollider extends PolygonCollider {
        protected rect: Util.Rect;
        public get Rect(): Util.Rect { return this.BoundingBox; }
        public set Rect(val: Util.Rect) { this.vertices = val.Vertices; }

        public constructor(rect: Util.Rect) {
            super();

            this.Vertices.push(new Util.Vector2(rect.X, rect.Y));
            this.Vertices.push(new Util.Vector2(rect.X + rect.W, rect.Y));
            this.Vertices.push(new Util.Vector2(rect.X + rect.W, rect.Y + rect.H));
            this.Vertices.push(new Util.Vector2(rect.X, rect.Y + rect.H));
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            return this.checkBoundingBox(point);
        }
    }
}