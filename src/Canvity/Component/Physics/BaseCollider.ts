namespace Canvity.Component.Physics {
    export abstract class BaseCollider extends CanvasComponent {
        private isTrigger: boolean;
        public get IsTrigger(): boolean { return this.isTrigger; }
        public set IsTrigger(val: boolean) { this.isTrigger = val; }

        public OnCollision(other: BaseCollider, collisionPoint: Util.Vector2): void { }
        public OnCollisionEnter(other: BaseCollider, collisionPoint: Util.Vector2): void { }
        public OnCollisionExit(other: BaseCollider, collisionPoint: Util.Vector2): void { }

        public OnMouseEnter(collisionPoint: Util.Vector2): void { }
        public OnMouseExit(collisionPoint: Util.Vector2): void { }

        public OnMouseClick(collisionPoint: Util.Vector2, mouseButton: number): void { }
        public OnMouseDown(collisionPoint: Util.Vector2, mouseButton: number): void { }
        public OnMouseUp(collisionPoint: Util.Vector2): void { }

        public abstract CheckIsCollision(point: Util.Vector2): boolean;
    }
}