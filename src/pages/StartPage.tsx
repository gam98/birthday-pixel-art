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
        <div className="hero-card__content">
          <div className="hero-card__ornament" aria-hidden="true">
            <span>✦</span>
            <span>♥</span>
            <span>✦</span>
          </div>
          <p className="hero-card__for">PARA {gameConfig.personName}</p>
          <h1 id="game-title">{gameConfig.gameTitle}</h1>
          <p className="hero-card__subtitle">Un pequeño mundo creado especialmente para vos.</p>

          <ul className="adventure-preview" aria-label="Contenido de la aventura">
            <li>
              <strong>5</strong>
              <span>lugares</span>
            </li>
            <li>
              <strong>7</strong>
              <span>recuerdos</span>
            </li>
            <li>
              <strong>1</strong>
              <span>regalo final</span>
            </li>
          </ul>

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
                Movete con las flechas o WASD. Presioná B para bailar, G para llamar a Gabi y E para
                interactuar.
              </p>
              <p>En celu usá la cruceta y los botones de acción sobre la pantalla.</p>
            </aside>
          )}
        </div>

        <div className="hero-card__visual" aria-hidden="true">
          <picture>
            <source srcSet="/assets/ui/start-adventure-v2.webp" type="image/webp" />
            <img src="/assets/ui/start-adventure-v2.png" alt="" />
          </picture>
          <div className="hero-card__visual-shade" />
          <div className="hero-card__visual-copy">
            <span>✦ TU HISTORIA COMIENZA ACÁ ✦</span>
            <strong>Explorá · recordá · celebrá</strong>
          </div>
        </div>
      </section>

      <footer>
        Hecho con <PixelIcon name="heart" /> por Gabi y un montón de recuerdos.
      </footer>
    </main>
  );
}
