export interface MemoryData {
  id: string;
  name: string;
  icon: string;
  date: string;
  place: string;
  description: string;
  position: { left: string; top: string };
}

export const memories: MemoryData[] = [
  {
    id: 'memoryPhoto',
    name: 'Una fotografía',
    icon: '📷',
    date: 'Un día para guardar',
    place: 'Nuestro rincón favorito',
    description: 'Una imagen pequeña que guarda una felicidad enorme.',
    position: { left: '15%', top: '28%' },
  },
  {
    id: 'memoryTicket',
    name: 'Entrada de cine',
    icon: '🎟️',
    date: 'Noche de película',
    place: 'El cine de la plaza',
    description: 'La película terminó, pero esa salida todavía sigue con nosotros.',
    position: { left: '16%', top: '71%' },
  },
  {
    id: 'memoryPoolBall',
    name: 'Bola de billar',
    icon: '🎱',
    date: 'Una partida inolvidable',
    place: 'La mesa del rincón',
    description: 'No importa quién ganó; importa cuánto nos reímos.',
    position: { left: '73%', top: '25%' },
  },
  {
    id: 'memoryWrapper',
    name: 'Envoltorio de helado',
    icon: '🍦',
    date: 'Una tarde dulce',
    place: 'Cerca de las flores',
    description: 'Elegir sabores también puede convertirse en un recuerdo.',
    position: { left: '70%', top: '81%' },
  },
  {
    id: 'memoryBurger',
    name: 'Mini hamburguesa',
    icon: '🍔',
    date: 'Nuestra salida favorita',
    place: 'El mantel a cuadros',
    description: 'Esta hamburguesa no es tan especial como nuestras salidas, pero casi.',
    position: { left: '85%', top: '61%' },
  },
  {
    id: 'memoryFlower',
    name: 'Flor luminosa',
    icon: '🌸',
    date: 'Hoy',
    place: 'El sendero iluminado',
    description: 'Una flor que aprendió a brillar cuando llegaste.',
    position: { left: '27%', top: '82%' },
  },
  {
    id: 'memoryLetter',
    name: 'Carta sellada',
    icon: '💌',
    date: 'Para siempre',
    place: 'Junto al corazón de agua',
    description:
      'Todavía no es la carta final, pero contiene una pista: volvé a casa con las cuatro piezas.',
    position: { left: '66%', top: '65%' },
  },
];
