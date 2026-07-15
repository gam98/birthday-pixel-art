import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BurgerActivity } from './BurgerActivity';

describe('BurgerActivity', () => {
  it('completa la actividad solamente con el orden correcto', () => {
    const onComplete = vi.fn();
    render(<BurgerActivity onComplete={onComplete} />);

    ['Pan inferior', 'Carne', 'Queso', 'Lechuga', 'Tomate', 'Salsa', 'Pan superior'].forEach(
      (ingredient) => fireEvent.click(screen.getByRole('button', { name: ingredient })),
    );

    expect(onComplete).toHaveBeenCalledOnce();
    expect(screen.getByText('¡Hamburguesa perfecta!')).toBeInTheDocument();
  });
});
