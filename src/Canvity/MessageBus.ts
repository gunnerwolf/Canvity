namespace Canvity {
    export class MessageBus {
        private static messages: { [id: string]: Array<string> };

        public static Init(): void {
            MessageBus.messages = {};
        }

        public static PushMessage(id: string, message: string): void {
            if (!this.messages[id]) this.messages[id] = new Array<string>();
            this.messages[id].push(message);
        }

        public static GetMessage(id: string, filo: boolean = false): string | boolean {
            if (!this.messages[id] || this.messages[id].length === 0) return false;
            if (filo) return <string>this.messages[id].pop();
            else return <string>this.messages[id].shift();
        }

        public static GetMessages(id: string): Array<string> {
            if (!this.messages[id]) {
                this.messages[id] = new Array<string>();
                return this.messages[id];
            }
            let messages: Array<string> = this.messages[id];
            this.messages[id] = new Array<string>();
            return messages;
        }
    }
}