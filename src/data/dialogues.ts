import type { DialogueSequence } from '../types/dialogue';

const guidePortrait = '/assets/characters/garden-guide-v2.png';

export const dialogues: Record<string, DialogueSequence> = {
  welcomeLetter: {
    id: 'welcomeLetter',
    lines: [
      {
        speaker: 'Una carta',
        text: 'El regalo todavía no puede abrirse. Para descubrir lo que contiene, tendrás que recorrer nuestros recuerdos.',
      },
      {
        speaker: 'Una carta',
        text: 'La puerta ya está abierta. Salí a la plaza y buscá las pistas escondidas en cada rincón.',
      },
    ],
  },
  lockedGift: {
    id: 'lockedGift',
    lines: [
      {
        speaker: 'Regalo misterioso',
        text: '¡Ya falta poquito! Este regalo está cuidando una sorpresa muy especial para vos.',
      },
      {
        speaker: 'Regalo misterioso',
        text: 'No hiciste nada mal: va a poder abrirse recién el 14 de agosto. Mientras tanto, podés seguir disfrutando la aventura. ✨',
      },
    ],
  },
  bedroomPhoto: {
    id: 'bedroomPhoto',
    lines: [
      {
        speaker: 'Fotografía',
        text: 'Una habitación puede parecer pequeña, pero alcanza para guardar un mundo entero.',
      },
    ],
  },
  guideWelcome: {
    id: 'guideWelcome',
    lines: [
      {
        speaker: 'Gabi, guardián de recuerdos',
        portrait: guidePortrait,
        text: '¡Llegaste! Esta plaza conecta todos los lugares importantes de la aventura.',
      },
      {
        speaker: 'Gabi',
        portrait: guidePortrait,
        text: 'La hamburguesería, la heladería, el cine, el billar y el jardín guardan una sorpresa diferente.',
      },
      {
        speaker: 'Gabi',
        portrait: guidePortrait,
        text: 'Por ahora recorré la plaza, juntá la flor brillante y familiarizate con el lugar.',
        choices: [
          {
            label: '¡Vamos a explorar!',
            response: 'Esa es la actitud. Los recuerdos ya te están esperando.',
          },
          {
            label: '¿Dónde está mi regalo?',
            response: 'En casa, a salvo. Primero hay que encontrar cómo abrirlo.',
          },
        ],
      },
    ],
  },
  burgerClosed: {
    id: 'burgerClosed',
    lines: [
      { speaker: 'Hamburguesería', text: 'Huele increíble. La cocina abrirá durante la Etapa 3.' },
    ],
  },
  iceCreamClosed: {
    id: 'iceCreamClosed',
    lines: [
      {
        speaker: 'Heladería',
        text: 'Hay sabores esperando una combinación especial. Se habilitará en la Etapa 3.',
      },
    ],
  },
  cinemaClosed: {
    id: 'cinemaClosed',
    lines: [
      {
        speaker: 'Cine',
        text: 'La próxima función todavía se está preparando. Volvé en la Etapa 3.',
      },
    ],
  },
  poolClosed: {
    id: 'poolClosed',
    lines: [
      {
        speaker: 'Salón de billar',
        text: 'Las mesas estarán listas para el desafío de la Etapa 3.',
      },
    ],
  },
  gardenClosed: {
    id: 'gardenClosed',
    lines: [
      {
        speaker: 'Jardín de recuerdos',
        text: 'La reja está cubierta de rosas. Pronto se abrirá para buscar recuerdos escondidos.',
      },
    ],
  },
  plazaFlower: {
    id: 'plazaFlower',
    lines: [
      {
        speaker: 'Flor brillante',
        text: 'Sus pétalos guardan la luz de la plaza. Ahora podés verla cuando quieras desde tu inventario.',
      },
    ],
  },
};
