import { useEffect, useRef } from 'react';
import type { DialogueChoice, DialogueSequence } from '../../types/dialogue';

interface DialogueModalProps {
  dialogue: DialogueSequence;
  lineIndex: number;
  onNext: () => void;
  onChoose: (choice: DialogueChoice) => void;
  onClose: () => void;
}

export function DialogueModal({
  dialogue,
  lineIndex,
  onNext,
  onChoose,
  onClose,
}: DialogueModalProps) {
  const primaryButton = useRef<HTMLButtonElement>(null);
  const line = dialogue.lines[lineIndex];
  const isLastLine = lineIndex === dialogue.lines.length - 1;

  useEffect(() => {
    primaryButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lineIndex, onClose]);

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="dialogue-modal" role="dialog" aria-modal="true" aria-labelledby="speaker">
        {line.portrait && (
          <div className="dialogue-modal__portrait">
            <img src={line.portrait} alt="" />
          </div>
        )}
        <div className="dialogue-modal__content">
          <div className="dialogue-modal__header">
            <h2 id="speaker">{line.speaker}</h2>
            <span>
              {lineIndex + 1} / {dialogue.lines.length}
            </span>
          </div>
          <p>{line.text}</p>
          {line.choices ? (
            <div className="dialogue-modal__choices">
              {line.choices.map((choice, index) => (
                <button
                  ref={index === 0 ? primaryButton : undefined}
                  type="button"
                  key={choice.label}
                  onClick={() => onChoose(choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              ref={primaryButton}
              className="dialogue-modal__next"
              type="button"
              onClick={onNext}
            >
              {isLastLine ? 'Cerrar' : 'Continuar'} <span aria-hidden="true">›</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
