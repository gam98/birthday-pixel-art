import { lazy, Suspense } from 'react';
import { StartPage } from './pages/StartPage';
import { useGameStore } from './store/gameStore';

const GamePage = lazy(() =>
  import('./pages/GamePage').then((module) => ({ default: module.GamePage })),
);

export default function App() {
  const screen = useGameStore((state) => state.screen);
  return screen === 'game' ? (
    <Suspense fallback={<div className="game-loading">Preparando la aventura…</div>}>
      <GamePage />
    </Suspense>
  ) : (
    <StartPage />
  );
}
