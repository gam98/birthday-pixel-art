import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ActivitySuccess } from './ActivitySuccess';
import type { ActivityComponentProps } from './types';

const correctOrder = ['bottomBun', 'patty', 'cheese', 'lettuce', 'tomato', 'sauce', 'topBun'];
const ingredients = [
  { id: 'tomato', name: 'Tomate', asset: '/assets/activities/burger/tomato-v2.png' },
  {
    id: 'bottomBun',
    name: 'Pan inferior',
    asset: '/assets/activities/burger/bottom-bun-v2.png',
  },
  { id: 'sauce', name: 'Salsa', asset: '/assets/activities/burger/sauce-v2.png' },
  { id: 'cheese', name: 'Queso', asset: '/assets/activities/burger/cheese-v2.png' },
  { id: 'topBun', name: 'Pan superior', asset: '/assets/activities/burger/top-bun-v2.png' },
  { id: 'lettuce', name: 'Lechuga', asset: '/assets/activities/burger/lettuce-v2.png' },
  { id: 'patty', name: 'Carne', asset: '/assets/activities/burger/patty-v2.png' },
];

export function BurgerActivity({ onComplete }: ActivityComponentProps) {
  const [stack, setStack] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('Empezá por la base y construí hacia arriba.');
  const [completed, setCompleted] = useState(false);
  const recordAttempt = useGameStore((state) => state.recordBurgerAttempt);

  const selectIngredient = (ingredientId: string) => {
    if (stack.includes(ingredientId) || completed) return;
    const nextStack = [...stack, ingredientId];
    setStack(nextStack);
    setFeedback(`${nextStack.length}/7 ingredientes colocados`);
    if (nextStack.length !== correctOrder.length) return;
    recordAttempt();
    if (nextStack.every((ingredient, index) => ingredient === correctOrder[index])) {
      setCompleted(true);
      onComplete();
    } else {
      setFeedback('Casi. El orden no quedó estable; probá otra vez desde el pan inferior.');
      window.setTimeout(() => setStack([]), 700);
    }
  };

  if (completed) {
    return (
      <ActivitySuccess
        icon="🍔"
        imageSrc="/assets/activities/burger/complete-burger-v2.png"
        title="¡Hamburguesa perfecta!"
        message="Esta hamburguesa no es tan especial como nuestras salidas, pero casi."
      />
    );
  }

  return (
    <div className="activity-layout activity-layout--burger">
      <section className="burger-builder" aria-label="Hamburguesa en preparación">
        <div className="burger-stack">
          {stack.length === 0 && (
            <span className="burger-stack__empty">Elegí el primer ingrediente</span>
          )}
          {[...stack].reverse().map((id) => {
            const ingredient = ingredients.find((item) => item.id === id);
            return (
              <div key={id} className={`burger-layer burger-layer--${id}`} title={ingredient?.name}>
                {ingredient && <img src={ingredient.asset} alt="" />}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="activity-link"
          onClick={() => setStack([])}
          disabled={stack.length === 0}
        >
          Desarmar y empezar otra vez
        </button>
      </section>
      <section className="activity-options">
        <h3>Ingredientes</h3>
        <p>{feedback}</p>
        <div className="ingredient-grid">
          {ingredients.map((ingredient) => (
            <button
              type="button"
              key={ingredient.id}
              onClick={() => selectIngredient(ingredient.id)}
              disabled={stack.includes(ingredient.id)}
            >
              <span className="ingredient-icon" aria-hidden="true">
                <img src={ingredient.asset} alt="" />
              </span>
              <strong>{ingredient.name}</strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
