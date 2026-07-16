export interface IceCreamFlavor {
  id: string;
  name: string;
  color: string;
  accent: string;
  asset: string;
  phrase: string;
}

export const iceCreamFlavors: IceCreamFlavor[] = [
  {
    id: 'cherry',
    name: 'Cereza',
    color: '#ef7f8f',
    accent: '#af354f',
    asset: '/assets/activities/ice-cream/cherry-v2.png',
    phrase: 'Dulce, frutal y con un toque alegre.',
  },
  {
    id: 'tramontana',
    name: 'Tramontana',
    color: '#f5dcaa',
    accent: '#b98142',
    asset: '/assets/activities/ice-cream/tramontana-v2.png',
    phrase: 'Crema, caramelo y chocolate para un plan perfecto.',
  },
  {
    id: 'chocolateAlmond',
    name: 'Chocolate con almendras',
    color: '#874723',
    accent: '#4f281e',
    asset: '/assets/activities/ice-cream/chocolate-almond-v2.png',
    phrase: 'Chocolate intenso con pedacitos crocantes.',
  },
  {
    id: 'mint',
    name: 'Menta granizada',
    color: '#8ecbae',
    accent: '#487c65',
    asset: '/assets/activities/ice-cream/mint-chip-v2.png',
    phrase: 'Fresca, inesperada y llena de pequeñas sorpresas.',
  },
  {
    id: 'russian',
    name: 'Rusa',
    color: '#f4dfad',
    accent: '#b8864c',
    asset: '/assets/activities/ice-cream/russian-cream-v2.png',
    phrase: 'Cremosa y delicada, con pedacitos de nuez.',
  },
];

export const secretFlavorCombination = ['cherry', 'tramontana', 'russian'];
