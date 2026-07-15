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
    id: 'starlight',
    title: 'Bajo la misma estrella fugaz',
    year: 2026,
    category: 'Romance',
    icon: '🌠',
    description: 'Dos viajeros persiguen una estrella capaz de guardar deseos.',
    memory:
      'Para recordar esas noches en las que elegimos una película y terminamos hablando de todo.',
    phrase: 'La mejor parte siempre es verla con vos.',
  },
  {
    id: 'moon-train',
    title: 'El tren de medianoche',
    year: 2025,
    category: 'Aventura',
    icon: '🚂',
    description: 'Un tren encantado cruza ciudades que solo aparecen al dormir.',
    memory: 'Una aventura para acompañar con algo rico y una manta.',
    phrase: 'Cualquier destino está bien si vamos juntos.',
  },
  {
    id: 'little-ghost',
    title: 'El fantasma del cine',
    year: 2024,
    category: 'Comedia',
    icon: '👻',
    description: 'Un fantasma cinéfilo intenta salvar su sala favorita.',
    memory: 'Porque reírnos juntos mejora hasta las películas más raras.',
    phrase: 'Prometo compartir los pochoclos.',
  },
  {
    id: 'secret-garden',
    title: 'El jardín de las cartas',
    year: 2026,
    category: 'Fantasía',
    icon: '💌',
    description: 'Cada carta plantada se convierte en un recuerdo vivo.',
    memory: 'Una historia que parece escrita para esta aventura.',
    phrase: 'Hay recuerdos que merecen florecer otra vez.',
  },
];
