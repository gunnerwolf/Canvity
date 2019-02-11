namespace Canvity.Render {
    export interface IRenderingContext {
        contextWidth: number;
        contextHeight: number;

        drawRect(rect: Util.Rect, color: Util.Color): void
        drawRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color): void

        drawPoly(vertices: Array<Util.Vector2>, color: Util.Color): void;

        strokeRect(rect: Util.Rect, color: Util.Color, lineWidth: number): void;
        strokeRectFromCoords(x: number, y: number, w: number, h: number, color: Util.Color, lineWidth: number): void;

        drawSprite(sprite: Assets.Sprite, x: number, y: number): void
        drawTintedSprite(sprite: Assets.Sprite, x: number, y: number, color: Util.Color): void

        drawText(text: string, x: number, y: number, color: Util.Color): void
        drawTextWithFont(text: string, x: number, y: number, font: string, color: Util.Color): void

        drawLine(start: Util.Vector2, end: Util.Vector2, color: Util.Color, lineWidth: number): void
        drawLineFromCoords(startX: number, startY: number, endX: number, endY: number, color: Util.Color, lineWidth: number): void
    }
}