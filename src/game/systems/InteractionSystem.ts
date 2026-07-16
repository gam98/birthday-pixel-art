import Phaser from 'phaser';
import type { Player } from '../entities/Player';
import type { InteractiveObject } from '../entities/InteractiveObject';
import { eventBus } from './EventBus';
import { virtualControls } from './VirtualControls';
import { GAME_EVENTS } from '../types/events';

export class InteractionSystem {
  private readonly interactionKey: Phaser.Input.Keyboard.Key;
  private readonly spaceKey: Phaser.Input.Keyboard.Key;
  private readonly inventoryKey: Phaser.Input.Keyboard.Key;
  private readonly objects: InteractiveObject[] = [];
  private current?: InteractiveObject;
  private suspended = false;

  constructor(
    scene: Phaser.Scene,
    private readonly player: Player,
  ) {
    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('No fue posible crear el sistema de interacción.');
    this.interactionKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.spaceKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.inventoryKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    eventBus.on(GAME_EVENTS.MODAL_STATE, this.handleModalState, this);
  }

  register(object: InteractiveObject): void {
    this.objects.push(object);
    object.on('pointerdown', () => {
      if (!this.suspended && object.isPlayerNear(this.player)) object.interact();
    });
  }

  update(): void {
    if (this.suspended) return;
    const available = this.objects
      .filter((object) => object.canInteract() && object.isPlayerNear(this.player))
      .sort(
        (a, b) =>
          Phaser.Math.Distance.Between(a.x, a.y, this.player.x, this.player.y) -
          Phaser.Math.Distance.Between(b.x, b.y, this.player.x, this.player.y),
      )[0];

    if (available !== this.current) {
      this.current = available;
      eventBus.emit(GAME_EVENTS.INTERACTION_CHANGED, {
        label: available?.interactionLabel ?? null,
      });
    }

    const keyboardInteraction =
      Phaser.Input.Keyboard.JustDown(this.interactionKey) ||
      Phaser.Input.Keyboard.JustDown(this.spaceKey);
    if ((keyboardInteraction || virtualControls.consumeInteraction()) && this.current) {
      this.current.interact();
    }

    if (Phaser.Input.Keyboard.JustDown(this.inventoryKey)) {
      eventBus.emit(GAME_EVENTS.OPEN_INVENTORY);
    }
  }

  destroy(): void {
    eventBus.off(GAME_EVENTS.MODAL_STATE, this.handleModalState, this);
    eventBus.emit(GAME_EVENTS.INTERACTION_CHANGED, { label: null });
  }

  private handleModalState({ open }: { open: boolean }): void {
    this.suspended = open;
    this.player.setControlsEnabled(!open);
    // A React modal can cancel a pressed touch control. Clear every input
    // state on both transitions so no stale key or pointer survives it.
    virtualControls.reset();
    this.interactionKey.reset();
    this.spaceKey.reset();
    this.inventoryKey.reset();
  }
}
