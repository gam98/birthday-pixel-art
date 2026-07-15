import { BaseActivityScene } from './BaseActivityScene';

export class CinemaScene extends BaseActivityScene {
  constructor() {
    super({
      sceneKey: 'CinemaScene',
      activityId: 'cinema',
      backgroundKey: 'cinema-background',
      interactionLabel: 'Elegir la próxima película',
      interactionPosition: { x: 192, y: 105, range: 46 },
      collisions: [
        { x: 0, y: 0, width: 384, height: 93 },
        { x: 0, y: 154, width: 104, height: 58 },
        { x: 280, y: 150, width: 104, height: 62 },
      ],
    });
  }
}
