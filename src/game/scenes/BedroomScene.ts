import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameConfig';
import { Player } from '../entities/Player';
import { eventBus } from '../systems/EventBus';
import { GAME_EVENTS } from '../types/events';

export class BedroomScene extends Phaser.Scene {
  private player?: Player;

  constructor() {
    super('BedroomScene');
  }

  create(): void {
    this.physics.world.setBounds(8, 8, GAME_WIDTH - 16, GAME_HEIGHT - 16);
    this.add.image(0, 0, 'bedroom-background').setOrigin(0).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

    const obstacles = this.physics.add.staticGroup();
    this.addCollisionZone(obstacles, 14, 44, 112, 87); // cama
    this.addCollisionZone(obstacles, 181, 8, 44, 73); // puerta
    this.addCollisionZone(obstacles, 273, 66, 94, 43); // escritorio
    this.addCollisionZone(obstacles, 291, 104, 31, 42); // silla
    this.addCollisionZone(obstacles, 327, 165, 31, 31); // regalo
    this.addCollisionZone(obstacles, 0, 150, 47, 66); // planta y mesa

    this.player = new Player(this, 194, 158);
    this.physics.add.collider(this.player, obstacles);

    eventBus.emit(GAME_EVENTS.GAME_READY);
    eventBus.emit(GAME_EVENTS.SCENE_CHANGED, { scene: this.scene.key });
  }

  update(): void {
    this.player?.update();
  }

  private addCollisionZone(
    group: Phaser.Physics.Arcade.StaticGroup,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const zone = this.add.zone(x, y, width, height).setOrigin(0);
    this.physics.add.existing(zone, true);
    group.add(zone);
  }
}
