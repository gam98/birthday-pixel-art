import { useEffect, useRef } from 'react';
import { inventoryItems } from '../../data/inventoryItems';
import { useGameStore } from '../../store/gameStore';

interface InventoryModalProps {
  onClose: () => void;
}

export function InventoryModal({ onClose }: InventoryModalProps) {
  const inventory = useGameStore((state) => state.inventory);
  const closeButton = useRef<HTMLButtonElement>(null);
  const entries = Object.entries(inventory).filter(([, quantity]) => quantity > 0);

  useEffect(() => {
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key.toLowerCase() === 'i') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop">
      <section
        className="inventory-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-title"
      >
        <header>
          <div>
            <span className="inventory-modal__eyebrow">OBJETOS DESCUBIERTOS</span>
            <h2 id="inventory-title">Inventario</h2>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Cerrar inventario">
            ×
          </button>
        </header>
        {entries.length === 0 ? (
          <div className="inventory-modal__empty">
            <span aria-hidden="true">◇</span>
            <p>Tu mochila todavía está vacía.</p>
            <small>Explorá objetos brillantes para encontrar recuerdos.</small>
          </div>
        ) : (
          <ul className="inventory-grid">
            {entries.map(([itemId, quantity]) => {
              const item = inventoryItems[itemId];
              if (!item) return null;
              return (
                <li key={itemId}>
                  <span className="inventory-grid__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                  </div>
                  <span className="inventory-grid__quantity">×{quantity}</span>
                </li>
              );
            })}
          </ul>
        )}
        <footer>
          {entries.length} / {Object.keys(inventoryItems).length} objetos encontrados
        </footer>
      </section>
    </div>
  );
}
