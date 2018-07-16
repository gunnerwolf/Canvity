namespace Canvity.Component {
    export abstract class CanvasComponent extends CanvityObject {
        protected handledGlobalMessageTypes: Array<string> = new Array<string>();

        private requires: Array<{ new (...args: any[]): CanvasComponent; }> = new Array<{ new (...args: any[]): CanvasComponent; }>();
        public get Requires(): Array<{ new (...args: any[]): CanvasComponent; }> { return this.requires; }

        private unique: boolean = false;
        public get Unique(): boolean { return this.unique; }

        protected canvasObject: CanvasObject;
        public get CanvasObject(): CanvasObject { return this.canvasObject; }
        public set CanvasObject(obj: CanvasObject) {
            if (!this.canvasObject) {
                this.canvasObject = obj;
                this.onParentSet();
            }
        }

        public get Transform(): Transform { return this.CanvasObject.Transform; }
        public get HasRectTransform(): boolean { return this.CanvasObject.HasComponent(RectTransform); }
        public get RectTransform(): RectTransform { return <RectTransform>this.Transform; }

        public get LocalPosition(): Util.Vector2 { return this.Transform.LocalPosition; }
        public get Position(): Util.Vector2 { return this.Transform.Position; }
        
        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void { }
        public Update(time: Util.Time): void {
            Messaging.MessageBus.GetMessages(this.InstanceID).forEach(message => { this.handleMessage(message); }, this);
            Messaging.MessageBus.GetMessages(this.CanvasObject.InstanceID).forEach(message => { this.handleObjectMessage(message); }, this);
        }

        public GetRequiredComponents(obj: CanvasObject): Array<CanvasComponent> {
            let required = new Array<CanvasComponent>();
            this.requires.forEach(component => required.push(new component()))
            return required;
        }

        public Start(): void {
            this.started = true;
        }

        protected onParentSet(): void { }
        protected handleMessage(message: Messaging.Message): void {
            console.warn("Object", this.InstanceID, "was sent a message, but has not implemented handleMessage!\n", message);
        }
        protected handleObjectMessage(message: Messaging.Message): void { }
        protected handleGlobalMessage(message: Messaging.Message): void { }
    }
}
