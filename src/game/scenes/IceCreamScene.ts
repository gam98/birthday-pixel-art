import { BaseActivityScene } from './BaseActivityScene';

export class IceCreamScene extends BaseActivityScene {
  constructor() {
    super({
      sceneKey: 'IceCreamScene',
      activityId: 'iceCream',
      backgroundKey: 'ice-cream-background',
      interactionLabel: 'Crear un helado',
      interactionPosition: { x: 192, y: 112, range: 45 },
      collisions: [
        { x: 0, y: 0, width: 384, height: 104 },
        { x: 0, y: 105, width: 88, height: 76 },
        { x: 296, y: 105, width: 88, height: 76 },
      ],
    });
  }
}
