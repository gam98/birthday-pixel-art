import type { PointerEvent } from 'react';
import { virtualControls } from '../../game/systems/VirtualControls';

type Direction = 'up' | 'down' | 'left' | 'right';

export function MobileControls() {
  const handleDirection = (direction: Direction, pressed: boolean) => (event: PointerEvent) => {
    event.preventDefault();
    virtualControls.setDirection(direction, pressed);
    if (pressed) event.currentTarget.setPointerCapture(event.pointerId);
  };

  return (
    <div className="mobile-controls" aria-label="Controles táctiles">
      <div className="mobile-dpad">
        <button
          className="mobile-dpad__up"
          type="button"
          aria-label="Mover arriba"
          onPointerDown={handleDirection('up', true)}
          onPointerUp={handleDirection('up', false)}
          onPointerCancel={handleDirection('up', false)}
        >
          ▲
        </button>
        <button
          className="mobile-dpad__left"
          type="button"
          aria-label="Mover a la izquierda"
          onPointerDown={handleDirection('left', true)}
          onPointerUp={handleDirection('left', false)}
          onPointerCancel={handleDirection('left', false)}
        >
          ◀
        </button>
        <span className="mobile-dpad__center" aria-hidden="true" />
        <button
          className="mobile-dpad__right"
          type="button"
          aria-label="Mover a la derecha"
          onPointerDown={handleDirection('right', true)}
          onPointerUp={handleDirection('right', false)}
          onPointerCancel={handleDirection('right', false)}
        >
          ▶
        </button>
        <button
          className="mobile-dpad__down"
          type="button"
          aria-label="Mover abajo"
          onPointerDown={handleDirection('down', true)}
          onPointerUp={handleDirection('down', false)}
          onPointerCancel={handleDirection('down', false)}
        >
          ▼
        </button>
      </div>
      <button
        className="mobile-interact"
        type="button"
        onPointerDown={(event) => {
          event.preventDefault();
          virtualControls.requestInteraction();
        }}
        aria-label="Interactuar"
      >
        E<span>Interactuar</span>
      </button>
    </div>
  );
}
