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
        private children: Util.HashSet<CanvasObject>;

        public constructor(name: string, ...components: Array<CanvasComponent>) {
            super();
            this.name = name;

            this.components = new Util.HashSet<CanvasComponent>();
            this.children = new Util.HashSet<CanvasObject>();

            this.AddComponentOfType(Component.Transform);
            components.forEach(element => {
                this.AddComponent(element);
            });
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            this.components.forEach(element => {
                element.Draw(time, ctx);
            });
            this.children.forEach(element => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.components.forEach(element => {
                element.Update(time);
            });
            this.children.forEach(element => {
                element.Update(time);
            });
        }

        public AddComponent(component: CanvasComponent, addDependencies: boolean = false): CanvasComponent {
            let ctor: any = component.constructor;
            if (component.Unique && this.HasComponent(ctor)) {
                throw new Error("Attempted to add unique component " + ctor.name + " to object that already contains an instance!");
            }
            if (component.Requires.length > 0) {
                if (addDependencies) {
                    let required = component.GetRequiredComponents(this);
                    required.forEach(element => {
                        let ctor: any = element.constructor;
                        if (!element.Unique || !this.HasComponent(ctor)) {
                            this.AddComponent(element);
                        }
                    }, this);
                } else {
                    component.Requires.forEach(element => {
                        let subCtor: any = element;
                        if (!this.HasComponent(element)) {
                                throw new Error("Attempted to add component " + ctor.name + " to an object that does not contain an instance of " + subCtor.name);
                        }
                    }, this);
                }
            }
            if (component instanceof Component.Transform) {
                if (component instanceof Component.RectTransform) {
                    if (this.transform === undefined || this.transform === null) this.transform = component;
                    else {
                        this.RemoveComponentOfType(Component.Transform);
                        this.transform = component;
                    }
                }
                else if (this.transform === undefined || this.transform === null) this.transform = component;
            }
            this.components.Add(component);
            component.CanvasObject = this;
            return component;
        }
        public AddComponentOfType<T extends CanvasComponent>(type: { new(): T; }, addDependencies: boolean = false): T {
            let component = new type();
            return <T>this.AddComponent(component, addDependencies);
        }

        public GetComponent<T extends CanvasComponent>(type: Function & { prototype: T }): T | null {
            let items = this.components.filter(element => { return element instanceof type; }).ToArray();
            if (items.length === 0) return null;
            return <T>items[0];
        }

        public GetComponents<T extends CanvasComponent>(type: Function & { prototype: T }): Array<T> {
            return <Array<T>>this.components.filter(element => { return element instanceof type; }).ToArray();
        }

        public GetComponentsInChildren<T extends CanvasComponent>(type: Function & { prototype: T }): Array<T> {
            let thisComponents = this.GetComponents(type);
            this.children.forEach(child => {
                thisComponents.concat(child.GetComponents(type));
            });
            return thisComponents;
        }

        public HasComponent<T extends CanvasComponent>(type: Function & { prototype: T }): boolean {
            return this.GetComponent(type) !== null;
        }

        public RemoveComponent(comp: CanvasComponent): void {
            let items = this.components.filter(element => { return element === comp; }).ToArray();
            if (items.length > 0) {
                this.components.Remove(items[0]);
            }
        }
        public RemoveComponentOfType<T extends CanvasComponent>(type: Function & { prototype: T }): void {
            let component = this.GetComponent(type);
            if (component != null) this.RemoveComponent(component);
        }

        public AddChild(child: CanvasObject): CanvasObject {
            this.children.Add(child);
            return child;
        }
        public RemoveChild(child: CanvasObject): boolean {
            return this.children.Remove(child);
        }

        public Start(scene: Canvity.CanvasScene): void {
            this.started = true;
            if (this.parentObj === null) this.scene = scene;
            this.components.map(x => x.Start());
            this.children.map(x => x.Start(scene));
        }
    }
}

