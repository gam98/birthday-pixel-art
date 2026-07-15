import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { GamePage } from './GamePage';

vi.mock('../components/game/GameCanvas', () => ({
  GameCanvas: () => <div data-testid="game-canvas" />,
}));

vi.mock('../hooks/useGameBridge', () => ({
  useGameBridge: () => ({
    dialogue: null,
    inventoryOpen: false,
    interactionLabel: 'Leer la carta',
    sceneTitle: 'Habitación de Aventurera',
    saveMessage: null,
    activeActivity: null,
    advanceDialogue: vi.fn(),
    chooseDialogue: vi.fn(),
    closeDialogue: vi.fn(),
    openInventory: vi.fn(),
    closeInventory: vi.fn(),
    completeActiveActivity: vi.fn(),
    closeActivity: vi.fn(),
    playSound: vi.fn(),
  }),
}));

describe('GamePage', () => {
  it('renderiza las etiquetas del juego como HTML nítido fuera del canvas', () => {
    render(<GamePage />);

    expect(screen.getAllByText(/Habitación de Aventurera/)).toHaveLength(2);
    expect(screen.getByText('Leer la carta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /abrir inventario/i })).toBeInTheDocument();
    expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
  });
});
