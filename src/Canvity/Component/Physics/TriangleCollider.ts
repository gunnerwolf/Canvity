namespace Canvity.Component.Physics {
    export class TriangleCollider extends PolygonCollider {
        public constructor(a: Util.Vector2, b: Util.Vector2, c: Util.Vector2) {
            super(a, b, c);
        }
    }
}