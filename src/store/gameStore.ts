import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AudioPreferences, Screen } from '../types/game';

interface GameState extends AudioPreferences {
  screen: Screen;
  hasStarted: boolean;
  lastScene: string;
  setScreen: (screen: Screen) => void;
  startNewGame: () => void;
  continueGame: () => void;
  setLastScene: (scene: string) => void;
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

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialPreferences,
      screen: 'start',
      hasStarted: false,
      lastScene: 'BedroomScene',
      setScreen: (screen) => set({ screen }),
      startNewGame: () => set({ hasStarted: true, lastScene: 'BedroomScene', screen: 'game' }),
      continueGame: () => set((state) => ({ screen: state.hasStarted ? 'game' : 'start' })),
      setLastScene: (lastScene) => set({ lastScene, hasStarted: true }),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      resetProgress: () =>
        set({
          screen: 'start',
          hasStarted: false,
          lastScene: 'BedroomScene',
          ...initialPreferences,
        }),
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
      }),
    },
  ),
);
