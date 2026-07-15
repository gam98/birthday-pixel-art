import { useEffect, useState } from 'react';
import { memories, type MemoryData } from '../../data/memories';
import { useGameStore } from '../../store/gameStore';
import { ActivitySuccess } from './ActivitySuccess';
import type { ActivityComponentProps } from './types';

export function MemoryGardenActivity({ onComplete }: ActivityComponentProps) {
  const found = useGameStore((state) => state.memoriesFound);
  const findMemory = useGameStore((state) => state.findMemory);
  const alreadyCompleted = useGameStore((state) =>
    state.activitiesCompleted.includes('memoryGarden'),
  );
  const [selected, setSelected] = useState<MemoryData | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!alreadyCompleted && !completed && found.length >= 5) {
      setCompleted(true);
      onComplete();
    }
  }, [alreadyCompleted, completed, found.length, onComplete]);

  const discover = (memory: MemoryData) => {
    findMemory(memory.id);
    setSelected(memory);
  };

  if (completed && !selected) {
    return (
      <ActivitySuccess
        icon="🌷"
        title="¡El jardín despertó!"
        message={`Encontraste ${found.length} recuerdos. Los demás son opcionales y seguirán esperándote.`}
        hasKeyPiece={false}
      />
    );
  }

  return (
    <div className="memory-hunt">
      <div className="memory-hunt__scene" aria-label="Jardín con recuerdos escondidos">
        {memories.map((memory) => (
          <button
            type="button"
            key={memory.id}
            className={found.includes(memory.id) ? 'is-found' : ''}
            style={memory.position}
            onClick={() => discover(memory)}
            aria-label={`Examinar: ${memory.name}`}
          >
            {found.includes(memory.id) ? '✓' : memory.icon}
          </button>
        ))}
        <div className="memory-hunt__counter">Recuerdos: {found.length}/7 · Necesarios: 5</div>
      </div>
      {selected && (
        <article className="memory-card" role="status">
          <span aria-hidden="true">{selected.icon}</span>
          <div>
            <small>
              {selected.date} · {selected.place}
            </small>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
          </div>
          <button type="button" onClick={() => setSelected(null)}>
            Continuar buscando
          </button>
        </article>
      )}
    </div>
  );
}
