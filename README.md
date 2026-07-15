# Una aventura para vos — Etapa 1

Base ejecutable del minijuego romántico pixel art descrito en `prompts/initial-prompt.md`.

## Arquitectura

- **React** controla el menú, la cuenta regresiva, preferencias, navegación y UI accesible.
- **Phaser 3** renderiza la habitación, crea los placeholders y gestiona movimiento y colisiones Arcade.
- **Zustand** persiste la existencia de una partida y preferencias de audio en `localStorage`.
- **EventBus** separa Phaser de React. La instancia de Phaser vive una sola vez por montaje y se destruye al salir.
- **Tailwind CSS 4** está disponible mediante Vite; la identidad pixel art inicial se concentra en `src/styles/global.css`.
- **Vitest + Testing Library** validan la lógica y la UI del contador.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrí la URL que muestra Vite (normalmente `http://localhost:5173`), elegí **Comenzar aventura** y probá:

- Flechas o `WASD` para mover al personaje.
- Caminar contra la cama, el escritorio y el regalo para comprobar las colisiones.
- Caminar hacia los bordes para comprobar los límites de la habitación.
- Volver a **Menú** y usar **Continuar partida** para comprobar la persistencia.

## Verificación

```bash
npm run test
npm run lint
npm run build
npm run format:check
```

## Configuración personalizable

Editá `src/config/gameConfig.ts` para cambiar nombres, fecha, textos y cantidad de piezas. `src/config/developmentConfig.ts` reserva el desbloqueo manual del regalo para la Etapa 4. No hace falta tocar la lógica.

## Assets visuales

La habitación utiliza un fondo local en `public/assets/environments/bedroom-v2.png` y un personaje transparente en `public/assets/characters/player-idle-v2.png`. `src/game/utils/createPlaceholderTextures.ts` mantiene texturas mínimas de respaldo. La guía y el origen están documentados en `public/assets/README.md` y `public/assets/ASSET-MANIFEST.md`.

## Continuación: Etapa 2

La siguiente etapa puede crecer sobre esta base sin recrear el juego:

1. Añadir `TownScene` y transiciones mediante zonas Arcade.
2. Crear `InteractiveObject`, proximidad y acciones con `E`/espacio/toque.
3. Emitir diálogos e inventario desde Phaser hacia modales React a través del `EventBus`.
4. Extender el store con escenas visitadas, objetos y diálogos vistos.
5. Agregar joystick virtual y botón de interacción para móvil.

La Etapa 1 se detiene deliberadamente antes de esas mecánicas, tal como pide el prompt.
