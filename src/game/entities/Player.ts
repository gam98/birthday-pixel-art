import Phaser from 'phaser';
import { gabiCalloutPhrases } from '../../data/gabiCallouts';
import { eventBus } from '../systems/EventBus';
import { virtualControls } from '../systems/VirtualControls';
import { GAME_EVENTS } from '../types/events';

const PLAYER_SPEED = 92;

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly wasd: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;
  private readonly danceKey: Phaser.Input.Keyboard.Key;
  private readonly callGabiKey: Phaser.Input.Keyboard.Key;
  private controlsEnabled = true;
  private isDancing = false;
  private gabiPhraseIndex = 0;
  private summonedGabi?: Phaser.GameObjects.Sprite;
  private gabiDismissTimer?: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true).setDepth(10);
    // A small circular foot collider glides around furniture corners more
    // naturally than the old rectangle, while keeping the visible sprite clear.
    this.body?.setCircle(5, 7, 29);

    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('No fue posible inicializar los controles de teclado.');
    this.cursors = keyboard.createCursorKeys();
    this.wasd = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.danceKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    this.callGabiKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
  }

  update(): void {
    if (!this.controlsEnabled) {
      this.setVelocity(0).setAngle(0);
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.danceKey) || virtualControls.consumeDance()) {
      this.startDance();
    }
    if (Phaser.Input.Keyboard.JustDown(this.callGabiKey) || virtualControls.consumeCallGabi()) {
      this.callGabi();
    }
    if (this.isDancing) {
      this.setVelocity(0);
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
    if (!enabled) {
      this.setVelocity(0);
      this.stopDance();
    }
  }

  private startDance(): void {
    if (this.isDancing) return;
    this.isDancing = true;
    this.setVelocity(0);
    this.createDanceHearts();
    this.scene.tweens.add({
      targets: this,
      angle: { from: -8, to: 8 },
      scaleX: { from: 0.94, to: 1.06 },
      scaleY: { from: 1.06, to: 0.94 },
      duration: 120,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: 3,
      onComplete: () => this.stopDance(),
    });
  }

  private stopDance(): void {
    this.scene.tweens.killTweensOf(this);
    this.setAngle(0).setScale(1);
    this.isDancing = false;
  }

  private createDanceHearts(): void {
    const offsets = [-11, 9, -6, 12, 1];
    offsets.forEach((offset, index) => {
      const heart = this.scene.add
        .text(this.x + offset, this.y - 15, index % 2 === 0 ? '♥' : '♪', {
          color: index % 2 === 0 ? '#ff8da6' : '#ffd176',
          fontFamily: 'monospace',
          fontSize: '8px',
          stroke: '#5d2941',
          strokeThickness: 2,
        })
        .setOrigin(0.5)
        .setDepth(20)
        .setAlpha(0);
      this.scene.tweens.add({
        targets: heart,
        y: heart.y - 22 - index * 2,
        x: heart.x + (index % 2 === 0 ? -5 : 5),
        alpha: { from: 1, to: 0 },
        scale: { from: 0.75, to: 1.25 },
        delay: index * 90,
        duration: 650,
        ease: 'Cubic.Out',
        onComplete: () => heart.destroy(),
      });
    });
  }

  private callGabi(): void {
    const phrase = gabiCalloutPhrases[this.gabiPhraseIndex];
    this.gabiPhraseIndex = (this.gabiPhraseIndex + 1) % gabiCalloutPhrases.length;
    eventBus.emit(GAME_EVENTS.GABI_CALLED, { phrase });

    this.gabiDismissTimer?.remove(false);
    if (this.summonedGabi) {
      this.scene.tweens.killTweensOf(this.summonedGabi);
      this.summonedGabi.destroy();
    }

    const side = this.x < this.scene.scale.width / 2 ? 1 : -1;
    const x = Phaser.Math.Clamp(this.x + side * 29, 18, this.scene.scale.width - 18);
    const gabi = this.scene.add
      .sprite(x, this.y + 3, 'garden-guide')
      .setDepth(11)
      .setAlpha(0)
      .setScale(0.65);
    this.summonedGabi = gabi;
    this.scene.tweens.add({
      targets: gabi,
      y: this.y,
      alpha: 1,
      scale: 1,
      duration: 280,
      ease: 'Back.Out',
    });
    this.createGabiArrivalEffect(x, this.y);

    this.gabiDismissTimer = this.scene.time.delayedCall(3300, () => {
      if (!gabi.active) return;
      this.scene.tweens.add({
        targets: gabi,
        y: gabi.y - 7,
        alpha: 0,
        scale: 0.8,
        duration: 260,
        ease: 'Sine.In',
        onComplete: () => {
          gabi.destroy();
          if (this.summonedGabi === gabi) this.summonedGabi = undefined;
        },
      });
    });
  }

  private createGabiArrivalEffect(x: number, y: number): void {
    [-8, 0, 8].forEach((offset, index) => {
      const sparkle = this.scene.add
        .text(x + offset, y - 9, index === 1 ? '♥' : '✦', {
          color: index === 1 ? '#ff8da6' : '#ffd176',
          fontFamily: 'monospace',
          fontSize: '7px',
          stroke: '#5d2941',
          strokeThickness: 2,
        })
        .setOrigin(0.5)
        .setDepth(20);
      this.scene.tweens.add({
        targets: sparkle,
        y: sparkle.y - 16,
        alpha: 0,
        delay: index * 70,
        duration: 520,
        onComplete: () => sparkle.destroy(),
      });
    });
  }
}
