namespace Canvity.Component.Physics {
    export class RigidBody extends CanvasComponent {
        private collider: BaseCollider;

        private angularDrag: number;
        public get AngularDrag(): number { return this.angularDrag; }
        public set AngularDrag(val: number) { this.angularDrag = val; }
        
        private drag: number;
        public get Drag(): number { return this.drag; }
        public set Drag(val: number) { this.drag = val; }

        private velocity: Util.Vector2;
        public get Velocity(): Util.Vector2 { return this.velocity; }
        public set Velocity(val: Util.Vector2) { this.velocity = val; }

        private angularVelocity: number;
        public get AngularVelocity(): number { return this.angularVelocity; }
        public set AngularVelocity(val: number) { this.angularVelocity = val; }

        private gravity: number;
        public get Gravity(): number { return this.gravity; }
        public set Gravity(val: number) { this.gravity = val; }

        private mass: number;
        public get Mass(): number { return this.mass; }
        public set Mass(val: number) { this.mass = val; }

        public constructor() {
            super();
        }

        public Update(deltaTime: Util.Time) {
            if (this.Transform === null) return;

            this.Transform.Translate(this.Velocity.Multiply(deltaTime.DeltaTime));
            this.Transform.Rotate(this.AngularVelocity * deltaTime.DeltaTime);
        }
    }
}