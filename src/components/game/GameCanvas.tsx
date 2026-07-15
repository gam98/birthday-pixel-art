import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserConfig } from '../../game/config/phaserConfig';
import { eventBus } from '../../game/systems/EventBus';
import { GAME_EVENTS } from '../../game/types/events';
import { useGameStore } from '../../store/gameStore';

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const setLastScene = useGameStore((state) => state.setLastScene);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || gameRef.current) return;

    gameRef.current = new Phaser.Game(createPhaserConfig(container));
    const onSceneChanged = ({ scene }: { scene: string }) => setLastScene(scene);
    eventBus.on(GAME_EVENTS.SCENE_CHANGED, onSceneChanged);

    const onVisibilityChange = () => {
      if (!gameRef.current) return;
      if (document.hidden) gameRef.current.loop.sleep();
      else gameRef.current.loop.wake();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      eventBus.off(GAME_EVENTS.SCENE_CHANGED, onSceneChanged);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [setLastScene]);

  return (
    <div
      ref={containerRef}
      className="game-canvas"
      role="application"
      aria-label="Habitación pixel art. Usá WASD o las flechas para mover al personaje."
    />
  );
}
