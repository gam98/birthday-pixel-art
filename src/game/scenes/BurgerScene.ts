import { BaseActivityScene } from './BaseActivityScene';

export class BurgerScene extends BaseActivityScene {
  constructor() {
    super({
      sceneKey: 'BurgerScene',
      activityId: 'burger',
      backgroundKey: 'burger-background',
      interactionLabel: 'Preparar una hamburguesa',
      interactionPosition: { x: 192, y: 111, range: 44 },
      collisions: [
        { x: 0, y: 0, width: 384, height: 101 },
        { x: 0, y: 107, width: 93, height: 66 },
        { x: 291, y: 107, width: 93, height: 66 },
      ],
    });
  }
}
