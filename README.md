# Una aventura para vos — Etapa 3

Minijuego romántico pixel art descrito en `prompts/initial-prompt.md`, ejecutable hasta la Etapa 3.

## Arquitectura

- **React** controla menú, contador, diálogos, inventario, minijuegos, progreso y controles móviles accesibles.
- **Phaser 3** renderiza siete escenarios y gestiona movimiento, colisiones, NPC, interacción, transiciones y sonidos locales.
- **Zustand** persiste escenas, inventario, actividades, piezas de llave, sabores, película, tiros, recuerdos, diálogos y preferencias.
- **EventBus** mantiene separadas las responsabilidades de React y Phaser sin actualizar React en cada frame.
- **Vitest + Testing Library** validan contador, store, recompensas y lógica de actividades.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Controles:

- Flechas o `WASD`: movimiento.
- `E` o espacio: interactuar.
- `I` o botón superior: inventario.
- En móvil: cruceta virtual y botón **E**.

Recorrido de prueba:

1. Leer la carta y salir desde la habitación.
2. Entrar a cada local desde la plaza y acercarse al punto principal.
3. Preparar la hamburguesa en orden, crear un helado, elegir una película y completar el tiro de billar.
4. Encontrar al menos cinco de los siete objetos ocultos en el jardín.
5. Revisar en el inventario las cuatro piezas de llave y los recuerdos.
6. Volver al menú y continuar para comprobar el autoguardado y la última escena.

## Verificación

```bash
npm run test
npm run lint
npm run build
npm run format:check
```

## Configuración personalizable

Editá `src/config/gameConfig.ts` para nombres, fecha y textos. Las películas, sabores y recuerdos están en `src/data/` y pueden modificarse sin tocar la lógica.

## Assets visuales

Los siete escenarios utilizan fondos locales coherentes de 768×432 px. La guía de origen y reemplazo está en `public/assets/README.md` y `public/assets/ASSET-MANIFEST.md`.

## Implementación de Etapas 2 y 3

- `InteractiveObject`, `InteractionSystem`, `DialogueSystem` e `InventorySystem` forman la base reutilizable.
- `BaseActivityScene` estandariza navegación, colisiones y apertura de actividades.
- Los minijuegos React son independientes, accesibles y compatibles con toque, sin drag-and-drop complejo.
- Hamburguesa, helado, cine y billar entregan las cuatro piezas configuradas de la llave.
- El jardín contiene siete recuerdos y se completa al encontrar cinco; los restantes son opcionales.
- Los sonidos sintetizados se reproducen mediante Phaser después de una interacción y respetan las preferencias.

## Continuación: Etapa 4

La próxima etapa conectará las cuatro piezas con el regalo bloqueado, la fecha de cumpleaños, carta final, galería, confeti, música y estadísticas. La Etapa 3 se detiene deliberadamente antes de abrir el regalo.
