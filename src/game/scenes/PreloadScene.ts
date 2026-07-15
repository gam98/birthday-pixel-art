import Phaser from 'phaser';
import { useGameStore } from '../../store/gameStore';
import { createPlaceholderTextures } from '../utils/createPlaceholderTextures';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    this.load.image('bedroom-background', '/assets/environments/bedroom-v2.png');
    this.load.image('town-background', '/assets/environments/town-v2.png');
    this.load.image('player', '/assets/characters/player-idle-v2.png');
    this.load.image('garden-guide', '/assets/characters/garden-guide-v2.png');
    this.load.image('burger-background', '/assets/environments/burger-v2.png');
    this.load.image('ice-cream-background', '/assets/environments/ice-cream-v2.png');
    this.load.image('cinema-background', '/assets/environments/cinema-v2.png');
    this.load.image('pool-background', '/assets/environments/pool-v2.png');
    this.load.image('memory-garden-background', '/assets/environments/memory-garden-v2.png');
    this.load.audio('ui-click', '/assets/sounds/ui-click.wav');
    this.load.audio('activity-success', '/assets/sounds/activity-success.wav');
    this.load.audio('pool-shot', '/assets/sounds/pool-shot.wav');
  }

  create(): void {
    const { width, height } = this.scale;
    const label = this.add
      .text(width / 2, height / 2 - 10, 'Encendiendo las lucecitas…', {
        color: '#fff4df',
        fontFamily: 'monospace',
        fontSize: '10px',
      })
      .setOrigin(0.5);

    createPlaceholderTextures(this);
    this.time.delayedCall(250, () => {
      label.destroy();
      const lastScene = useGameStore.getState().lastScene;
      const resumableScenes = [
        'BedroomScene',
        'TownScene',
        'BurgerScene',
        'IceCreamScene',
        'CinemaScene',
        'PoolScene',
        'MemoryGardenScene',
      ];
      this.scene.start(resumableScenes.includes(lastScene) ? lastScene : 'BedroomScene');
    });
  }
}
