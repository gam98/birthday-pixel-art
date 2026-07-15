import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { GamePage } from './GamePage';

vi.mock('../components/game/GameCanvas', () => ({
  GameCanvas: () => <div data-testid="game-canvas" />,
}));

describe('GamePage', () => {
  it('renderiza las etiquetas del juego como HTML nítido fuera del canvas', () => {
    render(<GamePage />);

    expect(screen.getByText(/Habitación de Aventurera/)).toBeInTheDocument();
    expect(screen.getByText('WASD')).toBeInTheDocument();
    expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
  });
});
