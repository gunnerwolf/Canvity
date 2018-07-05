namespace Canvity.Component.Physics {
    export class PolygonCollider extends RectCollider {
        private vertices: Array<Util.Vector2>;

        public constructor(...vertices: Array<Util.Vector2>) {
            super();

            this.vertices = vertices;
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            // TODO: Implement proper polygon collision checks
            return super.CheckIsCollision(point);
        }
    }
}