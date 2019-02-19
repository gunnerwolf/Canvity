import { HashSet } from "./Util/HashSet";
import { Component } from "./Component/Component";

export class Aspect extends HashSet<Component> {
    public Get<T extends Component>(c: {new(id: number): T}): T {
        return <T>this.filter(this.typeCheck<T>(c)).ToArray()[0];
    }

    private typeCheck<T extends Component>(c: {new(id: number): T}): (value: Component, index: number, array: Component[]) => boolean {
        return value => value instanceof c;
    }
}