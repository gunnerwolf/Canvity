import { Component } from "./Component";

export interface IComponentManager {
    Type: {new(id: number): any};
    Count: number;
    hasComponent(entity: number): boolean;
    getComponent(entity: number): any;
    createComponent(entity: number): any;
    removeComponent(entity: number): void;
    forEach(f: (value: Component, index: number, array: Component[]) => void, thisArg?: any): void;
}