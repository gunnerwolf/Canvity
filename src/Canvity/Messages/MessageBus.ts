namespace Canvity.Messages {
    export class MessageBus {
        private static messages: { [id: string]: Array<Message> };
        private static globalMessages: { [type: string]: Array<Message> };

        public static Init(): void {
            MessageBus.messages = {};
            MessageBus.globalMessages = {};
        }

        public static PushMessage(message: Message): void {
            if (!MessageBus.messages[message.Target]) MessageBus.messages[message.Target] = new Array<Message>();
            MessageBus.messages[message.Target].push(message);
        }
        public static PushGlobalMessage(message: Message): void {
            if (!MessageBus.globalMessages[message.Target]) MessageBus.globalMessages[message.Target] = new Array<Message>();
            MessageBus.globalMessages[message.Target].push(message);
        }

        public static GetMessage(id: string, filo: boolean = false): Message | boolean {
            if (!MessageBus.messages[id] || MessageBus.messages[id].length === 0) return false;
            if (filo) return <Message>MessageBus.messages[id].pop();
            else return <Message>MessageBus.messages[id].shift();
        }
        public static GetGlobalMessage(type: string, filo: boolean = false): Message | boolean {
            if (!MessageBus.globalMessages[type] || MessageBus.globalMessages[type].length === 0) return false;
            if (filo) return <Message>MessageBus.globalMessages[type].pop();
            else return <Message>MessageBus.globalMessages[type].shift();
        }

        public static GetMessages(id: string): Array<Message> {
            if (!MessageBus.messages[id]) {
                MessageBus.messages[id] = new Array<Message>();
                return MessageBus.messages[id];
            }
            let messages: Array<Message> = MessageBus.messages[id];
            MessageBus.messages[id] = new Array<Message>();
            return messages;
        }
        public static GetGlobalMessages(type: string): Array<Message> {
            if (!MessageBus.globalMessages[type]) {
                MessageBus.globalMessages[type] = new Array<Message>();
                return MessageBus.globalMessages[type];
            }
            let messages: Array<Message> = MessageBus.globalMessages[type];
            MessageBus.globalMessages[type] = new Array<Message>();
            return messages;
        }
    }
}