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

        private force: Util.Vector2;
        private accel: Util.Vector2;
        private angularForce: number;
        private angularAccel: number;

        public constructor() {
            super();
        }

        public Update(deltaTime: Util.Time): void {
            if (this.Transform === null) return;

            this.ApplyForce(new Util.Vector2(0, this.Gravity));
            this.processForces();

            this.Velocity = this.Velocity.Add(this.accel.Multiply(deltaTime.DeltaTime));
            this.AngularVelocity = this.AngularVelocity + (this.angularAccel * deltaTime.DeltaTime);

            this.Transform.Translate(this.Velocity.Multiply(deltaTime.DeltaTime));
            this.Transform.Rotate(this.AngularVelocity * deltaTime.DeltaTime);
        }

        public ApplyForce(vector: Util.Vector2): void {
            this.force = this.force.Add(vector);
        }
        public ApplyAngularForce(force: number): void {
            this.angularForce += force;
        }

        private processForces(): void {
            // TODO: Factor drag into acceleration formula
            this.accel = this.force.Multiply(1 / this.Mass);
            this.angularAccel = this.angularForce / this.Mass;

            this.force = new Util.Vector2();
            this.angularForce = 0;
        }
    }
}