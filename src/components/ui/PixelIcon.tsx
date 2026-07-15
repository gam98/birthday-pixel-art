interface PixelIconProps {
  name: 'heart' | 'music' | 'sound' | 'reset' | 'play' | 'book' | 'back';
}

const icons: Record<PixelIconProps['name'], string> = {
  heart: '♥',
  music: '♫',
  sound: '◖',
  reset: '↻',
  play: '▶',
  book: '▤',
  back: '←',
};

export function PixelIcon({ name }: PixelIconProps) {
  return <span aria-hidden="true">{icons[name]}</span>;
}
