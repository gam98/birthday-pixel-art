import type { InventoryItem } from '../types/inventory';
import { memories } from './memories';

const memoryInventoryItems = Object.fromEntries(
  memories.map((memory) => [
    memory.id,
    {
      id: memory.id,
      name: memory.name,
      description: `${memory.place} — ${memory.description}`,
      icon: memory.icon,
      category: 'memory' as const,
    },
  ]),
) satisfies Record<string, InventoryItem>;

export const inventoryItems: Record<string, InventoryItem> = {
  welcomeLetter: {
    id: 'welcomeLetter',
    name: 'Carta de bienvenida',
    description: 'La carta que dio inicio a esta aventura entre recuerdos.',
    icon: '💌',
    category: 'special',
  },
  plazaFlower: {
    id: 'plazaFlower',
    name: 'Flor de la plaza',
    description: 'Una flor brillante que parece guardar un recuerdo todavía dormido.',
    icon: '🌸',
    category: 'memory',
  },
  keyBurger: {
    id: 'keyBurger',
    name: 'Pieza de llave: Hamburguesa',
    description: 'Conseguida al preparar la hamburguesa perfecta.',
    icon: '🗝️',
    category: 'key',
  },
  keyIceCream: {
    id: 'keyIceCream',
    name: 'Pieza de llave: Helado',
    description: 'Conseguida al crear una combinación deliciosa.',
    icon: '🗝️',
    category: 'key',
  },
  keyCinema: {
    id: 'keyCinema',
    name: 'Pieza de llave: Cine',
    description: 'Conseguida al elegir la próxima película.',
    icon: '🗝️',
    category: 'key',
  },
  keyPool: {
    id: 'keyPool',
    name: 'Pieza de llave: Billar',
    description: 'Conseguida con el tiro del corazón.',
    icon: '🗝️',
    category: 'key',
  },
  ...memoryInventoryItems,
};
