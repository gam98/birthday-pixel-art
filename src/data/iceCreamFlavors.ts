export interface IceCreamFlavor {
  id: string;
  name: string;
  color: string;
  accent: string;
  phrase: string;
}

export const iceCreamFlavors: IceCreamFlavor[] = [
  {
    id: 'chocolate',
    name: 'Chocolate',
    color: '#70402f',
    accent: '#3f241f',
    phrase: 'Intenso como las historias que no queremos que terminen.',
  },
  {
    id: 'strawberry',
    name: 'Frutilla',
    color: '#ef8fa4',
    accent: '#bd4f6c',
    phrase: 'Dulce, alegre y un poquito rosado.',
  },
  {
    id: 'vanilla',
    name: 'Vainilla',
    color: '#fff0c9',
    accent: '#d9b777',
    phrase: 'Simple, cálida y perfecta para compartir.',
  },
  {
    id: 'dulceDeLeche',
    name: 'Dulce de leche',
    color: '#d58b4b',
    accent: '#9a5d32',
    phrase: 'Un clásico que siempre sabe a casa.',
  },
  {
    id: 'mint',
    name: 'Menta granizada',
    color: '#8ecbae',
    accent: '#487c65',
    phrase: 'Fresca, inesperada y llena de pequeñas sorpresas.',
  },
];

export const secretFlavorCombination = ['chocolate', 'strawberry', 'dulceDeLeche'];
