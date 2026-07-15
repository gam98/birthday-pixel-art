import Phaser from 'phaser';

export interface NPCConfig {
  id: string;
  name: string;
  x: number;
  y: number;
  texture: string;
}

export class NPC extends Phaser.Physics.Arcade.Sprite {
  readonly npcId: string;
  readonly npcName: string;

  constructor(scene: Phaser.Scene, config: NPCConfig) {
    super(scene, config.x, config.y, config.texture);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.npcId = config.id;
    this.npcName = config.name;
    this.setDepth(8);
    this.body?.setSize(14, 9).setOffset(7, 34);

    scene.tweens.add({
      targets: this,
      y: this.y - 1,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }
}
