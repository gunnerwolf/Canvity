import { Component } from "./Component";

export interface IComponentManager {
    Type: new(id: number) => any;
    Count: number;
    IsOfType(type: new (id: number) => any): boolean;
    HasComponent(entity: number): boolean;
    GetComponent(entity: number): any;
    CreateComponent(entity: number): any;
    RemoveComponent(entity: number): void;
    ForEach(f: (value: Component, index: number, array: Array<Component>) => void, thisArg?: any): void;
}
