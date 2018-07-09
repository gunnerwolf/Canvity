namespace Canvity.Messaging {
    export class MessageBus {
        private static messages: { [id: string]: Array<Message> };
        private static globalMessages: { [type: string]: Array<Message> };

        private static delayedMessages: Array<{ [id: string]: Array<Message> }>;
        private static delayedGlobalMessages: Array<{ [id: string]: Array<Message> }>;

        public static Init(): void {
            MessageBus.messages = {};
            MessageBus.globalMessages = {};

            MessageBus.delayedMessages = new Array<{ [id: string]: Array<Message> }>();
            MessageBus.delayedGlobalMessages = new Array<{ [id: string]: Array<Message> }>();
        }

        public static PushMessage(message: Message, delay: number = 0): void {
            if (delay === 0) {
                if (!MessageBus.messages[message.Target]) MessageBus.messages[message.Target] = new Array<Message>();
                MessageBus.messages[message.Target].push(message);
            } else {
                if (!MessageBus.delayedMessages[delay]) MessageBus.delayedMessages[delay] = {};
                if (!MessageBus.delayedMessages[delay][message.Target]) MessageBus.delayedMessages[delay][message.Target] = new Array<Message>();
                MessageBus.delayedMessages[delay][message.Target].push(message);
            }
        }
        public static PushGlobalMessage(message: Message, delay: number = 0): void {
            if (delay === 0) {
                if (!MessageBus.globalMessages[message.Target]) MessageBus.globalMessages[message.Target] = new Array<Message>();
                MessageBus.globalMessages[message.Target].push(message);
            } else {
                if (!MessageBus.delayedGlobalMessages[delay]) MessageBus.delayedGlobalMessages[delay] = {};
                if (!MessageBus.delayedGlobalMessages[delay][message.Target]) MessageBus.delayedGlobalMessages[delay][message.Target] = new Array<Message>();
                MessageBus.delayedGlobalMessages[delay][message.Target].push(message);
            }
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

            MessageBus.delayedMessages.forEach((delayed, delay) => {
                if (Object.keys(delayed).length <= 0) return;
                if (delay <= 1) {
                    MessageBus.messages = delayed;
                } else {
                    MessageBus.delayedMessages[delay - 1] = delayed;
                }
                MessageBus.delayedMessages[delay] = {};
            });
            MessageBus.delayedGlobalMessages.forEach((delayed, delay) => {
                if (Object.keys(delayed).length <= 0) return;
                if (delay <= 1) {
                    MessageBus.globalMessages = delayed;
                } else {
                    MessageBus.delayedGlobalMessages[delay - 1] = delayed;
                }
                MessageBus.delayedGlobalMessages[delay] = {};
            });
        }
    }
}