import { calculateCountdown } from './useBirthdayCountdown';

describe('calculateCountdown', () => {
  const birthday = '2026-08-14T00:00:00-03:00';

  it('calcula cada unidad de tiempo sin perder la zona horaria del cumpleaños', () => {
    const result = calculateCountdown(birthday, new Date('2026-08-12T21:29:30-03:00'));
    expect(result).toEqual({
      days: 1,
      hours: 2,
      minutes: 30,
      seconds: 30,
      hasArrived: false,
      hasPassed: false,
    });
  });

  it('marca el momento exacto como llegado pero no pasado', () => {
    const result = calculateCountdown(birthday, new Date(birthday));
    expect(result.hasArrived).toBe(true);
    expect(result.hasPassed).toBe(false);
    expect(result.days).toBe(0);
  });

  it('nunca devuelve unidades negativas después del cumpleaños', () => {
    const result = calculateCountdown(birthday, new Date('2026-08-15T00:00:00-03:00'));
    expect(result).toMatchObject({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    expect(result.hasPassed).toBe(true);
  });

  it('rechaza una fecha inválida', () => {
    expect(() => calculateCountdown('sin-fecha')).toThrow('La fecha de cumpleaños no es válida');
  });
});
