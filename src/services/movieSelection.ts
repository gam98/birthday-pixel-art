import type { MovieOption } from '../data/movies';

export type MovieSelectionPayload = {
  movie: Pick<MovieOption, 'id' | 'title' | 'year' | 'category' | 'description'>;
  selectedAt: string;
};

const endpoint = import.meta.env.VITE_MOVIE_SELECTION_ENDPOINT?.trim();

export async function sendMovieSelection(
  movie: MovieOption,
  requestEndpoint = endpoint,
): Promise<void> {
  // Local development stays playable until the Lambda Function URL is configured.
  if (!requestEndpoint) return;

  const payload: MovieSelectionPayload = {
    movie: {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      category: movie.category,
      description: movie.description,
    },
    selectedAt: new Date().toISOString(),
  };

  const response = await fetch(requestEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('No se pudo enviar la película seleccionada.');
  }
}
