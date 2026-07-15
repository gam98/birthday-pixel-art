import Phaser from 'phaser';
import { createPlaceholderTextures } from '../utils/createPlaceholderTextures';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    this.load.image('bedroom-background', '/assets/environments/bedroom-v2.png');
    this.load.image('player', '/assets/characters/player-idle-v2.png');
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
      this.scene.start('BedroomScene');
    });
  }
}
