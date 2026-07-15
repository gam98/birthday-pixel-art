type Direction = 'up' | 'down' | 'left' | 'right';

class VirtualControls {
  private directions: Record<Direction, boolean> = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  private interactionRequested = false;

  setDirection(direction: Direction, pressed: boolean): void {
    this.directions[direction] = pressed;
  }

  getAxis(): { x: number; y: number } {
    return {
      x: Number(this.directions.right) - Number(this.directions.left),
      y: Number(this.directions.down) - Number(this.directions.up),
    };
  }

  requestInteraction(): void {
    this.interactionRequested = true;
  }

  consumeInteraction(): boolean {
    const requested = this.interactionRequested;
    this.interactionRequested = false;
    return requested;
  }

  reset(): void {
    this.directions = { up: false, down: false, left: false, right: false };
    this.interactionRequested = false;
  }
}

export const virtualControls = new VirtualControls();
