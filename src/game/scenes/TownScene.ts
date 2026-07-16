import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameConfig';
import { useGameStore } from '../../store/gameStore';
import { InteractiveObject } from '../entities/InteractiveObject';
import { NPC } from '../entities/NPC';
import { Player } from '../entities/Player';
import { DialogueSystem, type DialogueId } from '../systems/DialogueSystem';
import { eventBus } from '../systems/EventBus';
import { InteractionSystem } from '../systems/InteractionSystem';
import { InventorySystem } from '../systems/InventorySystem';
import { GAME_EVENTS } from '../types/events';

export class TownScene extends Phaser.Scene {
  private player?: Player;
  private interactionSystem?: InteractionSystem;
  private readonly dialogueSystem = new DialogueSystem();
  private readonly inventorySystem = new InventorySystem();

  constructor() {
    super('TownScene');
  }

  create(): void {
    this.physics.world.setBounds(6, 6, GAME_WIDTH - 12, GAME_HEIGHT - 12);
    this.add.image(0, 0, 'town-background').setOrigin(0).setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

    const obstacles = this.physics.add.staticGroup();
    this.addCollisionZone(obstacles, 0, 0, 131, 80);
    this.addCollisionZone(obstacles, 260, 0, 124, 78);
    this.addCollisionZone(obstacles, 160, 0, 65, 68);
    this.addCollisionZone(obstacles, 0, 80, 100, 79);
    this.addCollisionZone(obstacles, 286, 77, 98, 84);
    // The visual edges around the fountain and angled benches are decorative.
    // Keeping only their solid cores leaves enough room for the 12×8 player body
    // to slide around every corner instead of getting pinched between hitboxes.
    this.addCollisionZone(obstacles, 168, 77, 49, 41);
    this.addCollisionZone(obstacles, 130, 79, 22, 9);
    this.addCollisionZone(obstacles, 234, 79, 21, 9);
    this.addCollisionZone(obstacles, 139, 130, 15, 8);
    this.addCollisionZone(obstacles, 230, 129, 23, 8);

    this.player = new Player(this, 193, 187);
    this.physics.add.collider(this.player, obstacles);

    const guide = new NPC(this, {
      id: 'garden-guide',
      name: 'Gabi',
      x: 261,
      y: 114,
      texture: 'garden-guide',
    });
    this.physics.add.collider(this.player, guide);
    this.interactionSystem = new InteractionSystem(this, this.player);
    this.createInteractions(guide);

    eventBus.emit(GAME_EVENTS.SCENE_CHANGED, { scene: this.scene.key });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.interactionSystem?.destroy());
  }

  update(): void {
    this.player?.update();
    this.interactionSystem?.update();
  }

  private createInteractions(guide: NPC): void {
    if (!this.interactionSystem) return;
    const openDialogue = (id: DialogueId) => this.dialogueSystem.open(id);
    const specs: Array<ConstructorParameters<typeof InteractiveObject>[1]> = [
      {
        id: 'guide',
        x: guide.x,
        y: guide.y,
        width: 28,
        height: 44,
        range: 31,
        label: 'Hablar con Gabi',
        action: () => openDialogue('guideWelcome'),
      },
      {
        id: 'burger-shop',
        x: 95,
        y: 70,
        width: 32,
        height: 24,
        range: 38,
        label: 'Visitar la hamburguesería',
        action: () => this.scene.start('BurgerScene'),
      },
      {
        id: 'ice-cream-shop',
        x: 292,
        y: 69,
        width: 35,
        height: 25,
        range: 42,
        label: 'Visitar la heladería',
        action: () => this.scene.start('IceCreamScene'),
      },
      {
        id: 'cinema',
        x: 70,
        y: 140,
        width: 36,
        height: 25,
        range: 38,
        label: 'Mirar la cartelera',
        action: () => this.scene.start('CinemaScene'),
      },
      {
        id: 'pool-hall',
        x: 311,
        y: 141,
        width: 38,
        height: 26,
        range: 40,
        label: 'Entrar al billar',
        action: () => this.scene.start('PoolScene'),
      },
      {
        id: 'memory-garden',
        x: 192,
        y: 50,
        width: 48,
        height: 28,
        range: 38,
        label: 'Examinar el jardín',
        action: () => this.scene.start('MemoryGardenScene'),
      },
      {
        id: 'home-path',
        x: 192,
        y: 205,
        width: 45,
        height: 20,
        range: 28,
        label: 'Volver a la habitación',
        action: () => this.scene.start('BedroomScene', { from: 'town' }),
      },
      {
        id: 'plaza-flower',
        x: 201,
        y: 201,
        width: 16,
        height: 16,
        range: 25,
        label: useGameStore.getState().collectedItems.includes('plazaFlower')
          ? 'Observar el brillo'
          : 'Recoger la flor brillante',
        reward: 'plazaFlower',
        once: true,
        action: () => {
          this.inventorySystem.collect('plazaFlower');
          this.dialogueSystem.open('plazaFlower');
        },
      },
    ];

    specs
      .map((spec) => new InteractiveObject(this, spec))
      .forEach((object) => this.interactionSystem?.register(object));
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
