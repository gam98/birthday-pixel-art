import { useEffect, useMemo, useState } from 'react';

export interface BirthdayCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasArrived: boolean;
  hasPassed: boolean;
}

const MILLISECONDS_PER_DAY = 86_400_000;
const MILLISECONDS_PER_HOUR = 3_600_000;
const MILLISECONDS_PER_MINUTE = 60_000;

export function calculateCountdown(targetDate: string, now = new Date()): BirthdayCountdown {
  const targetTime = new Date(targetDate).getTime();

  if (Number.isNaN(targetTime)) {
    throw new Error(`La fecha de cumpleaños no es válida: ${targetDate}`);
  }

  const difference = targetTime - now.getTime();
  const remaining = Math.max(0, difference);

  return {
    days: Math.floor(remaining / MILLISECONDS_PER_DAY),
    hours: Math.floor((remaining % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR),
    minutes: Math.floor((remaining % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
    seconds: Math.floor((remaining % MILLISECONDS_PER_MINUTE) / 1000),
    hasArrived: difference <= 0,
    hasPassed: difference < 0,
  };
}

export function useBirthdayCountdown(targetDate: string): BirthdayCountdown {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => calculateCountdown(targetDate, now), [now, targetDate]);
}
