import { useState } from 'react';
import { AudioControls } from '../components/settings/AudioControls';
import { Countdown } from '../components/countdown/Countdown';
import { PixelIcon } from '../components/ui/PixelIcon';
import { gameConfig } from '../config/gameConfig';
import { useGameStore } from '../store/gameStore';

export function StartPage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const hasStarted = useGameStore((state) => state.hasStarted);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const continueGame = useGameStore((state) => state.continueGame);
  const resetProgress = useGameStore((state) => state.resetProgress);

  const handleReset = () => {
    if (window.confirm('¿Seguro que querés borrar el progreso guardado?')) resetProgress();
  };

  return (
    <main className="start-page">
      <div className="stars" aria-hidden="true" />
      <AudioControls />

      <section className="hero-card" aria-labelledby="game-title">
        <div className="hero-card__ornament" aria-hidden="true">
          <span>✦</span>
          <span>♥</span>
          <span>✦</span>
        </div>
        <p className="hero-card__for">PARA {gameConfig.personName}</p>
        <h1 id="game-title">{gameConfig.gameTitle}</h1>
        <p className="hero-card__subtitle">Un pequeño mundo creado especialmente para vos.</p>

        <div className="pixel-scene" aria-hidden="true">
          <div className="pixel-scene__moon">♥</div>
          <div className="pixel-scene__cloud pixel-scene__cloud--one" />
          <div className="pixel-scene__cloud pixel-scene__cloud--two" />
          <div className="pixel-scene__hill pixel-scene__hill--back" />
          <div className="pixel-scene__hill pixel-scene__hill--front" />
          <div className="pixel-scene__characters">
            <span>♟</span>
            <b>♥</b>
            <span>♟</span>
          </div>
        </div>

        <Countdown />

        <div className="start-actions">
          <button
            className="pixel-button pixel-button--primary"
            type="button"
            onClick={startNewGame}
          >
            <PixelIcon name="play" /> Comenzar aventura
          </button>
          <button
            className="pixel-button pixel-button--secondary"
            type="button"
            onClick={continueGame}
            disabled={!hasStarted}
            title={
              hasStarted ? 'Continuar desde la habitación' : 'Todavía no hay una partida guardada'
            }
          >
            Continuar partida
          </button>
        </div>

        <div className="secondary-actions">
          <button type="button" onClick={() => setShowInstructions((visible) => !visible)}>
            <PixelIcon name="book" /> Cómo jugar
          </button>
          <button type="button" onClick={handleReset} disabled={!hasStarted}>
            <PixelIcon name="reset" /> Reiniciar progreso
          </button>
        </div>

        {showInstructions && (
          <aside className="instructions" aria-label="Instrucciones">
            <h2>Cómo jugar</h2>
            <p>
              Movete con las flechas o WASD. En esta primera etapa podés recorrer la habitación.
            </p>
            <p>Las interacciones, el inventario y los controles táctiles llegan en la Etapa 2.</p>
          </aside>
        )}
      </section>

      <footer>
        Hecho con <PixelIcon name="heart" /> y un montón de recuerdos.
      </footer>
    </main>
  );
}
