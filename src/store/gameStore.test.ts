import { beforeEach, describe, expect, it } from 'vitest';
import { initialProgress, useGameStore } from './gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      hasStarted: false,
      lastScene: 'BedroomScene',
      ...initialProgress,
    });
  });

  it('registra escenas visitadas sin duplicarlas', () => {
    useGameStore.getState().setLastScene('TownScene');
    useGameStore.getState().setLastScene('TownScene');
    expect(useGameStore.getState().visitedScenes).toEqual(['TownScene']);
  });

  it('recoge cada objeto una sola vez', () => {
    useGameStore.getState().collectItem('plazaFlower');
    useGameStore.getState().collectItem('plazaFlower');
    expect(useGameStore.getState().inventory.plazaFlower).toBe(1);
    expect(useGameStore.getState().collectedItems).toEqual(['plazaFlower']);
  });

  it('reinicia progreso sin borrar preferencias de audio', () => {
    useGameStore.setState({ musicEnabled: false, collectedItems: ['plazaFlower'] });
    useGameStore.getState().resetProgress();
    expect(useGameStore.getState().collectedItems).toEqual([]);
    expect(useGameStore.getState().musicEnabled).toBe(false);
  });

  it('completa una actividad y entrega una sola pieza de llave', () => {
    useGameStore.getState().completeActivity('burger');
    useGameStore.getState().completeActivity('burger');
    expect(useGameStore.getState().activitiesCompleted).toEqual(['burger']);
    expect(useGameStore.getState().keyPieces).toEqual(['keyBurger']);
    expect(useGameStore.getState().inventory.keyBurger).toBe(1);
  });

  it('guarda elecciones y recuerdos sin duplicarlos', () => {
    useGameStore.getState().setSelectedFlavors(['chocolate', 'strawberry']);
    useGameStore.getState().setSelectedMovie('starlight');
    useGameStore.getState().findMemory('memoryPhoto');
    useGameStore.getState().findMemory('memoryPhoto');
    expect(useGameStore.getState().selectedFlavors).toEqual(['chocolate', 'strawberry']);
    expect(useGameStore.getState().selectedMovie).toBe('starlight');
    expect(useGameStore.getState().memoriesFound).toEqual(['memoryPhoto']);
  });
});
