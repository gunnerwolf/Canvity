namespace Canvity.Component {
    export function Requires(...types: Array<{ new (...args: any[]): CanvasComponent; }>) {
        return function (target: Function) {
            let original: Function = target;

            let requires = new Array<{ new (...args: any[]): CanvasComponent; }>();
            types.forEach(type => { requires.push(type); });

            let newConstructor: any = (...args: any[]) => {
                var construct: any = function () {
                    return original.apply(this, args);
                }
                construct.prototype = original.prototype;
                
                let obj = new construct();
                Object.defineProperty(obj, 'requires', {
                    value: requires,
                    configurable: false,
                    writable: false
                });
                return obj;
            }

            newConstructor.prototype = original.prototype;

            return newConstructor;
        }
    }

    export function Unique(target: Function) {
        let original: Function = target;

        let newConstructor: any = (...args: any[]) => {
            var construct: any = function () {
                return original.apply(this, args);
            }
            construct.prototype = original.prototype;
            
            let obj = new construct();
            Object.defineProperty(obj, 'unique', {
                value: true,
                configurable: false,
                writable: false
            });
            return obj;
        }

        newConstructor.prototype = original.prototype;

        return newConstructor;
    }
}