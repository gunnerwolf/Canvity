namespace Canvity.Events {
    export class CanvityEvent<T> {
        private listeners: Array<(value: T) => void>;

        public constructor() {
            this.listeners = new Array<(value: T) => void>();
        }

        public AddEventListener(f: (value: T) => void): void {
            this.listeners.push(f);
        }

        public RemoveEventListener(f: (value: T) => void): void {
            if (this.listeners.indexOf(f) >= 0) {
                this.listeners.splice(this.listeners.indexOf(f), 1);
            }
        }

        public Invoke(value: T): void {
            this.listeners.forEach(callback => { callback(value); });
        }
    }
}