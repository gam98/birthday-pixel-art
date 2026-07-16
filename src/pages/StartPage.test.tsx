import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '../store/gameStore';
import { StartPage } from './StartPage';

describe('StartPage', () => {
  beforeEach(() => useGameStore.setState({ hasStarted: false, screen: 'start' }));

  it('presenta la aventura y su nueva escena principal', () => {
    const { container } = render(<StartPage />);

    expect(screen.getByRole('heading', { name: /Una aventura para vos/i })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('regalo final')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Comenzar aventura/i })).toBeInTheDocument();
    expect(container.querySelector('.hero-card__visual img')).toHaveAttribute(
      'src',
      '/assets/ui/start-adventure-v2.png',
    );
  });
});
