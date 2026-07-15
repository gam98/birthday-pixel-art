import { useState } from 'react';
import { movies } from '../../data/movies';
import { useGameStore } from '../../store/gameStore';
import { ActivitySuccess } from './ActivitySuccess';
import type { ActivityComponentProps } from './types';

export function CinemaActivity({ onComplete }: ActivityComponentProps) {
  const previous = useGameStore((state) => state.selectedMovie);
  const setSelectedMovie = useGameStore((state) => state.setSelectedMovie);
  const [selectedId, setSelectedId] = useState(previous ?? movies[0].id);
  const [completed, setCompleted] = useState(false);
  const selected = movies.find((movie) => movie.id === selectedId) ?? movies[0];

  const finish = () => {
    setSelectedMovie(selected.id);
    setCompleted(true);
    onComplete();
  };

  if (completed) {
    return (
      <ActivitySuccess
        icon="🎟️"
        title="¡Próxima función elegida!"
        message={`${selected.title} nos espera. Prometo compartir los pochoclos.`}
      />
    );
  }

  return (
    <div className="cinema-picker">
      <div className="movie-posters" role="listbox" aria-label="Películas disponibles">
        {movies.map((movie) => (
          <button
            type="button"
            role="option"
            aria-selected={movie.id === selectedId}
            className={movie.id === selectedId ? 'is-selected' : ''}
            key={movie.id}
            onClick={() => setSelectedId(movie.id)}
          >
            <span aria-hidden="true">{movie.icon}</span>
            <strong>{movie.title}</strong>
            <small>{movie.category}</small>
          </button>
        ))}
      </div>
      <article className="movie-detail">
        <span className="movie-detail__icon" aria-hidden="true">
          {selected.icon}
        </span>
        <div>
          <span>
            {selected.category} · {selected.year}
          </span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <blockquote>{selected.memory}</blockquote>
          <strong>{selected.phrase}</strong>
        </div>
      </article>
      <button type="button" className="activity-primary" onClick={finish}>
        Elegir como próxima película
      </button>
    </div>
  );
}
