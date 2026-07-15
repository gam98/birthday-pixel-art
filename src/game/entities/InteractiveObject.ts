import Phaser from 'phaser';

export interface InteractiveObjectConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: () => void;
  range?: number;
  locked?: boolean;
  prerequisite?: () => boolean;
  reward?: string;
  once?: boolean;
}

export class InteractiveObject extends Phaser.GameObjects.Zone {
  readonly objectId: string;
  readonly interactionLabel: string;
  readonly interactionRange: number;
  readonly reward?: string;
  private readonly action: () => void;
  private readonly prerequisite?: () => boolean;
  private readonly oneShot: boolean;
  private completed = false;
  private locked: boolean;

  constructor(scene: Phaser.Scene, config: InteractiveObjectConfig) {
    super(scene, config.x, config.y, config.width, config.height);
    scene.add.existing(this);
    this.setInteractive({ useHandCursor: true });
    this.objectId = config.id;
    this.interactionLabel = config.label;
    this.interactionRange = config.range ?? 30;
    this.reward = config.reward;
    this.action = config.action;
    this.prerequisite = config.prerequisite;
    this.oneShot = config.once ?? false;
    this.locked = config.locked ?? false;
  }

  canInteract(): boolean {
    return (
      !this.locked &&
      (!this.prerequisite || this.prerequisite()) &&
      !(this.oneShot && this.completed)
    );
  }

  isPlayerNear(player: Phaser.GameObjects.Components.Transform): boolean {
    return (
      Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) <= this.interactionRange
    );
  }

  interact(): void {
    if (!this.canInteract()) return;
    this.action();
    this.completed = true;
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
  }
}
