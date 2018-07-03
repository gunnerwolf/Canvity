namespace Canvity.Util {
    export class Rect {
        public X: number;
        public Y: number;
        public W: number;
        public H: number;

        public constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
            this.X = x;
            this.Y = y;
            this.W = w;
            this.H = h;
        }
    }
}