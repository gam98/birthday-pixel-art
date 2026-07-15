import type { DialogueSequence } from '../../types/dialogue';
import type { InventoryItem } from '../../types/inventory';
import type { ActivityId } from '../../types/activity';

export type GameSoundKey = 'ui-click' | 'activity-success' | 'pool-shot';

export interface GameEventMap {
  'game-ready': undefined;
  'scene-changed': { scene: string };
  'save-requested': undefined;
  'open-dialogue': DialogueSequence;
  'item-collected': { item: InventoryItem };
  'interaction-changed': { label: string | null };
  'modal-state': { open: boolean };
  'open-activity': { activityId: ActivityId };
  'activity-completed': { activityId: ActivityId };
  'play-sound': { key: GameSoundKey };
}

export const GAME_EVENTS = {
  GAME_READY: 'game-ready',
  SCENE_CHANGED: 'scene-changed',
  SAVE_REQUESTED: 'save-requested',
  OPEN_DIALOGUE: 'open-dialogue',
  OPEN_INVENTORY: 'open-inventory',
  OPEN_MEMORY: 'open-memory',
  ACTIVITY_COMPLETED: 'activity-completed',
  ITEM_COLLECTED: 'item-collected',
  OPEN_FINAL_GIFT: 'open-final-gift',
  INTERACTION_CHANGED: 'interaction-changed',
  MODAL_STATE: 'modal-state',
  OPEN_ACTIVITY: 'open-activity',
  PLAY_SOUND: 'play-sound',
} as const;
