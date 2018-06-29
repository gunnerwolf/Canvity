namespace Canvity.Component {
    export class Transform extends CanvasComponent {
        private localPosition: Util.Vector2;

        public constructor() {
            super();

            this.localPosition = new Util.Vector2();
        }

        public GetLocalPosition(): Util.Vector2 {
            return this.localPosition;
        }
        public SetLocalPosition(val: Util.Vector2): void {
            this.localPosition = val;
        }
        public GetPosition() {
            
        }
    }
}