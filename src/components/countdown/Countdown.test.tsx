import { render, screen } from '@testing-library/react';
import { Countdown } from './Countdown';

describe('Countdown', () => {
  it('expone la cuenta regresiva con un nombre accesible', () => {
    render(<Countdown />);
    expect(screen.getByRole('region', { name: /cuenta regresiva/i })).toBeInTheDocument();
    expect(screen.getByText('DÍAS')).toBeInTheDocument();
  });
});
