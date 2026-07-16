import { useCallback, useEffect, useRef, useState } from 'react';
import { eventBus } from '../game/systems/EventBus';
import { GAME_EVENTS } from '../game/types/events';
import { useGameStore } from '../store/gameStore';
import type { DialogueChoice, DialogueSequence } from '../types/dialogue';
import type { InventoryItem } from '../types/inventory';
import { gameConfig } from '../config/gameConfig';
import type { ActivityId } from '../types/activity';
import type { GameSoundKey } from '../game/types/events';

interface ActiveDialogue {
  sequence: DialogueSequence;
  lineIndex: number;
}

interface GabiCallout {
  phrase: string;
  callId: number;
}

const sceneTitles: Record<string, string> = {
  BedroomScene: `Habitación de ${gameConfig.playerName}`,
  TownScene: 'Plaza de los recuerdos',
  BurgerScene: 'Hamburguesería del corazón',
  IceCreamScene: 'Heladería de los sabores',
  CinemaScene: 'Cine de nuestros recuerdos',
  PoolScene: 'Salón del tiro perfecto',
  MemoryGardenScene: 'Jardín de recuerdos',
};

export function useGameBridge() {
  const [dialogue, setDialogue] = useState<ActiveDialogue | null>(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [interactionLabel, setInteractionLabel] = useState<string | null>(null);
  const [sceneTitle, setSceneTitle] = useState(
    () => sceneTitles[useGameStore.getState().lastScene] ?? 'Nuestra aventura',
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<ActivityId | null>(null);
  const [gabiCallout, setGabiCallout] = useState<GabiCallout | null>(null);
  const saveTimer = useRef<number | null>(null);
  const gabiTimer = useRef<number | null>(null);
  const gabiCallId = useRef(0);
  const collectItem = useGameStore((state) => state.collectItem);
  const markDialogueSeen = useGameStore((state) => state.markDialogueSeen);
  const completeActivity = useGameStore((state) => state.completeActivity);

  const showSaved = useCallback((message = 'Progreso guardado') => {
    setSaveMessage(message);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setSaveMessage(null), 1800);
  }, []);

  const setModalState = useCallback((open: boolean) => {
    eventBus.emit(GAME_EVENTS.MODAL_STATE, { open });
  }, []);

  useEffect(() => {
    const openDialogue = (sequence: DialogueSequence) => {
      setInventoryOpen(false);
      setDialogue({ sequence, lineIndex: 0 });
    };
    const openInventory = () => {
      setDialogue(null);
      setInventoryOpen(true);
    };
    const onInteractionChanged = ({ label }: { label: string | null }) =>
      setInteractionLabel(label);
    const onSceneChanged = ({ scene }: { scene: string }) => {
      setSceneTitle(sceneTitles[scene] ?? 'Nuestra aventura');
      showSaved();
    };
    const onItemCollected = ({ item }: { item: InventoryItem }) => {
      collectItem(item.id);
      showSaved(`${item.icon} ${item.name} guardada`);
    };
    const openActivity = ({ activityId }: { activityId: ActivityId }) => {
      setDialogue(null);
      setInventoryOpen(false);
      setActiveActivity(activityId);
    };
    const onActivityCompleted = ({ activityId }: { activityId: ActivityId }) => {
      completeActivity(activityId);
      showSaved('Actividad completada · progreso guardado');
    };
    const onGabiCalled = ({ phrase }: { phrase: string }) => {
      gabiCallId.current += 1;
      setGabiCallout({ phrase, callId: gabiCallId.current });
      if (gabiTimer.current) window.clearTimeout(gabiTimer.current);
      gabiTimer.current = window.setTimeout(() => setGabiCallout(null), 3500);
    };

    eventBus.on(GAME_EVENTS.OPEN_DIALOGUE, openDialogue);
    eventBus.on(GAME_EVENTS.OPEN_INVENTORY, openInventory);
    eventBus.on(GAME_EVENTS.INTERACTION_CHANGED, onInteractionChanged);
    eventBus.on(GAME_EVENTS.SCENE_CHANGED, onSceneChanged);
    eventBus.on(GAME_EVENTS.ITEM_COLLECTED, onItemCollected);
    eventBus.on(GAME_EVENTS.OPEN_ACTIVITY, openActivity);
    eventBus.on(GAME_EVENTS.ACTIVITY_COMPLETED, onActivityCompleted);
    eventBus.on(GAME_EVENTS.SAVE_REQUESTED, showSaved);
    eventBus.on(GAME_EVENTS.GABI_CALLED, onGabiCalled);
    return () => {
      eventBus.off(GAME_EVENTS.OPEN_DIALOGUE, openDialogue);
      eventBus.off(GAME_EVENTS.OPEN_INVENTORY, openInventory);
      eventBus.off(GAME_EVENTS.INTERACTION_CHANGED, onInteractionChanged);
      eventBus.off(GAME_EVENTS.SCENE_CHANGED, onSceneChanged);
      eventBus.off(GAME_EVENTS.ITEM_COLLECTED, onItemCollected);
      eventBus.off(GAME_EVENTS.OPEN_ACTIVITY, openActivity);
      eventBus.off(GAME_EVENTS.ACTIVITY_COMPLETED, onActivityCompleted);
      eventBus.off(GAME_EVENTS.SAVE_REQUESTED, showSaved);
      eventBus.off(GAME_EVENTS.GABI_CALLED, onGabiCalled);
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      if (gabiTimer.current) window.clearTimeout(gabiTimer.current);
    };
  }, [collectItem, completeActivity, setModalState, showSaved]);

  const closeDialogue = useCallback(() => {
    if (dialogue) markDialogueSeen(dialogue.sequence.id);
    setDialogue(null);
    showSaved();
  }, [dialogue, markDialogueSeen, showSaved]);

  const advanceDialogue = useCallback(() => {
    if (!dialogue) return;
    if (dialogue.lineIndex >= dialogue.sequence.lines.length - 1) closeDialogue();
    else setDialogue({ ...dialogue, lineIndex: dialogue.lineIndex + 1 });
  }, [closeDialogue, dialogue]);

  const chooseDialogue = useCallback(
    (choice: DialogueChoice) => {
      if (!dialogue || !choice.response) {
        closeDialogue();
        return;
      }
      const currentLine = dialogue.sequence.lines[dialogue.lineIndex];
      const sequence: DialogueSequence = {
        ...dialogue.sequence,
        lines: [
          ...dialogue.sequence.lines.slice(0, dialogue.lineIndex + 1),
          {
            speaker: currentLine.speaker,
            portrait: currentLine.portrait,
            text: choice.response,
          },
        ],
      };
      setDialogue({ sequence, lineIndex: dialogue.lineIndex + 1 });
    },
    [closeDialogue, dialogue],
  );

  const closeInventory = useCallback(() => {
    setInventoryOpen(false);
  }, []);

  const openInventory = useCallback(() => {
    eventBus.emit(GAME_EVENTS.OPEN_INVENTORY);
  }, []);

  const completeActiveActivity = useCallback((activityId: ActivityId) => {
    eventBus.emit(GAME_EVENTS.ACTIVITY_COMPLETED, { activityId });
  }, []);

  const closeActivity = useCallback(() => {
    setActiveActivity(null);
  }, []);

  const playSound = useCallback((key: GameSoundKey) => {
    eventBus.emit(GAME_EVENTS.PLAY_SOUND, { key });
  }, []);

  const hasOpenModal = Boolean(dialogue || inventoryOpen || activeActivity);

  // React state is the source of truth for the overlay. Deriving the Phaser
  // input lock from it prevents a missed imperative unlock from leaving the
  // player frozen after a dialogue, inventory or activity is dismissed.
  useEffect(() => {
    setModalState(hasOpenModal);
  }, [hasOpenModal, setModalState]);

  // The canvas can outlive a page transition for one render. Always release
  // its input lock when this bridge unmounts so a return to the game is safe.
  useEffect(
    () => () => {
      setModalState(false);
    },
    [setModalState],
  );

  return {
    dialogue,
    inventoryOpen,
    interactionLabel,
    sceneTitle,
    saveMessage,
    activeActivity,
    gabiCallout,
    advanceDialogue,
    chooseDialogue,
    closeDialogue,
    openInventory,
    closeInventory,
    completeActiveActivity,
    closeActivity,
    playSound,
  };
}
