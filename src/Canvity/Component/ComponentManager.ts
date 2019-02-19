import { Component } from './Component';
import { HashSet } from '../Util/HashSet';

export class ComponentManager<T extends Component> {
    protected componentType: {new(id: number): T};

    protected components: HashSet<T>;

    constructor(c: {new(id: number): T}) {
        this.componentType = c;
    }

    public hasComponent(entity: number): boolean {
        return this.components.filter(x => x.EntityID == entity).Count > 0;
    }
    public getComponent(entity: number): T | null {
        let results = this.components.filter(x => x.EntityID == entity).ToArray();
        if (results.length == 0) return null;
        return results[0];
    }

    public createComponent(entity: number): T {
        let component = Component.createComponent<T>(this.componentType, entity);
        this.components.Add(component);
        return component;
    }

    public removeComponent(entity: number): void {
        let component = this.getComponent(entity);
        if (component == null) return;
        this.components.Remove(component);
    }
}