import { inventoryItems } from '../../data/inventoryItems';
import { useGameStore } from '../../store/gameStore';
import { eventBus } from './EventBus';
import { GAME_EVENTS } from '../types/events';

export type InventoryItemId = keyof typeof inventoryItems;

export class InventorySystem {
  collect(itemId: InventoryItemId): boolean {
    if (useGameStore.getState().collectedItems.includes(itemId)) return false;
    eventBus.emit(GAME_EVENTS.ITEM_COLLECTED, { item: inventoryItems[itemId] });
    return true;
  }

  open(): void {
    eventBus.emit(GAME_EVENTS.OPEN_INVENTORY);
  }
}
