namespace Canvity.Assets {
    export class Text extends Asset {
        private content: string;
        public get Content(): string { return this.content; }

        public constructor(path: string, content: string) {
            super(path);
            this.content = content;
        }
    }
}