namespace Canvity.Events {
    export class CanvityEvent1<T1> {
        private listeners: Array<(value: T1) => void>;

        public constructor() {
            this.listeners = new Array<(value: T1) => void>();
        }

        public AddEventListener(f: (value: T1) => void): void {
            this.listeners.push(f);
        }

        public RemoveEventListener(f: (value: T1) => void): void {
            if (this.listeners.indexOf(f) >= 0) {
                this.listeners.splice(this.listeners.indexOf(f), 1);
            }
        }

        public Invoke(value: T1): void {
            this.listeners.forEach(callback => { callback(value); });
        }
    }
}