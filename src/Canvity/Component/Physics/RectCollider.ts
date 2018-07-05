namespace Canvity.Component.Physics {
    export class RectCollider extends PolygonCollider {
        protected rect: Util.Rect;
        public get Rect(): Util.Rect { return this.BoundingBox; }
        public set Rect(val: Util.Rect) { this.vertices = val.Vertices; }

        protected get Vertices(): Array<Util.Vector2> { return this.Rect.Vertices; }

        public constructor() {
            super();
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            return this.checkBoundingBox(point);
        }
    }
}