namespace Canvity.Component {
    export class Transform extends CanvasComponent {
        private localRotation: number;
        public get LocalRotation(): number { return this.localRotation; }
        public set LocalRotation(val: number) { this.localRotation = Canvity.Util.MathUtil.Clamp(val, 0, 359); }

        public get Rotation(): number {
            if (this.canvasObject.ParentObj) {
                return Canvity.Util.MathUtil.Clamp(this.canvasObject.ParentObj.Transform.Rotation + this.LocalRotation, 0, 359);
            } else {
                return this.LocalRotation;
            }
        }
        public set Rotation(val: number) {
            this.LocalRotation = val;
            if (this.canvasObject.ParentObj) this.LocalRotation -= this.canvasObject.ParentObj.Transform.Rotation;
        }

        private localPosition: Util.Vector2;
        public get LocalPosition(): Util.Vector2 { return this.localPosition; }
        public set LocalPosition(val: Util.Vector2) { this.localPosition = val; }

        public get Position(): Util.Vector2 {
            if (this.canvasObject.ParentObj) {
                return this.canvasObject.ParentObj.Transform.Position.Add(this.LocalPosition);
            } else {
                return this.LocalPosition;
            }
        }
        public set Position(val: Util.Vector2) {
            this.LocalPosition = val;
            if (this.canvasObject.ParentObj) this.LocalPosition.Sub(this.canvasObject.ParentObj.Transform.Position);
        }

        private localZIndex: number;
        public get LocalZIndex(): number { return this.localZIndex; }
        public set LocalZIndex(val: number) { this.localZIndex = val; }

        public get ZIndex(): number {
            if (this.canvasObject.ParentObj) {
                return Canvity.Util.MathUtil.Clamp(this.canvasObject.ParentObj.Transform.ZIndex + this.LocalZIndex, 0, 359);
            } else {
                return this.LocalZIndex;
            }
        }
        public set ZIndex(val: number) {
            this.LocalZIndex = val;
            if (this.canvasObject.ParentObj) this.LocalZIndex -= this.canvasObject.ParentObj.Transform.ZIndex;
        }

        public constructor() {
            super();

            this.LocalPosition = new Util.Vector2();
        }

        public Rotate(amt: number): Transform {
            this.LocalRotation += amt;
            return this;
        }
        public Translate(vec: Util.Vector2): Transform {
            this.LocalPosition.Add(vec);
            return this;
        }
    }
}