namespace Canvity.Component.UI {
    // TODO: Refactor into smaller, more generic components
    @Canvity.Component.Requires(Physics.RectCollider)
    export class MoveBar extends CanvasComponent {
        private isDragging: boolean;

        private dragStart: Util.Vector2;

        private collider: Physics.RectCollider;

        public constructor() {
            super();
        }

        public Update(deltaTime: Util.Time): void {
            super.Update(deltaTime);

            Messaging.MessageBus.GetGlobalMessages('input').forEach(message => { this.handleInputMessage(message); }, this);
        }

        protected onParentSet(): void {
            let collider: Physics.RectCollider | null =  this.CanvasObject.GetComponent(Physics.RectCollider);
            if (collider === null) throw Error("Attempted to add component MoveBar to an object that does not contain an instance of RectCollider");
            else this.collider = collider;
        }

        protected onMouseDown() {
            if (InputManager.IsLeftButtonDown) {
                this.isDragging = true;
                this.dragStart = InputManager.MousePos;
            }
        }
        protected onMouseUp() {
            if (!InputManager.IsLeftButtonDown) {
                this.isDragging = false;
            }
        }
        protected onMouseMove() {
            if (this.isDragging) {
                let transform: Transform = this.Transform;
                
                transform.LocalPosition = transform.LocalPosition.Add(InputManager.MousePos.Sub(this.dragStart));
                this.dragStart = InputManager.MousePos;
            }
        }

        protected handleObjectMessage(message: Messaging.Message): void {
            let messageParts: Array<string> = message.Message.split('.');
            if (messageParts[0] === 'collider') {
                if (message.Data[0] !== this.collider) return;
                if (messageParts[1] !== 'mouse') return;
                if (messageParts[2] === 'down') this.onMouseDown();
            }
        }

        protected handleInputMessage(message: Messaging.Message): void {
            let messageParts: Array<string> = message.Message.split('.');
            if (messageParts[0] === 'mouse') {
                if (messageParts[1] === 'move') this.onMouseMove();
                else if (messageParts[1] === 'up') this.onMouseUp();
            }
        }
    }
}