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
        private onMouseMove: Canvity.Events.CanvityEvent;
        public get OnMouseMove(): Canvity.Events.CanvityEvent { return this.onMouseMove; }

        private onMouseClick: Canvity.Events.CanvityEvent;
        public get OnMouseClick(): Canvity.Events.CanvityEvent { return this.onMouseClick; }
        private onMouseDown: Canvity.Events.CanvityEvent;
        public get OnMouseDown(): Canvity.Events.CanvityEvent { return this.onMouseDown; }
        private onMouseUp: Canvity.Events.CanvityEvent;
        public get OnMouseUp(): Canvity.Events.CanvityEvent { return this.onMouseUp; }

        protected constructor() {
            super();

// TODO: Strip out events and replace with messages
            this.onCollision = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onCollisionEnter = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onCollisionExit = new Canvity.Events.CanvityEvent();

// TODO: Strip out events and replace with messages
            this.onMouseEnter = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onMouseExit = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onMouseMove = new Canvity.Events.CanvityEvent();

// TODO: Strip out events and replace with messages
            this.onMouseClick = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onMouseDown = new Canvity.Events.CanvityEvent();
// TODO: Strip out events and replace with messages
            this.onMouseUp = new Canvity.Events.CanvityEvent();
        }

        public Update(deltaTime: Util.Time): void {
            Messages.MessageBus.GetGlobalMessages('input').forEach(message => { this.handleInputMessage(message); }, this);
        }

// TODO: Strip out events and replace with messages
        public HandleCollision(other: BaseCollider, collisionPoint: Util.Vector2): void { this.onCollision.Invoke(other, collisionPoint); }
// TODO: Strip out events and replace with messages
        public HandleCollisionEnter(other: BaseCollider, collisionPoint: Util.Vector2): void { this.onCollisionEnter.Invoke(other, collisionPoint); }
// TODO: Strip out events and replace with messages
        public HandleCollisionExit(other: BaseCollider, collisionPoint: Util.Vector2): void { this.onCollisionExit.Invoke(other, collisionPoint); }

// TODO: Strip out events and replace with messages
        public HandleMouseEnter(): void { this.onMouseEnter.Invoke(this); }
// TODO: Strip out events and replace with messages
        public HandleMouseExit(): void { this.onMouseExit.Invoke(this); }
// TODO: Strip out events and replace with messages
        public HandleMouseMove(): void { this.onMouseMove.Invoke(this); }

// TODO: Strip out events and replace with messages
        public HandleMouseClick(): void { this.onMouseClick.Invoke(this); }
// TODO: Strip out events and replace with messages
        public HandleMouseDown(): void { this.onMouseDown.Invoke(this); }
// TODO: Strip out events and replace with messages
        public HandleMouseUp(): void { this.onMouseUp.Invoke(this); }

        public abstract CheckIsCollision(point: Util.Vector2): boolean;

        protected handleInputMessage(message: Messages.Message): void {
            if (message.Message.split('.')[0] === 'mouse') {
                if (this.CheckIsCollision(InputManager.MousePos)) {
                    switch(message.Message.split('.')[1]) {
                        case 'move':
                            Messages.MessageBus.PushMessage(new Messages.Message(App.CurrentUpdateTime, 'collider.mouse.move', this.CanvasObject.InstanceID, this));
                            break;
                        case 'down':
                            Messages.MessageBus.PushMessage(new Messages.Message(App.CurrentUpdateTime, 'collider.mouse.down', this.CanvasObject.InstanceID, this, message.Data[0]));
                            break;
                        case 'up':
                            Messages.MessageBus.PushMessage(new Messages.Message(App.CurrentUpdateTime, 'collider.mouse.up', this.CanvasObject.InstanceID, this, message.Data[0]));
                            break;
                    }
                }
            }
        }
    }
}