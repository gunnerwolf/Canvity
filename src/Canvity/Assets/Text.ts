namespace Canvity.Assets {
    export class Text extends Asset {
        private content: string;
        public get Content(): string { return this.content; }

        public constructor(content: string) {
            super();
            this.content = content;
        }
    }
}