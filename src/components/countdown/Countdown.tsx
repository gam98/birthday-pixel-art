import { gameConfig } from '../../config/gameConfig';
import { useBirthdayCountdown } from '../../hooks/useBirthdayCountdown';

const labels = ['DÍAS', 'HORAS', 'MIN', 'SEG'] as const;

export function Countdown() {
  const countdown = useBirthdayCountdown(gameConfig.birthdayDate);
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  if (countdown.hasArrived) {
    return (
      <div className="birthday-ready" role="status">
        <span aria-hidden="true">✦</span> ¡El día de la aventura llegó!{' '}
        <span aria-hidden="true">✦</span>
      </div>
    );
  }

  return (
    <section className="countdown" aria-label="Cuenta regresiva para el cumpleaños">
      <p className="countdown__eyebrow">FALTAN</p>
      <div className="countdown__grid" aria-live="polite">
        {values.map((value, index) => (
          <div className="countdown__unit" key={labels[index]}>
            <strong>{String(value).padStart(2, '0')}</strong>
            <span>{labels[index]}</span>
          </div>
        ))}
      </div>
      <p className="sr-only">
        {countdown.days} días, {countdown.hours} horas, {countdown.minutes} minutos y{' '}
        {countdown.seconds} segundos.
      </p>
    </section>
  );
}
