import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ActivitySuccess } from './ActivitySuccess';
import type { ActivityComponentProps } from './types';

export function PoolActivity({ onComplete, onSound }: ActivityComponentProps) {
  const [position, setPosition] = useState(5);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Detené el indicador dentro de la zona dorada.');
  const [completed, setCompleted] = useState(false);
  const direction = useRef(1);
  const recordPoolShot = useGameStore((state) => state.recordPoolShot);

  useEffect(() => {
    if (completed) return;
    const timer = window.setInterval(() => {
      setPosition((current) => {
        if (current >= 98) direction.current = -1;
        if (current <= 2) direction.current = 1;
        return current + direction.current * 3;
      });
    }, 35);
    return () => window.clearInterval(timer);
  }, [completed]);

  const shoot = () => {
    onSound?.('pool-shot');
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);
    recordPoolShot();
    const hit = (position >= 43 && position <= 57) || nextAttempt >= 3;
    if (hit) {
      setCompleted(true);
      onComplete();
    } else {
      setMessage(
        position < 43
          ? 'Quedó corto. Esperá un poquito más.'
          : 'Demasiada potencia. Probá más cerca del centro.',
      );
    }
  };

  if (completed) {
    return (
      <ActivitySuccess
        icon="🎱"
        title="¡La bola entró!"
        message={
          attempts >= 3
            ? 'En el último intento, el corazón de la mesa decidió ayudarte un poquito.'
            : 'Un tiro perfecto, directo al corazón.'
        }
      />
    );
  }

  return (
    <div className="pool-game">
      <div className="pool-table-mini" aria-label="Mesa de billar simplificada">
        <span className="pool-pocket" />
        <span className="pool-ball" style={{ left: `${position}%` }}>
          ●
        </span>
      </div>
      <div className="power-meter">
        <span className="power-meter__target" />
        <span className="power-meter__indicator" style={{ left: `${position}%` }} />
      </div>
      <p>{message}</p>
      <strong>Intentos: {attempts}/3</strong>
      <button type="button" className="activity-primary" onClick={shoot}>
        Tirar ahora
      </button>
    </div>
  );
}
