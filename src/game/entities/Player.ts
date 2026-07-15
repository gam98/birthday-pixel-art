import Phaser from 'phaser';
import { virtualControls } from '../systems/VirtualControls';

const PLAYER_SPEED = 92;

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly wasd: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;
  private controlsEnabled = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true).setDepth(10);
    this.body?.setSize(12, 8).setOffset(6, 30);

    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('No fue posible inicializar los controles de teclado.');
    this.cursors = keyboard.createCursorKeys();
    this.wasd = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(): void {
    if (!this.controlsEnabled) {
      this.setVelocity(0).setAngle(0);
      return;
    }
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;
    const mobile = virtualControls.getAxis();
    const direction = new Phaser.Math.Vector2(
      Number(right) - Number(left) + mobile.x,
      Number(down) - Number(up) + mobile.y,
    );

    if (direction.lengthSq() > 0) direction.normalize().scale(PLAYER_SPEED);
    this.setVelocity(direction.x, direction.y);
    if (direction.x !== 0) this.setFlipX(direction.x < 0);
    this.setAngle(direction.lengthSq() > 0 ? Math.sin(this.scene.time.now / 80) * 1.5 : 0);
  }

  setControlsEnabled(enabled: boolean): void {
    this.controlsEnabled = enabled;
    if (!enabled) this.setVelocity(0);
  }
}
