namespace Canvity.Util {
    export class Vector2 {
        public X: number;
        public Y: number;

        public constructor(x: number = 0, y: number = 0) {
            this.X = x;
            this.Y = y;
        }

        public Add(vec: Vector2): Vector2 {
            this.X += vec.X;
            this.Y += vec.Y;
            return this;
        }

        public GetMagnitude(): number {
            return Math.sqrt(this.X ** 2 + this.Y ** 2);
        }
        public GetDistance(): number {
            return this.GetMagnitude();
        }
        public GetDirection(): number {
            return Math.atan(this.X / this.Y) * (180 / Math.PI);
        }

        public Normalized(): Vector2 {
            let factor = Math.max(this.X, this.Y);
            this.X /= factor;
            this.Y /= factor;
            return this;
        }
        public Normalize(): Vector2 {
            let vec = new Vector2(this.X, this.Y);
            return vec.Normalized();
        }
    }
}