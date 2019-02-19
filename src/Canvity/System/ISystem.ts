import { Time } from '../Util/Time';
import { CanvasScene } from '../CanvasScene';
import { IRenderingContext } from '../Render/IRenderingContext';

export interface ISystem {
    Draw(time: Time, ctx: IRenderingContext, scene: CanvasScene): void;
    Update(time: Time, scene: CanvasScene): void;
}