import { useGameStore } from '../../store/gameStore';
import { PixelIcon } from '../ui/PixelIcon';

export function AudioControls() {
  const musicEnabled = useGameStore((state) => state.musicEnabled);
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleMusic = useGameStore((state) => state.toggleMusic);
  const toggleSound = useGameStore((state) => state.toggleSound);

  return (
    <div className="audio-controls" aria-label="Configuración de audio">
      <button
        className="icon-button"
        type="button"
        onClick={toggleMusic}
        aria-label={musicEnabled ? 'Desactivar música' : 'Activar música'}
        aria-pressed={musicEnabled}
        title={musicEnabled ? 'Música activada' : 'Música desactivada'}
      >
        <PixelIcon name="music" />
        {!musicEnabled && <span className="icon-button__slash" />}
      </button>
      <button
        className="icon-button"
        type="button"
        onClick={toggleSound}
        aria-label={soundEnabled ? 'Desactivar efectos' : 'Activar efectos'}
        aria-pressed={soundEnabled}
        title={soundEnabled ? 'Efectos activados' : 'Efectos desactivados'}
      >
        <PixelIcon name="sound" />
        {!soundEnabled && <span className="icon-button__slash" />}
      </button>
    </div>
  );
}
