import CanvasComponent = Canvity.Component.CanvasComponent;

namespace Canvity {
    export class CanvasObject extends CanvityObject {
        private parentObj: CanvasObject;
        public get ParentObj(): CanvasObject { return this.parentObj; }
        private scene: CanvasScene;
        public get Scene(): CanvasScene { return (this.parentObj === null) ? this.scene : this.parentObj.scene; }

        private transform: Component.Transform;
        public get Transform(): Component.Transform { return this.transform; }

        private components: Util.HashSet<CanvasComponent>;

        public constructor(name: string, ...components: Array<CanvasComponent>) {
            super();
            this.name = name;

            this.components = new Util.HashSet<CanvasComponent>();

            this.AddComponentOfType(Component.Transform);
            components.forEach(element => {
                this.AddComponent(element);
            });
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            this.components.forEach(element => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.components.forEach(element => {
                element.Update(time);
            });
        }

        public AddComponent(component: CanvasComponent): CanvasComponent {
            let ctor: any = component.constructor;
            if (component.Unique && this.HasComponent(ctor)) {
                throw new Error("Attempted to add unique component " + ctor.name + " to object that already contains an instance!");
            }
            if (component.Requires.length > 0) {
                component.Requires.forEach(element => {
                    let subCtor: any = element
                    if (!this.HasComponent(element)) {
                        throw new Error("Attempted to add component " + ctor.name + " to an object that does not contain an instance of " + subCtor.name);
                    }
                }, this);
            }
            this.components.Add(component);
            component.CanvasObject = this;
            if (component instanceof Component.Transform) {
                if (component instanceof Component.RectTransform) {
                    if (this.transform === undefined || this.transform === null) this.transform = component;
                    else {
                        // TODO: Remove old transform
                        this.transform = component;
                    }
                }
                else if (this.transform === undefined || this.transform === null) this.transform = component;
            }
            return component;
        }
        public AddComponentOfType<T extends CanvasComponent>(type: { new(): T ;} ): T {
            let component = new type();
            component.CanvasObject = this;
            if (component instanceof Component.Transform) {
                if (component instanceof Component.RectTransform) {
                    if (this.transform === undefined || this.transform === null) this.transform = component;
                    else {
                        // TODO: Remove old transform
                        this.transform = component;
                    }
                }
                else if (this.transform === undefined || this.transform === null) this.transform = component;
            }
            return <T>this.AddComponent(component);
        }

        public GetComponent<T extends CanvasComponent>(type: { new(...args: any[]): T ;}): T | null {
            let items = this.components.filter(element => { return element instanceof type; }).ToArray();
            if (items.length === 0) return null;
            return <T>items[0];
        }

        public HasComponent<T extends CanvasComponent>(type: { new(...args: any[]): T ;}): boolean {
            return this.GetComponent(type) !== null;
        }
    }
}