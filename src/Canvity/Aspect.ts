import { Component } from "./Component/Component";
import { HashSet } from "./Util/HashSet";

export class Aspect extends HashSet<Component> {
    public Get<T extends Component>(c: new(id: number) => T): T {
        return this.filter(this.typeCheck<T>(c)).ToArray()[0] as T;
    }

    private typeCheck<T extends Component>(c: new(id: number) => T): (value: Component, index: number, array: Array<Component>) => boolean {
        return value => value instanceof c;
    }
}
