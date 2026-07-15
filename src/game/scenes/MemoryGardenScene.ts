import { BaseActivityScene } from './BaseActivityScene';

export class MemoryGardenScene extends BaseActivityScene {
  constructor() {
    super({
      sceneKey: 'MemoryGardenScene',
      activityId: 'memoryGarden',
      backgroundKey: 'memory-garden-background',
      interactionLabel: 'Buscar recuerdos escondidos',
      interactionPosition: { x: 192, y: 145, range: 42 },
      collisions: [
        { x: 160, y: 78, width: 65, height: 48 },
        { x: 156, y: 0, width: 77, height: 58 },
      ],
    });
  }
}
