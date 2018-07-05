namespace Canvity.Util {
    export class Rect {
        public X: number;
        public Y: number;
        public W: number;
        public H: number;

        public get Vertices(): Array<Vector2> {
            return new Array<Vector2>(
                new Vector2(this.X, this.Y),
                new Vector2(this.X, this.Y + this.H),
                new Vector2(this.X + this.W, this.Y),
                new Vector2(this.X + this.W, this.Y + this.H)
            );
        }

        public constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
            this.X = x;
            this.Y = y;
            this.W = w;
            this.H = h;
        }

        public ContainsPoint(point: Vector2): boolean {
            return (point.X > this.X && point.X <= this.X + this.W
                && point.Y > this.Y && point.Y <= this.Y + this.H);
        }
    }
}