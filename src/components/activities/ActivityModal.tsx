import { useEffect, useRef } from 'react';
import { activities } from '../../data/activities';
import type { ActivityId } from '../../types/activity';
import { BurgerActivity } from './BurgerActivity';
import { CinemaActivity } from './CinemaActivity';
import { IceCreamActivity } from './IceCreamActivity';
import { MemoryGardenActivity } from './MemoryGardenActivity';
import { PoolActivity } from './PoolActivity';
import type { GameSoundKey } from '../../game/types/events';

interface ActivityModalProps {
  activityId: ActivityId;
  onComplete: (activityId: ActivityId) => void;
  onClose: () => void;
  onSound: (key: GameSoundKey) => void;
}

const instructions: Record<ActivityId, string> = {
  burger: 'Elegí los siete ingredientes en el orden correcto.',
  iceCream: 'Combiná hasta tres sabores para crear tu helado.',
  cinema: 'Explorá la cartelera y elegí nuestra próxima película.',
  pool: 'Detené el tiro en la zona dorada. Tenés tres intentos.',
  memoryGarden: 'Encontrá al menos cinco de los siete recuerdos escondidos.',
};

export function ActivityModal({ activityId, onComplete, onClose, onSound }: ActivityModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const activity = activities[activityId];
  const completeWithSound = () => {
    onSound('activity-success');
    onComplete(activityId);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(onClose, 1400);
  };

  useEffect(() => {
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop modal-backdrop--activity">
      <section
        className={`activity-modal activity-modal--${activityId}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-title"
      >
        <header className="activity-modal__header">
          <div className="activity-modal__title">
            <span aria-hidden="true">{activity.icon}</span>
            <div>
              <small>ACTIVIDAD</small>
              <h2 id="activity-title">{activity.name}</h2>
              <p>{instructions[activityId]}</p>
            </div>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Cerrar actividad">
            ×
          </button>
        </header>
        <div className="activity-modal__body">
          {activityId === 'burger' && <BurgerActivity onComplete={completeWithSound} />}
          {activityId === 'iceCream' && <IceCreamActivity onComplete={completeWithSound} />}
          {activityId === 'cinema' && <CinemaActivity onComplete={completeWithSound} />}
          {activityId === 'pool' && (
            <PoolActivity onComplete={completeWithSound} onSound={onSound} />
          )}
          {activityId === 'memoryGarden' && <MemoryGardenActivity onComplete={completeWithSound} />}
        </div>
      </section>
    </div>
  );
}
