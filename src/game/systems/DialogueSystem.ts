import { dialogues } from '../../data/dialogues';
import { eventBus } from './EventBus';
import { GAME_EVENTS } from '../types/events';

export type DialogueId = keyof typeof dialogues;

export class DialogueSystem {
  open(dialogueId: DialogueId): void {
    const dialogue = dialogues[dialogueId];
    if (!dialogue) throw new Error(`No existe el diálogo: ${String(dialogueId)}`);
    eventBus.emit(GAME_EVENTS.OPEN_DIALOGUE, dialogue);
  }
}
