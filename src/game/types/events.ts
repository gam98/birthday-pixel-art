export interface GameEventMap {
  'game-ready': undefined;
  'scene-changed': { scene: string };
  'save-requested': undefined;
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
} as const;
