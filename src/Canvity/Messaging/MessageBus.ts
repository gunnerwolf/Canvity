namespace Canvity.Messaging {
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

        public static GetMessages(id: string): Array<Message> {
            if (!MessageBus.messages[id]) {
                MessageBus.messages[id] = new Array<Message>();
                return MessageBus.messages[id];
            }
            return MessageBus.messages[id];
        }
        public static GetGlobalMessages(type: string): Array<Message> {
            if (!MessageBus.globalMessages[type]) {
                MessageBus.globalMessages[type] = new Array<Message>();
                return MessageBus.globalMessages[type];
            }
            return MessageBus.globalMessages[type];
        }

        public static ClearMessages(): void {
            MessageBus.messages = {};
            MessageBus.globalMessages = {};
        }
    }
}