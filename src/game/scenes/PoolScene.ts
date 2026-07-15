import { BaseActivityScene } from './BaseActivityScene';

export class PoolScene extends BaseActivityScene {
  constructor() {
    super({
      sceneKey: 'PoolScene',
      activityId: 'pool',
      backgroundKey: 'pool-background',
      interactionLabel: 'Intentar el tiro del corazón',
      interactionPosition: { x: 192, y: 148, range: 43 },
      collisions: [
        { x: 124, y: 60, width: 137, height: 70 },
        { x: 0, y: 0, width: 384, height: 44 },
      ],
    });
  }
}
