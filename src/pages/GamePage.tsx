import { GameCanvas } from '../components/game/GameCanvas';
import { MobileControls } from '../components/game/MobileControls';
import { ActivityModal } from '../components/activities/ActivityModal';
import { gameConfig } from '../config/gameConfig';
import { InventoryModal } from '../components/inventory/InventoryModal';
import { DialogueModal } from '../components/modals/DialogueModal';
import { PixelIcon } from '../components/ui/PixelIcon';
import { useGameBridge } from '../hooks/useGameBridge';
import { useGameStore } from '../store/gameStore';

export function GamePage() {
  const setScreen = useGameStore((state) => state.setScreen);
  const {
    dialogue,
    inventoryOpen,
    interactionLabel,
    sceneTitle,
    saveMessage,
    activeActivity,
    advanceDialogue,
    chooseDialogue,
    closeDialogue,
    openInventory,
    closeInventory,
    completeActiveActivity,
    closeActivity,
    playSound,
  } = useGameBridge();
  const keyPieces = useGameStore((state) => state.keyPieces.length);
  const memoriesFound = useGameStore((state) => state.memoriesFound.length);

  return (
    <main className="game-page">
      <header className="game-toolbar">
        <button
          type="button"
          onClick={() => setScreen('start')}
          aria-label="Volver al menú inicial"
        >
          <PixelIcon name="back" /> Menú
        </button>
        <p>{sceneTitle}</p>
        <div className="game-progress" aria-label="Progreso de la aventura">
          <span>
            🗝️ {keyPieces}/{gameConfig.requiredKeyPieces}
          </span>
          <span>💝 {memoriesFound}/7</span>
        </div>
        <button type="button" onClick={openInventory} aria-label="Abrir inventario">
          <PixelIcon name="bag" /> Inventario <kbd>I</kbd>
        </button>
      </header>
      <section className="game-shell">
        <div className="game-frame">
          <GameCanvas />
          <div className="game-label game-label--room" aria-hidden="true">
            <span>✦</span> {sceneTitle} <span>✦</span>
          </div>
          {interactionLabel && (
            <div className="interaction-prompt" role="status">
              <kbd>E</kbd> {interactionLabel}
            </div>
          )}
          <MobileControls />
          {saveMessage && (
            <div className="save-toast" role="status">
              ✓ {saveMessage}
            </div>
          )}
        </div>
      </section>
      <p className="orientation-hint" role="note">
        Para disfrutar mejor la aventura, girá el teléfono a horizontal.
      </p>

      {dialogue && (
        <DialogueModal
          dialogue={dialogue.sequence}
          lineIndex={dialogue.lineIndex}
          onNext={advanceDialogue}
          onChoose={chooseDialogue}
          onClose={closeDialogue}
        />
      )}
      {inventoryOpen && <InventoryModal onClose={closeInventory} />}
      {activeActivity && (
        <ActivityModal
          activityId={activeActivity}
          onComplete={completeActiveActivity}
          onClose={closeActivity}
          onSound={playSound}
        />
      )}
    </main>
  );
}
