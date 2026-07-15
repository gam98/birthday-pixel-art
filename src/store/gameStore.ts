import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AudioPreferences, Screen } from '../types/game';
import type { ActivityId } from '../types/activity';
import { activities } from '../data/activities';

export interface GameProgress {
  visitedScenes: string[];
  inventory: Record<string, number>;
  collectedItems: string[];
  dialoguesSeen: string[];
  activitiesCompleted: ActivityId[];
  keyPieces: string[];
  selectedMovie: string | null;
  selectedFlavors: string[];
  memoriesFound: string[];
  poolShots: number;
  burgerAttempts: number;
}

interface GameState extends AudioPreferences, GameProgress {
  screen: Screen;
  hasStarted: boolean;
  lastScene: string;
  setScreen: (screen: Screen) => void;
  startNewGame: () => void;
  continueGame: () => void;
  setLastScene: (scene: string) => void;
  collectItem: (itemId: string) => void;
  markDialogueSeen: (dialogueId: string) => void;
  completeActivity: (activityId: ActivityId) => void;
  setSelectedMovie: (movieId: string) => void;
  setSelectedFlavors: (flavorIds: string[]) => void;
  findMemory: (memoryId: string) => void;
  recordPoolShot: () => void;
  recordBurgerAttempt: () => void;
  toggleMusic: () => void;
  toggleSound: () => void;
  resetProgress: () => void;
}

const initialPreferences: AudioPreferences = {
  musicEnabled: true,
  soundEnabled: true,
  musicVolume: 0.65,
  soundVolume: 0.8,
};

export const initialProgress: GameProgress = {
  visitedScenes: [],
  inventory: {},
  collectedItems: [],
  dialoguesSeen: [],
  activitiesCompleted: [],
  keyPieces: [],
  selectedMovie: null,
  selectedFlavors: [],
  memoriesFound: [],
  poolShots: 0,
  burgerAttempts: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialPreferences,
      screen: 'start',
      hasStarted: false,
      lastScene: 'BedroomScene',
      ...initialProgress,
      setScreen: (screen) => set({ screen }),
      startNewGame: () =>
        set({
          hasStarted: true,
          lastScene: 'BedroomScene',
          screen: 'game',
          ...initialProgress,
        }),
      continueGame: () => set((state) => ({ screen: state.hasStarted ? 'game' : 'start' })),
      setLastScene: (lastScene) =>
        set((state) => ({
          lastScene,
          hasStarted: true,
          visitedScenes: state.visitedScenes.includes(lastScene)
            ? state.visitedScenes
            : [...state.visitedScenes, lastScene],
        })),
      collectItem: (itemId) =>
        set((state) => {
          if (state.collectedItems.includes(itemId)) return state;
          return {
            collectedItems: [...state.collectedItems, itemId],
            inventory: { ...state.inventory, [itemId]: (state.inventory[itemId] ?? 0) + 1 },
          };
        }),
      markDialogueSeen: (dialogueId) =>
        set((state) => ({
          dialoguesSeen: state.dialoguesSeen.includes(dialogueId)
            ? state.dialoguesSeen
            : [...state.dialoguesSeen, dialogueId],
        })),
      completeActivity: (activityId) =>
        set((state) => {
          if (state.activitiesCompleted.includes(activityId)) return state;
          const keyPieceId = activities[activityId].keyPieceId;
          return {
            activitiesCompleted: [...state.activitiesCompleted, activityId],
            keyPieces:
              keyPieceId && !state.keyPieces.includes(keyPieceId)
                ? [...state.keyPieces, keyPieceId]
                : state.keyPieces,
            collectedItems:
              keyPieceId && !state.collectedItems.includes(keyPieceId)
                ? [...state.collectedItems, keyPieceId]
                : state.collectedItems,
            inventory: keyPieceId ? { ...state.inventory, [keyPieceId]: 1 } : state.inventory,
          };
        }),
      setSelectedMovie: (selectedMovie) => set({ selectedMovie }),
      setSelectedFlavors: (selectedFlavors) => set({ selectedFlavors }),
      findMemory: (memoryId) =>
        set((state) => {
          if (state.memoriesFound.includes(memoryId)) return state;
          return {
            memoriesFound: [...state.memoriesFound, memoryId],
            collectedItems: state.collectedItems.includes(memoryId)
              ? state.collectedItems
              : [...state.collectedItems, memoryId],
            inventory: { ...state.inventory, [memoryId]: 1 },
          };
        }),
      recordPoolShot: () => set((state) => ({ poolShots: state.poolShots + 1 })),
      recordBurgerAttempt: () => set((state) => ({ burgerAttempts: state.burgerAttempts + 1 })),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      resetProgress: () =>
        set((state) => ({
          screen: 'start',
          hasStarted: false,
          lastScene: 'BedroomScene',
          ...initialProgress,
          musicEnabled: state.musicEnabled,
          soundEnabled: state.soundEnabled,
          musicVolume: state.musicVolume,
          soundVolume: state.soundVolume,
        })),
    }),
    {
      name: 'birthday-adventure-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hasStarted: state.hasStarted,
        lastScene: state.lastScene,
        musicEnabled: state.musicEnabled,
        soundEnabled: state.soundEnabled,
        musicVolume: state.musicVolume,
        soundVolume: state.soundVolume,
        visitedScenes: state.visitedScenes,
        inventory: state.inventory,
        collectedItems: state.collectedItems,
        dialoguesSeen: state.dialoguesSeen,
        activitiesCompleted: state.activitiesCompleted,
        keyPieces: state.keyPieces,
        selectedMovie: state.selectedMovie,
        selectedFlavors: state.selectedFlavors,
        memoriesFound: state.memoriesFound,
        poolShots: state.poolShots,
        burgerAttempts: state.burgerAttempts,
      }),
    },
  ),
);
