import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameConfig';
import { InteractiveObject } from '../entities/InteractiveObject';
import { Player } from '../entities/Player';
import { DialogueSystem } from '../systems/DialogueSystem';
import { eventBus } from '../systems/EventBus';
import { InteractionSystem } from '../systems/InteractionSystem';
import { InventorySystem } from '../systems/InventorySystem';
import { GAME_EVENTS } from '../types/events';

interface BedroomSceneData {
  from?: 'town';
}

export class BedroomScene extends Phaser.Scene {
  private player?: Player;
  private interactionSystem?: InteractionSystem;
  private sceneData: BedroomSceneData = {};
  private readonly dialogueSystem = new DialogueSystem();
  private readonly inventorySystem = new InventorySystem();

  constructor() {
    super('BedroomScene');
  }

  init(data: BedroomSceneData): void {
    this.sceneData = data;
  }

  create(): void {
    this.physics.world.setBounds(8, 8, GAME_WIDTH - 16, GAME_HEIGHT - 16);
    this.add.image(0, 0, 'bedroom-background').setOrigin(0).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

    const obstacles = this.physics.add.staticGroup();
    this.addCollisionZone(obstacles, 14, 44, 112, 87);
    this.addCollisionZone(obstacles, 181, 8, 44, 73);
    this.addCollisionZone(obstacles, 273, 66, 94, 43);
    this.addCollisionZone(obstacles, 291, 104, 31, 42);
    this.addCollisionZone(obstacles, 327, 165, 31, 31);
    this.addCollisionZone(obstacles, 0, 150, 47, 66);

    const spawn = this.sceneData.from === 'town' ? { x: 203, y: 96 } : { x: 194, y: 158 };
    this.player = new Player(this, spawn.x, spawn.y);
    this.physics.add.collider(this.player, obstacles);
    this.interactionSystem = new InteractionSystem(this, this.player);
    this.createInteractions();

    eventBus.emit(GAME_EVENTS.GAME_READY);
    eventBus.emit(GAME_EVENTS.SCENE_CHANGED, { scene: this.scene.key });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.interactionSystem?.destroy());
  }

  update(): void {
    this.player?.update();
    this.interactionSystem?.update();
  }

  private createInteractions(): void {
    if (!this.interactionSystem) return;
    const letter = new InteractiveObject(this, {
      id: 'welcome-letter',
      x: 277,
      y: 103,
      width: 30,
      height: 18,
      range: 37,
      label: 'Leer la carta',
      action: () => {
        this.inventorySystem.collect('welcomeLetter');
        this.dialogueSystem.open('welcomeLetter');
      },
    });

    const gift = new InteractiveObject(this, {
      id: 'final-gift',
      x: 342,
      y: 180,
      width: 34,
      height: 34,
      range: 35,
      label: 'Examinar el regalo',
      locked: false,
      action: () => this.dialogueSystem.open('lockedGift'),
    });

    const photo = new InteractiveObject(this, {
      id: 'bedroom-photo',
      x: 116,
      y: 54,
      width: 24,
      height: 22,
      range: 90,
      label: 'Mirar la fotografía',
      action: () => this.dialogueSystem.open('bedroomPhoto'),
    });

    const door = new InteractiveObject(this, {
      id: 'bedroom-door',
      x: 203,
      y: 79,
      width: 32,
      height: 16,
      range: 27,
      label: 'Salir a la plaza',
      action: () => this.scene.start('TownScene', { from: 'bedroom' }),
    });

    [letter, gift, photo, door].forEach((object) => this.interactionSystem?.register(object));
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
