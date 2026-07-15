# Assets de la aventura

La Etapa 1 usa arte pixelado local generado específicamente para el proyecto, con texturas Phaser como fallback. El detalle de los recursos activos está en `ASSET-MANIFEST.md`.

| Carpeta         | Recurso esperado                    | Recomendación                                                                                           |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `characters/`   | `player-idle-v2.png`                | Sprite PNG transparente de 24×40 px. Luego puede reemplazarse por un spritesheet de cuatro direcciones. |
| `environments/` | `bedroom-v2.png` y otros escenarios | Fondos PNG a 768×432 px o tiles de 16×16 px, siempre sin suavizado.                                     |
| `objects/`      | Cama, escritorio, puerta, regalo    | PNG transparente, múltiplos de 16 px y vista superior 3/4 consistente.                                  |
| `foods/`        | Ingredientes y helados              | PNG transparente, 16×16 o 32×32 px. Se usarán desde la Etapa 3.                                         |
| `ui/`           | Marcos, botones e íconos            | PNG de 9-slice o múltiplos de 8 px. Mantener alto contraste.                                            |
| `effects/`      | Corazones, destellos y confeti      | Spritesheets PNG de hasta 8 frames. Se usarán en la Etapa 4.                                            |
| `music/`        | Música de inicio, mapa y final      | OGG y MP3, loops cortos comprimidos. No se reproducen antes de una interacción.                         |
| `sounds/`       | Pasos, interacción, premio y regalo | OGG y MP3, clips breves normalizados.                                                                   |

Para cada asset de terceros, conservar junto al archivo un `LICENSE.txt` que indique autor, URL de origen y licencia. No mezclar escalas base o estilos incompatibles.
