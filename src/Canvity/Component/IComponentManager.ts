export interface IComponentManager {
    Type: {new(id: number): any}
    hasComponent(entity: number): boolean;
    getComponent(entity: number): any;
    createComponent(entity: number): any;
    removeComponent(entity: number): void;
}