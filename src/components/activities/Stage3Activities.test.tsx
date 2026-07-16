import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initialProgress, useGameStore } from '../../store/gameStore';
import { CinemaActivity } from './CinemaActivity';
import { IceCreamActivity } from './IceCreamActivity';
import { MemoryGardenActivity } from './MemoryGardenActivity';
import { PoolActivity } from './PoolActivity';

describe('actividades de la Etapa 3', () => {
  beforeEach(() => {
    useGameStore.setState(initialProgress);
  });

  it('guarda los sabores elegidos', () => {
    const onComplete = vi.fn();
    render(<IceCreamActivity onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /Cereza/ }));
    fireEvent.click(screen.getByRole('button', { name: /Servir este helado/ }));
    expect(useGameStore.getState().selectedFlavors).toEqual(['cherry']);
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it('guarda la próxima película', async () => {
    const onComplete = vi.fn();
    render(<CinemaActivity onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /Elegir como próxima película/ }));
    await waitFor(() => expect(useGameStore.getState().selectedMovie).toBe('avatar'));
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it('garantiza que el billar termine en tres intentos o menos', () => {
    const onComplete = vi.fn();
    render(<PoolActivity onComplete={onComplete} />);
    const shoot = screen.getByRole('button', { name: /Tirar ahora/ });
    fireEvent.click(shoot);
    if (!onComplete.mock.calls.length) fireEvent.click(shoot);
    if (!onComplete.mock.calls.length) fireEvent.click(shoot);
    expect(onComplete).toHaveBeenCalledOnce();
    expect(useGameStore.getState().poolShots).toBeLessThanOrEqual(3);
  });

  it('completa el jardín al encontrar cinco recuerdos', async () => {
    const onComplete = vi.fn();
    render(<MemoryGardenActivity onComplete={onComplete} />);
    [
      'Una fotografía',
      'Entrada de cine',
      'Bola de billar',
      'Envoltorio de helado',
      'Mini hamburguesa',
    ].forEach((name) => fireEvent.click(screen.getByRole('button', { name: `Examinar: ${name}` })));
    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce());
    expect(useGameStore.getState().memoriesFound).toHaveLength(5);
  });
});
