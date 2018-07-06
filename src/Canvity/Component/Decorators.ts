namespace Canvity.Component {
    export function Requires(...types: Array<{ new (...args: any[]): CanvasComponent; }>) {
        return function<T extends new (...arg: any[])=> any> (target: T) {
            let requires = new Array<{ new (...args: any[]): CanvasComponent; }>();
            types.forEach(type => { requires.push(type); });

            return class extends target {
                constructor(...args: any[]) {
                    super(...args);
                    Object.defineProperty(this, 'requires', {
                        value: requires,
                        configurable: false,
                        writable: false
                    });
                }
            }
        }
    }
    export function Unique<T extends new (...arg: any[])=> any>(target: T) {    
        return class extends target {
            constructor(...args: any[]){
                super(...args);
                Object.defineProperty(this, 'unique', {
                    value: true,
                    configurable: false,
                    writable: false
                });
            }
        };
    }
}