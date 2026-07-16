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
    const onPlaySound = ({ key }: { key: string }) => {
      const game = gameRef.current;
      const settings = useGameStore.getState();
      if (game && settings.soundEnabled && game.cache.audio.exists(key)) {
        game.sound.play(key, { volume: settings.soundVolume });
      }
    };
    eventBus.on(GAME_EVENTS.PLAY_SOUND, onPlaySound);

    const onVisibilityChange = () => {
      if (!gameRef.current) return;
      if (document.hidden) gameRef.current.loop.sleep();
      else gameRef.current.loop.wake();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      eventBus.off(GAME_EVENTS.SCENE_CHANGED, onSceneChanged);
      eventBus.off(GAME_EVENTS.PLAY_SOUND, onPlaySound);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [setLastScene]);

  return (
    <div
      ref={containerRef}
      className="game-canvas"
      role="application"
      aria-label="Aventura pixel art. Usá WASD o las flechas para moverte, B para bailar y G para llamar a Gabi."
    />
  );
}
