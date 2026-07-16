import { describe, expect, it, vi } from 'vitest';
import { movies } from '../data/movies';
import { sendMovieSelection } from './movieSelection';

describe('sendMovieSelection', () => {
  it('envía los datos públicos de la película elegida a la Lambda', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await sendMovieSelection(movies[0], 'https://lambda.example.com/movie-selection');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://lambda.example.com/movie-selection',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(
      expect.objectContaining({
        movie: {
          id: 'avatar',
          title: 'Avatar',
          year: 2009,
          category: 'Ciencia ficción',
          description: expect.any(String),
        },
        selectedAt: expect.any(String),
      }),
    );
  });

  it('no bloquea el juego si la URL de la Lambda no fue configurada', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await sendMovieSelection(movies[0], '');

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
