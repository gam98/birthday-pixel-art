import { useMemo, useState } from 'react';
import { iceCreamFlavors, secretFlavorCombination } from '../../data/iceCreamFlavors';
import { useGameStore } from '../../store/gameStore';
import { ActivitySuccess } from './ActivitySuccess';
import type { ActivityComponentProps } from './types';

export function IceCreamActivity({ onComplete }: ActivityComponentProps) {
  const previous = useGameStore((state) => state.selectedFlavors);
  const setSelectedFlavors = useGameStore((state) => state.setSelectedFlavors);
  const [selected, setSelected] = useState<string[]>(() =>
    previous.filter((id) => iceCreamFlavors.some((flavor) => flavor.id === id)).slice(0, 3),
  );
  const [completed, setCompleted] = useState(false);
  const isSecret = useMemo(
    () =>
      selected.length === secretFlavorCombination.length &&
      secretFlavorCombination.every((flavor) => selected.includes(flavor)),
    [selected],
  );

  const toggleFlavor = (flavorId: string) => {
    setSelected((current) =>
      current.includes(flavorId)
        ? current.filter((id) => id !== flavorId)
        : current.length < 3
          ? [...current, flavorId]
          : current,
    );
  };

  const finish = () => {
    if (selected.length === 0) return;
    setSelectedFlavors(selected);
    setCompleted(true);
    onComplete();
  };

  if (completed) {
    return (
      <ActivitySuccess
        icon="🍦"
        imageSrc="/assets/activities/ice-cream/complete-cone-v2.png"
        title="¡Tu helado está listo!"
        message={
          isSecret
            ? 'Combinación secreta: dulce, intensa y alegre. Exactamente como nuestros mejores planes.'
            : 'Una combinación única, elegida especialmente por vos.'
        }
      />
    );
  }

  return (
    <div className="activity-layout activity-layout--ice">
      <section className="ice-cream-preview">
        <div className="ice-cream-scoops" aria-label={`${selected.length} sabores elegidos`}>
          {selected.includes('cherry') && (
            <img
              className="ice-cream-topper"
              src="/assets/activities/ice-cream/cherries-v2.png"
              alt=""
              aria-hidden="true"
            />
          )}
          {[...selected].reverse().map((id) => {
            const flavor = iceCreamFlavors.find((item) => item.id === id);
            return (
              <span key={id} className="ice-cream-scoop" title={flavor?.name}>
                {flavor && <img src={flavor.asset} alt="" />}
              </span>
            );
          })}
        </div>
        <img
          className="ice-cream-cone"
          src="/assets/activities/ice-cream/cone-v2.png"
          alt=""
          aria-hidden="true"
        />
        <p>Elegí hasta tres sabores</p>
      </section>
      <section className="activity-options">
        <div className="flavor-list">
          {iceCreamFlavors.map((flavor) => (
            <button
              type="button"
              key={flavor.id}
              className={selected.includes(flavor.id) ? 'is-selected' : ''}
              onClick={() => toggleFlavor(flavor.id)}
              aria-pressed={selected.includes(flavor.id)}
            >
              <span
                className="flavor-swatch"
                style={{ background: `${flavor.color}33`, borderColor: flavor.accent }}
                aria-hidden="true"
              >
                <img src={flavor.asset} alt="" />
              </span>
              <div>
                <strong>{flavor.name}</strong>
                <small>{flavor.phrase}</small>
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="activity-primary"
          onClick={finish}
          disabled={selected.length === 0}
        >
          Servir este helado
        </button>
      </section>
    </div>
  );
}
