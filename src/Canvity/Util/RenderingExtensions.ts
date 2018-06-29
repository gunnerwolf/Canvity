interface CanvasRenderingContext2D {
    drawSprite(sprite: Canvity.Assets.Sprite, x: number, y: number): void;
}

CanvasRenderingContext2D.prototype.drawSprite = (sprite: Canvity.Assets.Sprite, x: number, y: number) => {
    this.drawImage(sprite.Image, x, y);
}