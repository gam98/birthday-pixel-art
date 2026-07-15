import type { ActivityDefinition, ActivityId } from '../types/activity';

export const activities: Record<ActivityId, ActivityDefinition> = {
  burger: {
    id: 'burger',
    name: 'Hamburguesa perfecta',
    scene: 'BurgerScene',
    icon: '🍔',
    keyPieceId: 'keyBurger',
  },
  iceCream: {
    id: 'iceCream',
    name: 'Helado de recuerdos',
    scene: 'IceCreamScene',
    icon: '🍦',
    keyPieceId: 'keyIceCream',
  },
  cinema: {
    id: 'cinema',
    name: 'Nuestra próxima película',
    scene: 'CinemaScene',
    icon: '🎬',
    keyPieceId: 'keyCinema',
  },
  pool: {
    id: 'pool',
    name: 'Tiro del corazón',
    scene: 'PoolScene',
    icon: '🎱',
    keyPieceId: 'keyPool',
  },
  memoryGarden: {
    id: 'memoryGarden',
    name: 'Jardín de recuerdos',
    scene: 'MemoryGardenScene',
    icon: '🌷',
  },
};

export const keyActivityIds: ActivityId[] = ['burger', 'iceCream', 'cinema', 'pool'];
