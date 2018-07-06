namespace Canvity.Component.Physics {
    export class RadialCollider extends BaseCollider {
        private radius: number;
        public get Radius(): number { return this.radius; }
        public set Radius(val: number) { this.radius = val; }

        public constructor(radius: number) {
            super();

            this.Radius = radius;
        }

        public CheckIsCollision(point: Util.Vector2): boolean {
            let pos: Util.Vector2 = new Util.Vector2();
            if (this.Transform !== null) {
                pos = this.Transform.Position;
            }

            let relativePos: Util.Vector2 = pos.Sub(point);
            
            return relativePos.Distance <= this.Radius;
        }
    }
}