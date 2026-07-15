import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../config/gameConfig';
import type { ActivityId } from '../../types/activity';
import { InteractiveObject } from '../entities/InteractiveObject';
import { Player } from '../entities/Player';
import { eventBus } from '../systems/EventBus';
import { InteractionSystem } from '../systems/InteractionSystem';
import { GAME_EVENTS } from '../types/events';

interface ActivitySceneConfig {
  sceneKey: string;
  activityId: ActivityId;
  backgroundKey: string;
  interactionLabel: string;
  interactionPosition: { x: number; y: number; range?: number };
  collisions: Array<{ x: number; y: number; width: number; height: number }>;
}

export abstract class BaseActivityScene extends Phaser.Scene {
  private player?: Player;
  private interactionSystem?: InteractionSystem;

  protected constructor(private readonly activityConfig: ActivitySceneConfig) {
    super(activityConfig.sceneKey);
  }

  create(): void {
    this.physics.world.setBounds(6, 6, GAME_WIDTH - 12, GAME_HEIGHT - 12);
    this.add
      .image(0, 0, this.activityConfig.backgroundKey)
      .setOrigin(0)
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

    const obstacles = this.physics.add.staticGroup();
    this.activityConfig.collisions.forEach((collision) =>
      this.addCollisionZone(obstacles, collision),
    );

    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT - 29);
    this.physics.add.collider(this.player, obstacles);
    this.interactionSystem = new InteractionSystem(this, this.player);
    this.createInteractions();

    eventBus.emit(GAME_EVENTS.SCENE_CHANGED, { scene: this.scene.key });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.interactionSystem?.destroy());
  }

  update(): void {
    this.player?.update();
    this.interactionSystem?.update();
  }

  private createInteractions(): void {
    if (!this.interactionSystem) return;
    const activity = new InteractiveObject(this, {
      id: `${this.activityConfig.activityId}-activity`,
      x: this.activityConfig.interactionPosition.x,
      y: this.activityConfig.interactionPosition.y,
      width: 60,
      height: 24,
      range: this.activityConfig.interactionPosition.range ?? 36,
      label: this.activityConfig.interactionLabel,
      action: () =>
        eventBus.emit(GAME_EVENTS.OPEN_ACTIVITY, {
          activityId: this.activityConfig.activityId,
        }),
    });
    const exit = new InteractiveObject(this, {
      id: `${this.activityConfig.activityId}-exit`,
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 7,
      width: 48,
      height: 14,
      range: 25,
      label: 'Volver a la plaza',
      action: () => this.scene.start('TownScene'),
    });
    this.interactionSystem.register(activity);
    this.interactionSystem.register(exit);
  }

  private addCollisionZone(
    group: Phaser.Physics.Arcade.StaticGroup,
    { x, y, width, height }: { x: number; y: number; width: number; height: number },
  ): void {
    const zone = this.add.zone(x, y, width, height).setOrigin(0);
    this.physics.add.existing(zone, true);
    group.add(zone);
  }
}
