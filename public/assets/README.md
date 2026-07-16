# Assets de la aventura

Las Etapas 1 a 3 usan arte pixelado local generado específicamente para el proyecto, con texturas Phaser como fallback. El detalle de los recursos activos está en `ASSET-MANIFEST.md`.

| Carpeta         | Recurso esperado                 | Recomendación                                                                                |
| --------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `characters/`   | Jugadora y Gabi                  | Sprites PNG transparentes. Luego pueden reemplazarse por spritesheets de cuatro direcciones. |
| `environments/` | Siete fondos de escenas          | PNG a 768×432 px, mostrados a 384×216 px y siempre sin suavizado.                            |
| `objects/`      | Cama, escritorio, puerta, regalo | PNG transparente, múltiplos de 16 px y vista superior 3/4 consistente.                       |
| `activities/`   | Ingredientes de minijuegos       | PNG transparentes optimizados para selector, montaje y recompensas de cada actividad.        |
| `ui/`           | Marcos, botones e íconos         | PNG de 9-slice o múltiplos de 8 px. Mantener alto contraste.                                 |
| `effects/`      | Corazones, destellos y confeti   | Spritesheets PNG de hasta 8 frames. Se usarán en la Etapa 4.                                 |
| `music/`        | Música de inicio, mapa y final   | OGG y MP3, loops cortos comprimidos. No se reproducen antes de una interacción.              |
| `sounds/`       | UI, tiro y actividad completada  | WAV PCM local, breve y normalizado; Phaser respeta la preferencia de efectos.                |

Para cada asset de terceros, conservar junto al archivo un `LICENSE.txt` que indique autor, URL de origen y licencia. No mezclar escalas base o estilos incompatibles.
