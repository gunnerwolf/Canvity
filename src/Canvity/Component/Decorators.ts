namespace Canvity.Component {
    function Requires(...types: Array<{ new (...args: any[]): CanvasComponent; }>) {
        return function (target: CanvasComponent) {
            let requires = new Array<{ new (...args: any[]): CanvasComponent; }>();
            types.forEach(type => { requires.push(type); });

            Object.defineProperty(target, 'Requires', {
                value: requires,
                writable: false
            });
        }
    }
}