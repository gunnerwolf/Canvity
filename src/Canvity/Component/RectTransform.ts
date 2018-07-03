namespace Canvity.Component {
    export class RectTransform extends Transform {
        private size: Util.Vector2;
        public get Size(): Util.Vector2 { return this.size; }
        public set Size(val: Util.Vector2) { this.size = val; }

        public get Rect(): Util.Rect { return new Util.Rect(this.LocalPosition.X, this.LocalPosition.Y, this.Size.X, this.Size.Y); }
        public set Rect(val: Util.Rect) {
            this.LocalPosition = new Util.Vector2(val.X, val.Y);
            this.Size = new Util.Vector2(val.W, val.H);
        }

        public constructor() {
            super();

            this.Size = new Util.Vector2();
        }
    }
}