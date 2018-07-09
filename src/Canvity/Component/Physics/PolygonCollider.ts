namespace Canvity.Component.Physics {
    export class PolygonCollider extends BaseCollider {
        protected vertices: Array<Util.Vector2>;
        public get Vertices(): Array<Util.Vector2> { return this.vertices; }
        public set Vertices(verts: Array<Util.Vector2>) { this.vertices = verts; }

        protected get BoundingBox(): Util.Rect {
            let minX = this.Vertices.map(x => x.X).reduce((a, b) => Math.min(a, b));
            let maxX = this.Vertices.map(x => x.X).reduce((a, b) => Math.max(a, b));
            let minY = this.Vertices.map(x => x.Y).reduce((a, b) => Math.min(a, b));
            let maxY = this.Vertices.map(x => x.Y).reduce((a, b) => Math.max(a, b));

            return new Util.Rect(minX, minY, maxX - minX, maxY - minY);
        }

        public constructor(...vertices: Array<Util.Vector2>) {
            super();

            this.vertices = vertices;
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            let rectTest: boolean = this.checkBoundingBox(point);
            if (!rectTest) return rectTest;

            let lineIntersections: number = 0;
            // Raycast to the point from <0, 0>, count number of side collisions with raycast
            let raycastOrigin: Util.Vector2 = new Util.Vector2();
            for(let i: number = 0; i < this.Vertices.length; i++) {
                let a = this.Vertices[i];
                let b = (i + 1 >= this.Vertices.length) ? this.Vertices[(i + 1) % this.Vertices.length] : this.Vertices[i + 1];

                if (this.lineIsIntersecting(a, b, raycastOrigin, point)) {
                    lineIntersections++;
                }
            }

            // If there are an odd number of collisions, point is inside the polygon
            return lineIntersections % 2 === 1;
        }

        protected checkBoundingBox(point: Util.Vector2): boolean {
            return this.BoundingBox.ContainsPoint(point);
        }

        protected lineIsIntersecting(a: Util.Vector2, b: Util.Vector2, c: Util.Vector2, d: Util.Vector2): boolean {
            let denominator: number = ((b.X - a.X) * (d.Y - c.Y)) - ((b.Y - a.Y) * (d.X - c.X));
            let numerator1: number = ((a.Y - c.Y) * (d.X - c.X)) - ((a.X - c.X) * (d.Y - c.Y));
            let numerator2: number = ((a.Y - c.Y) * (b.X - a.X)) - ((a.X - c.X) * (b.Y - a.Y));

            if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

            let r: number = numerator1 / denominator;
            let s: number = numerator2 / denominator;

            return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
        }
    }
}