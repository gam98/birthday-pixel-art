import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { virtualControls } from '../../game/systems/VirtualControls';
import { MobileControls } from './MobileControls';

describe('MobileControls', () => {
  afterEach(() => virtualControls.reset());

  it('envía una solicitud de baile desde el control táctil', () => {
    render(<MobileControls />);

    fireEvent.pointerDown(screen.getByRole('button', { name: /bailar/i }));

    expect(virtualControls.consumeDance()).toBe(true);
    expect(virtualControls.consumeDance()).toBe(false);
  });

  it('envía una solicitud para llamar a Gabi', () => {
    render(<MobileControls />);

    fireEvent.pointerDown(screen.getByRole('button', { name: /llamar a gabi/i }));

    expect(virtualControls.consumeCallGabi()).toBe(true);
    expect(virtualControls.consumeCallGabi()).toBe(false);
  });
});
