import { Aspect } from "./Aspect";
import { Component } from "./Component/Component";
import { ComponentManager } from "./Component/ComponentManager";
import { IComponentManager } from "./Component/IComponentManager";
import { IRenderingContext } from "./Render/IRenderingContext";
import { System } from "./System/System";
import { Color } from "./Util/Color";
import { HashSet } from "./Util/HashSet";
import { Rect } from "./Util/Rect";
import { Time } from "./Util/Time";

export class Scene {
    private systems: HashSet<System>;
    private componentManagers: HashSet<IComponentManager>;
    private background: Color;

    public get Background(): Color { return this.background; }
    public set Background(val: Color) { this.background = val; }

    public get SystemCount(): number { return this.systems.Count; }
    public get ComponentCount(): number { return this.componentManagers.map(cm => cm.Count).ToArray().reduce((a, b) => a + b); }

    public constructor() {
        this.systems = new HashSet<System>();
        this.componentManagers = new HashSet<IComponentManager>();
        this.Background = Color.Transparent;
    }

    public GetComponentManager<T extends Component>(TCtor: new (...args: Array<any>) => T): ComponentManager<T> | null {
        let TManagers = this.componentManagers.filter(x => x.IsOfType(TCtor)).ToArray();
        if (TManagers.length === 0) return null;
        return TManagers[0] as ComponentManager<T>;
    }

    public Draw(time: Time, ctx: IRenderingContext): void {
        ctx.drawRect(new Rect(0, 0, ctx.contextWidth, ctx.contextHeight), this.Background);
        this.systems.forEach(element => {
            element.Draw(time, ctx, this.GetAspects(...element.AspectType));
        });
    }

    public Update(time: Time): void {
        this.systems.forEach(element => {
            element.Update(time, this.GetAspects(...element.AspectType));
        });
    }

    public RegisterSystem(system: System): void {
        this.systems.Add(system);
    }

    public AddComponentManager(compManager: IComponentManager): void {
        this.componentManagers.Add(compManager);
    }

    public GetAspects(... components: Array<new(id: number) => Component>): Array<Aspect> {
        let managers = new Array<IComponentManager>();
        components.forEach(comp => {
            let man = this.GetComponentManager(comp);
            if (man === null) {
                // TODO: do something
                return;
            }
            managers.push(man);
        });

        return this.GetAspectsByManagers(...managers);
    }

    public GetAspectsByManagers(... componentManagers: Array<IComponentManager>): Array<Aspect> {
        if (componentManagers.length === 0) throw new Error("No Component Managers passed!");
        /*
         * We need aspects for any entities that own a component from *every* supplied componentManager
         * If a given entity does not have a component in any of the componentManagers, the entity is not valid
         * for the aspect, and should be skipped.
         */
        let aspects = new Array<Aspect>();
        // Determine which componentManager has the largest number of components.
        let controlManager = componentManagers.sort((a, b) => a.Count - b.Count)[0];
        componentManagers = componentManagers.filter(x => x !== controlManager);
        // For each component in controlManager
        controlManager.ForEach(component => {
            let aspect = new Aspect();
            // This component will, obviously, always be on the entity
            aspect.Add(component);
            let entityId = component.EntityID;
            let found = true;
            // For each other componentManager
            for (let c of componentManagers) {
                let comp = c.GetComponent(entityId);
                // If component is null, entityId does not have a component in c, and should be skipped
                if (comp === null) {
                    found = false;
                    break;
                }
                // Otherwise, add the component to the aspect, and continue
                aspect.Add(comp);
            }
            // If found is still true, entityId has a component in every componentManager, and aspect is valid
            if (found) {
                aspects.push(aspect);
            }
        });

        return aspects;
    }
}
