namespace Canvity.Events {
    export class CanvityEvent {
        private listeners: Array<(values: Array<any>) => void>;

        public constructor() {
            this.listeners = new Array<(values: Array<any>) => void>();
        }

// TODO: Strip out events and replace with messages
        public AddEventListener(listener: (values: Array<any>) => void): void {
            this.listeners.push(listener);
        }

        public RemoveEventListener(listener: (values: Array<any>) => void): void {
            if (this.listeners.indexOf(listener) >= 0) {
                this.listeners.splice(this.listeners.indexOf(listener), 1);
            }
        }

        public Invoke(...values: Array<any>): void {
            this.listeners.forEach(listener => { listener(values); });
        }
    }
}