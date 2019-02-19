import { Time } from '../Util/Time';
import { CanvasScene } from '../CanvasScene';

export interface ISystem {
    Update(time: Time, scene: CanvasScene): void;
}