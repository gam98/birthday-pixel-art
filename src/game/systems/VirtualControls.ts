type Direction = 'up' | 'down' | 'left' | 'right';

class VirtualControls {
  private directions: Record<Direction, boolean> = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  private interactionRequested = false;
  private danceRequested = false;
  private callGabiRequested = false;

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

  requestDance(): void {
    this.danceRequested = true;
  }

  consumeDance(): boolean {
    const requested = this.danceRequested;
    this.danceRequested = false;
    return requested;
  }

  requestCallGabi(): void {
    this.callGabiRequested = true;
  }

  consumeCallGabi(): boolean {
    const requested = this.callGabiRequested;
    this.callGabiRequested = false;
    return requested;
  }

  reset(): void {
    this.directions = { up: false, down: false, left: false, right: false };
    this.interactionRequested = false;
    this.danceRequested = false;
    this.callGabiRequested = false;
  }
}

export const virtualControls = new VirtualControls();
