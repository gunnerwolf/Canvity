namespace Canvity.Component.Physics {
    export abstract class BaseCollider extends CanvasComponent {
        private isTrigger: boolean;
        public get IsTrigger(): boolean { return this.isTrigger; }
        public set IsTrigger(val: boolean) { this.isTrigger = val; }

        private onCollision: Canvity.Events.CanvityEvent;
        public get OnCollision(): Canvity.Events.CanvityEvent { return this.onCollision; }
        private onCollisionEnter: Canvity.Events.CanvityEvent;
        public get OnCollisionEnter(): Canvity.Events.CanvityEvent { return this.onCollisionEnter; }
        private onCollisionExit: Canvity.Events.CanvityEvent;
        public get OnCollisionExit(): Canvity.Events.CanvityEvent { return this.onCollisionExit; }

        private onMouseEnter: Canvity.Events.CanvityEvent;
        public get OnMouseEnter(): Canvity.Events.CanvityEvent { return this.onMouseEnter; }
        private onMouseExit: Canvity.Events.CanvityEvent;
        public get OnMouseExit(): Canvity.Events.CanvityEvent { return this.onMouseExit; }

        private onMouseClick: Canvity.Events.CanvityEvent;
        public get OnMouseClick(): Canvity.Events.CanvityEvent { return this.onMouseClick; }
        private onMouseDown: Canvity.Events.CanvityEvent;
        public get OnMouseDown(): Canvity.Events.CanvityEvent { return this.onMouseDown; }
        private onMouseUp: Canvity.Events.CanvityEvent;
        public get OnMouseUp(): Canvity.Events.CanvityEvent { return this.onMouseUp; }

        protected constructor() {
            super();

            this.onCollision = new Canvity.Events.CanvityEvent();
            this.onCollisionEnter = new Canvity.Events.CanvityEvent();
            this.onCollisionExit = new Canvity.Events.CanvityEvent();

            this.onMouseEnter = new Canvity.Events.CanvityEvent();
            this.onMouseExit = new Canvity.Events.CanvityEvent();

            this.onMouseClick = new Canvity.Events.CanvityEvent();
            this.onMouseDown = new Canvity.Events.CanvityEvent();
            this.onMouseUp = new Canvity.Events.CanvityEvent();
        }

        public HandleCollision(other: BaseCollider, collisionPoint: Util.Vector2): void { }
        public HandleCollisionEnter(other: BaseCollider, collisionPoint: Util.Vector2): void { }
        public HandleCollisionExit(other: BaseCollider, collisionPoint: Util.Vector2): void { }

        public HandleMouseEnter(collisionPoint: Util.Vector2): void { }
        public HandleMouseExit(collisionPoint: Util.Vector2): void { }

        public HandleMouseClick(collisionPoint: Util.Vector2, mouseButton: number): void { }
        public HandleMouseDown(collisionPoint: Util.Vector2, mouseButton: number): void { }
        public HandleMouseUp(collisionPoint: Util.Vector2): void { }

        public abstract CheckIsCollision(point: Util.Vector2): boolean;
    }
}