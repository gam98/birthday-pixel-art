import { GameCanvas } from '../components/game/GameCanvas';
import { PixelIcon } from '../components/ui/PixelIcon';
import { gameConfig } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';

export function GamePage() {
  const setScreen = useGameStore((state) => state.setScreen);

  return (
    <main className="game-page">
      <header className="game-toolbar">
        <button
          type="button"
          onClick={() => setScreen('start')}
          aria-label="Volver al menú inicial"
        >
          <PixelIcon name="back" /> Menú
        </button>
        <p>La aventura comienza en casa</p>
        <span className="game-toolbar__keys">WASD / ↑↓←→</span>
      </header>
      <section className="game-shell">
        <div className="game-frame">
          <GameCanvas />
          <div className="game-label game-label--room" aria-hidden="true">
            <span>✦</span> Habitación de {gameConfig.playerName} <span>✦</span>
          </div>
          <div className="game-label game-label--controls">
            <kbd>WASD</kbd>
            <span className="game-label__separator" aria-hidden="true" />
            <span>Flechas</span>
            <span className="game-label__hint">Explorá la habitación</span>
          </div>
        </div>
      </section>
      <p className="orientation-hint" role="note">
        Para disfrutar mejor la aventura, girá el teléfono a horizontal.
      </p>
    </main>
  );
}
