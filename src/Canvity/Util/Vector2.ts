namespace Canvity.Util {
    export class Vector2 {
        public X: number;
        public Y: number;

        public get Magnitude(): number { return Math.sqrt(this.X ** 2 + this.Y ** 2); }
        public set Magnitude(val: number) { this.Normalize().Multiply(val); }

        public get Distance(): number { return this.Magnitude; }
        public get Direction(): number { return Math.atan(this.X / this.Y) * (180 / Math.PI); }
        public get Normalized(): Vector2 { return new Vector2(this.X, this.Y).Normalize(); }

        public constructor(x: number = 0, y: number = 0) {
            this.X = x;
            this.Y = y;
        }

        public Add(vec: Vector2): Vector2 {
            return new Vector2(this.X + vec.X, this.Y + vec.Y);
        }
        public Sub(vec: Vector2): Vector2 {
            return new Vector2(this.X - vec.X, this.Y - vec.Y);
        }
        public Multiply(mul: number): Vector2 {
            return new Vector2(this.X * mul, this.Y * mul);
        }

        public Normalize(): Vector2 {
            let factor = Math.max(this.X, this.Y);
            this.X /= factor;
            this.Y /= factor;
            return this;
        }
    }
}