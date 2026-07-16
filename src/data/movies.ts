export interface MovieOption {
  id: string;
  title: string;
  year: number;
  category: string;
  icon: string;
  description: string;
  memory: string;
  phrase: string;
}

export const movies: MovieOption[] = [
  {
    id: 'avatar',
    title: 'Avatar',
    year: 2009,
    category: 'Ciencia ficción',
    icon: '👽',
    description: 'Un viaje luminoso a Pandora, entre paisajes imposibles y nuevas aventuras.',
    memory: 'Para una noche de película que nos lleve a otro mundo sin salir de casa.',
    phrase: 'La mejor aventura es compartirla con vos.',
  },
  {
    id: 'spiderman',
    title: 'Spiderman',
    year: 2002,
    category: 'Superhéroes',
    icon: '🕷️',
    description: 'Acción entre rascacielos, telarañas y un héroe dispuesto a darlo todo.',
    memory: 'Para elegir una aventura emocionante con pochoclos y manta.',
    phrase: 'Con vos, cualquier ciudad se siente más cerca.',
  },
  {
    id: 'atack-of-titan',
    title: 'Atack of titan',
    year: 2013,
    category: 'Anime',
    icon: '⚔️',
    description: 'Una lucha épica por la libertad tras enormes murallas.',
    memory: 'Para una maratón intensa y muchos comentarios entre episodios.',
    phrase: 'Juntos podemos enfrentar cualquier titán.',
  },
  {
    id: 'obsesion',
    title: 'Obsesion',
    year: 2026,
    category: 'Suspenso',
    icon: '👁️',
    description: 'Un misterio que mantiene la mirada fija en cada detalle.',
    memory: 'Para una noche de suspenso, teorías y algún abrazo durante las escenas tensas.',
    phrase: 'No aparto la mirada cuando la veo con vos.',
  },
];
