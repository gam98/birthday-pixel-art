# Manifiesto de assets visuales

## Habitación romántica

- **Archivo:** `environments/bedroom-v2.png`
- **Dimensiones:** 768×432 px; se muestra a una resolución lógica de 384×216 px.
- **Origen:** generado específicamente para este proyecto con la herramienta integrada de generación de imágenes de OpenAI y reducido con muestreo nearest-neighbor.
- **Uso:** fondo completo de `BedroomScene`; incluye cama, puerta, escritorio, alfombra, plantas, decoración y regalo.
- **Prompt final:** habitación romántica pixel art 16-bit, vista superior 3/4, formato 16:9, paleta rosa, crema, madera y malva, con piso navegable despejado y sin texto, UI o personajes.

## Personaje principal

- **Archivo:** `characters/player-idle-v2.png`
- **Dimensiones:** 24×40 px con transparencia.
- **Origen:** generado específicamente para este proyecto con la herramienta integrada de generación de imágenes de OpenAI; fondo chroma removido localmente con una máscara por dominancia de verde y escalado con nearest-neighbor.
- **Uso:** sprite idle y de movimiento provisional de `Player`.
- **Prompt final:** joven aventurera en pixel art 16-bit, cabello castaño, chaqueta rosa, ropa bordó, botas y broche dorado, silueta legible en tamaño pequeño.

## Plaza central

- **Archivo:** `environments/town-v2.png`
- **Dimensiones:** 768×432 px; se muestra a una resolución lógica de 384×216 px.
- **Origen:** generado específicamente para este proyecto con la herramienta integrada de generación de imágenes de OpenAI y reducido con nearest-neighbor.
- **Uso:** fondo completo de `TownScene`; conecta visualmente hamburguesería, heladería, cine, billar, jardín y camino a casa.
- **Prompt final:** plaza romántica 16-bit al atardecer, fuente de corazón, cinco accesos diferenciados mediante pictogramas, caminos navegables y estilo idéntico a la habitación.

## Gael, guardián de recuerdos

- **Archivo:** `characters/garden-guide-v2.png`
- **Dimensiones:** 28×44 px con transparencia.
- **Origen:** generado específicamente para este proyecto con la herramienta integrada de generación de imágenes de OpenAI; chroma removido por dominancia de verde.
- **Uso:** primer NPC interactivo y retrato dentro del diálogo.
- **Prompt final:** guía joven de cabello cobrizo, abrigo verde salvia, ropa bordó y broche dorado, en pixel art 16-bit coherente con la plaza.

Estos archivos no dependen de URLs externas durante la ejecución. Para futuras sustituciones de terceros, conservar autor, URL y licencia en este manifiesto.

## Interiores y jardín de la Etapa 3

Todos fueron generados específicamente para este proyecto con la herramienta integrada de generación de imágenes de OpenAI, usando `town-v2.png` como referencia visual, y reducidos a 768×432 px con nearest-neighbor.

| Archivo                             | Uso                 | Prompt resumido                                                                       |
| ----------------------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| `environments/burger-v2.png`        | `BurgerScene`       | Café romántico 16-bit con siete bandejas de ingredientes, mostrador y piso navegable. |
| `environments/ice-cream-v2.png`     | `IceCreamScene`     | Heladería pastel con cinco sabores diferenciados, conos y decoración de corazones.    |
| `environments/cinema-v2.png`        | `CinemaScene`       | Lobby vintage con cuatro afiches pictográficos, boletería y luz dorada.               |
| `environments/pool-v2.png`          | `PoolScene`         | Salón íntimo con mesa verde central, madera oscura y luminarias de corazón.           |
| `environments/memory-garden-v2.png` | `MemoryGardenScene` | Jardín nocturno con senderos, estanque, gazebo y siete escondites.                    |

## Sonidos de actividad

- **Archivos:** `sounds/ui-click.wav`, `sounds/pool-shot.wav`, `sounds/activity-success.wav`.
- **Origen:** tonos sintetizados localmente, sin muestras ni dependencias externas.
- **Uso:** feedback de interfaz, tiro de billar y celebración mediante Phaser.
