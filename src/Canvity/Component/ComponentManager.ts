import { HashSet } from "../Util/HashSet";
import { Component } from "./Component";
import { IComponentManager } from "./IComponentManager";

export class ComponentManager<T extends Component> implements IComponentManager {
    protected componentType: new(id: number) => T;
    public get Type(): new(id: number) => T { return this.componentType; }

    public get Count(): number { return this.components.Count; }

    protected components: HashSet<T>;

    constructor(c: new(id: number) => T) {
        this.componentType = c;
        this.components = new HashSet<T>();
    }

    public HasComponent(entity: number): boolean {
        return this.components.filter(x => x.EntityID === entity).Count > 0;
    }
    public GetComponent(entity: number): T | null {
        let results = this.components.filter(x => x.EntityID === entity).ToArray();
        if (results.length === 0) return null;
        return results[0];
    }

    public CreateComponent(entity: number): T {
        let component = Component.CreateComponent<T>(this.componentType, entity);
        this.components.Add(component);
        return component;
    }

    public RemoveComponent(entity: number): void {
        let component = this.GetComponent(entity);
        if (component === null) return;
        this.components.Remove(component);
    }

    public ForEach(f: (value: T, index: number, array: Array<T>) => void, thisArg?: any): void {
        this.components.forEach(f);
    }
}
