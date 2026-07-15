````markdown
# Proyecto: Minijuego pixel art de cumpleaños con React y Phaser

Quiero que actúes como un desarrollador senior especializado en:

- React
- TypeScript
- Phaser 3
- Videojuegos web 2D
- Pixel art
- Diseño responsive
- Experiencias interactivas románticas

Necesito desarrollar una aplicación web en forma de **minijuego pixel art** como regalo de cumpleaños para mi novia.

Su cumpleaños es el **14 de agosto de 2026**.

La aplicación debe sentirse como una pequeña aventura personalizada, romántica y divertida. El jugador controlará un personaje que recorrerá diferentes escenarios, interactuará con objetos, completará actividades simples y desbloqueará un regalo final.

La prioridad es crear una experiencia terminable, estable y optimizada para celulares y computadoras. No quiero un videojuego excesivamente complejo.

---

# Concepto general

El jugador controlará un personaje pixel art dentro de un pequeño mundo compuesto por varios escenarios relacionados con cosas que le gustan:

- Hamburguesas
- Helados
- Películas
- Billar
- Fotografías
- Recuerdos
- Cartas
- Regalos

El personaje deberá recorrer el mapa, hablar con personajes, recoger objetos y completar minijuegos cortos.

Al completar las actividades principales, se desbloqueará una escena final con un regalo de cumpleaños, una carta y un mensaje especial.

---

# Stack obligatorio

Usar:

- React
- TypeScript
- Vite
- Phaser 3
- Zustand
- Tailwind CSS
- Howler.js o el sistema de audio de Phaser
- Vitest
- React Testing Library
- ESLint
- Prettier

React debe manejar:

- Pantalla inicial
- Contador regresivo
- Menús
- Configuración
- Modales
- Progreso
- Galería
- Carta final

Phaser debe manejar:

- Escenarios
- Personaje
- Movimiento
- Colisiones
- Animaciones
- Objetos interactivos
- NPC
- Minijuegos
- Sonidos dentro del juego

No utilizar un motor de física complejo salvo que sea necesario.

---

# Objetivo del juego

El jugador deberá completar varias actividades:

1. Preparar una hamburguesa.
2. Crear una combinación de helado.
3. Elegir una película.
4. Completar un minijuego de billar.
5. Encontrar fotografías o recuerdos escondidos.
6. Recuperar las partes de una llave.
7. Abrir el regalo final.

Cada actividad completada entregará una parte de una llave, estrella, corazón u objeto especial.

Cuando el jugador consiga todos los objetos necesarios, podrá abrir el cofre o regalo final.

---

# Historia

La historia debe ser sencilla.

El personaje despierta en una habitación y encuentra un regalo cerrado.

Junto al regalo aparece un mensaje:

> El regalo todavía no puede abrirse.  
> Para descubrir lo que contiene, tendrás que recorrer nuestros recuerdos.

El personaje deberá visitar diferentes lugares y completar actividades relacionadas con experiencias compartidas.

Cada lugar entregará:

- Una parte de la llave.
- Un recuerdo.
- Una fotografía.
- Una frase romántica.
- Una pista para llegar al final.

Cuando todas las actividades estén completadas, el jugador regresará a la habitación inicial y podrá abrir el regalo.

---

# Pantalla inicial

Antes de entrar al juego, mostrar una interfaz React con:

- Nombre personalizado.
- Título del juego.
- Contador regresivo para el 14 de agosto de 2026.
- Botón “Comenzar aventura”.
- Botón para continuar una partida guardada.
- Control de música.
- Control de efectos de sonido.
- Botón para reiniciar el progreso.
- Instrucciones básicas.

Ejemplo de título:

> La aventura de [NOMBRE]

Ejemplo de subtítulo:

> Un pequeño mundo creado especialmente para vos.

La música no debe reproducirse automáticamente antes de que el usuario interactúe con la página.

---

# Configuración central

Crear un archivo central de configuración:

```ts
export const gameConfig = {
  personName: 'NOMBRE_DE_MI_NOVIA',
  playerName: 'NOMBRE_DEL_PERSONAJE',
  birthdayDate: '2026-08-14T00:00:00-03:00',
  gameTitle: 'Una aventura para vos',
  finalMessage: 'Feliz cumpleaños, mi amor',
  finalGiftDescription: 'DESCRIPCIÓN_DEL_REGALO',
  requiredKeyPieces: 4,
};
```
````

Todos los datos personalizados deben poder modificarse desde archivos de configuración o datos, sin tocar la lógica principal.

---

# Mecánicas principales

## Movimiento

El personaje debe poder moverse en cuatro direcciones:

- Arriba
- Abajo
- Izquierda
- Derecha

Controles de escritorio:

- Flechas
- WASD

Controles móviles:

- Joystick virtual
- Botones táctiles
- Botón de interacción

El personaje debe tener animaciones para:

- Caminar hacia arriba
- Caminar hacia abajo
- Caminar hacia la izquierda
- Caminar hacia la derecha
- Estar quieto

---

## Interacción

El jugador podrá interactuar con objetos cercanos usando:

- Tecla `E`
- Barra espaciadora
- Botón táctil
- Clic o toque sobre algunos objetos

Cuando el personaje esté cerca de un objeto interactivo, mostrar un indicador:

```text
Presioná E para interactuar
```

En móvil:

```text
Tocá el botón para interactuar
```

Crear un sistema reutilizable de objetos interactivos.

Cada objeto debe poder configurar:

- Identificador
- Posición
- Sprite
- Texto
- Sonido
- Acción
- Estado bloqueado
- Requisito previo
- Recompensa
- Estado completado

---

# Escenarios

Crear un mundo pequeño dividido en escenas.

## 1. Habitación inicial

Debe contener:

- Cama
- Escritorio
- Calendario
- Fotografías
- Puerta
- Regalo cerrado
- Carta introductoria

El regalo no se podrá abrir inicialmente.

Desde esta habitación se accede al mapa principal.

---

## 2. Plaza central

Debe funcionar como punto de conexión entre las diferentes zonas.

Debe incluir señales hacia:

- Hamburguesería
- Heladería
- Cine
- Salón de billar
- Jardín de recuerdos

Agregar personajes decorativos y objetos interactivos simples.

---

## 3. Hamburguesería

El jugador deberá preparar una hamburguesa.

Ingredientes:

- Pan inferior
- Carne
- Queso
- Lechuga
- Tomate
- Salsa
- Pan superior

La actividad puede resolverse seleccionando ingredientes en el orden correcto.

No implementar drag-and-drop complejo si dificulta la experiencia móvil.

Al completar la hamburguesa:

- Mostrar animación.
- Reproducir sonido.
- Mostrar un recuerdo personalizado.
- Entregar una parte de la llave.
- Marcar la actividad como completada.

Ejemplo de mensaje:

> Esta hamburguesa no es tan especial como nuestras salidas, pero casi.

---

## 4. Heladería

El jugador podrá elegir sabores de helado.

Sabores sugeridos:

- Chocolate
- Frutilla
- Vainilla
- Dulce de leche
- Menta granizada

Debe poder seleccionar hasta tres sabores.

Cada sabor puede mostrar:

- Una frase.
- Un recuerdo.
- Una animación.
- Un color diferente del helado.

Agregar una combinación secreta que desbloquee un mensaje especial.

Al terminar:

- Mostrar el helado creado.
- Entregar una parte de la llave.
- Guardar la combinación elegida.

---

## 5. Cine

Crear una pequeña sala o cartelera.

El jugador podrá interactuar con diferentes afiches.

Categorías:

- Películas favoritas.
- Películas que vimos juntos.
- Películas pendientes.
- Nuestra próxima película.

Al seleccionar una película, mostrar un modal React con:

- Portada.
- Título.
- Año.
- Descripción.
- Recuerdo asociado.
- Frase personal.

Para completar la actividad, el jugador debe elegir cuál será la próxima película que verán juntos.

Después de elegir:

- Guardar la selección.
- Entregar una parte de la llave.
- Mostrar un mensaje.

---

## 6. Salón de billar

Crear un minijuego sencillo de billar.

No implementar física profesional.

La mecánica puede ser:

1. La bola se mueve horizontalmente.
2. El jugador presiona un botón para detener un indicador.
3. Según la precisión, la bola entra o no en el agujero.
4. El jugador dispone de tres intentos.

Otra alternativa válida:

- Elegir dirección.
- Elegir potencia.
- Reproducir una animación simulada del tiro.

El minijuego debe durar menos de un minuto.

Al completarlo:

- Mostrar celebración.
- Entregar una parte de la llave.
- Reproducir un sonido.
- Mostrar un mensaje personalizado.

---

## 7. Jardín de recuerdos

Crear un escenario tranquilo con objetos escondidos.

El jugador deberá encontrar varios recuerdos:

- Una fotografía.
- Una entrada de cine.
- Una bola de billar.
- Un envoltorio de helado.
- Una hamburguesa.
- Una flor.
- Una carta.

Al encontrar un objeto:

- Mostrar una pequeña tarjeta.
- Mostrar fecha, lugar y descripción.
- Reproducir una animación.
- Guardarlo en el inventario.

No todos los recuerdos deben ser obligatorios para terminar el juego.

---

# Personajes no jugables

Agregar algunos NPC sencillos.

Ejemplos:

- Vendedor de hamburguesas.
- Heladero.
- Encargado del cine.
- Jugador de billar.
- Personaje misterioso del jardín.

Los NPC deben mostrar diálogos cortos.

Crear un sistema de diálogo reutilizable que permita:

- Mostrar nombre.
- Mostrar retrato opcional.
- Avanzar texto.
- Cerrar diálogo.
- Ejecutar una acción al terminar.
- Mostrar opciones simples.

Ejemplo:

```ts
export interface DialogueLine {
  speaker: string;
  text: string;
  portrait?: string;
}
```

Los diálogos deben almacenarse en archivos separados.

---

# Inventario

Crear un inventario simple.

El jugador podrá recoger:

- Partes de la llave.
- Fotografías.
- Recuerdos.
- Objetos especiales.

El inventario debe poder abrirse desde:

- Tecla `I`.
- Botón en la interfaz.
- Botón táctil en móvil.

Debe mostrar:

- Ícono.
- Nombre.
- Descripción.
- Cantidad.
- Estado descubierto.

---

# Sistema de progreso

Usar Zustand para almacenar:

- Escenas visitadas.
- Actividades completadas.
- Objetos recogidos.
- Partes de la llave.
- Película seleccionada.
- Sabores elegidos.
- Fotografías encontradas.
- Diálogos vistos.
- Volumen.
- Estado del regalo.
- Juego completado.

Persistir el progreso en `localStorage`.

Mostrar un indicador:

```text
Recuerdos encontrados: 5/7
Partes de la llave: 3/4
```

Permitir reiniciar el progreso desde la pantalla de configuración, solicitando confirmación.

---

# Contador de cumpleaños

Crear un hook reutilizable:

```ts
useBirthdayCountdown();
```

Debe devolver:

- Días.
- Horas.
- Minutos.
- Segundos.
- Si el cumpleaños ya llegó.
- Si la fecha ya pasó.

Antes del cumpleaños, el regalo puede permanecer bloqueado incluso si se completaron todas las misiones.

Mostrar el mensaje:

> Encontraste todos los recuerdos, pero el regalo se abrirá el 14 de agosto.

Agregar una configuración para permitir desbloquearlo manualmente durante el desarrollo.

```ts
export const developmentConfig = {
  forceUnlockGift: false,
};
```

---

# Regalo final

Para abrir el regalo deben cumplirse estas condiciones:

- Todas las actividades principales completadas.
- Todas las partes de la llave encontradas.
- Haber llegado al 14 de agosto, salvo en modo desarrollo.

Cuando se abra:

1. Reproducir animación del regalo.
2. Mostrar partículas.
3. Mostrar corazones o confeti.
4. Cambiar la música.
5. Mostrar una carta.
6. Mostrar una galería de fotografías.
7. Revelar el regalo real o mensaje final.

La carta final debe almacenarse en:

```text
src/data/finalLetter.ts
```

Ejemplo:

```ts
export const finalLetter = `
NOMBRE_DE_MI_NOVIA:

ESCRIBIR_AQUÍ_LA_CARTA_PERSONAL.

Feliz cumpleaños.
`;
```

---

# Escena final

Después de abrir el regalo:

- Mostrar un fondo especial.
- Mostrar el mensaje de cumpleaños.
- Reproducir música.
- Mostrar fotos.
- Mostrar estadísticas de la aventura.
- Permitir volver a recorrer el mundo.
- Permitir releer la carta.
- Permitir volver a ver los recuerdos.

Ejemplo de estadísticas:

```text
Hamburguesas preparadas: 1
Sabores elegidos: 3
Películas seleccionadas: 1
Tiros de billar realizados: 2
Recuerdos encontrados: 7
```

---

# Diseño pixel art

Usar una estética pixel art coherente.

Características:

- Resolución base pequeña.
- Escalado por números enteros cuando sea posible.
- Sprites con bordes definidos.
- Paleta cálida.
- Colores suaves.
- Sombras sencillas.
- Animaciones cortas.
- Interfaz consistente.

Configurar Phaser para evitar que los sprites se vean borrosos:

```ts
pixelArt: true,
antialias: false,
roundPixels: true,
```

Aplicar cuando corresponda:

```css
image-rendering: pixelated;
```

No mezclar assets pixel art de resoluciones o estilos incompatibles.

---

# Assets

Utilizar inicialmente assets placeholder gratuitos.

Crear una estructura:

```text
public/
└── assets/
    ├── characters/
    ├── environments/
    ├── objects/
    ├── foods/
    ├── ui/
    ├── effects/
    ├── music/
    └── sounds/
```

Dejar comentarios claros indicando:

- Qué archivo reemplazar.
- Dimensiones recomendadas.
- Cantidad de frames.
- Orden de las animaciones.
- Licencia requerida.

No depender de URLs externas durante la ejecución.

Todos los recursos deben cargarse localmente.

---

# Arquitectura esperada

Proponer una estructura similar a:

```text
src/
├── components/
│   ├── countdown/
│   ├── game/
│   ├── inventory/
│   ├── modals/
│   ├── settings/
│   └── ui/
├── config/
│   ├── gameConfig.ts
│   └── developmentConfig.ts
├── data/
│   ├── dialogues.ts
│   ├── movies.ts
│   ├── memories.ts
│   ├── iceCreamFlavors.ts
│   └── finalLetter.ts
├── game/
│   ├── config/
│   │   └── phaserConfig.ts
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── BedroomScene.ts
│   │   ├── TownScene.ts
│   │   ├── BurgerScene.ts
│   │   ├── IceCreamScene.ts
│   │   ├── CinemaScene.ts
│   │   ├── PoolScene.ts
│   │   ├── MemoryGardenScene.ts
│   │   └── FinalScene.ts
│   ├── entities/
│   │   ├── Player.ts
│   │   ├── NPC.ts
│   │   └── InteractiveObject.ts
│   ├── systems/
│   │   ├── InteractionSystem.ts
│   │   ├── DialogueSystem.ts
│   │   ├── InventorySystem.ts
│   │   └── AudioSystem.ts
│   ├── types/
│   └── utils/
├── hooks/
│   ├── useBirthdayCountdown.ts
│   ├── useGameBridge.ts
│   └── useAudioSettings.ts
├── pages/
│   ├── StartPage.tsx
│   └── GamePage.tsx
├── store/
│   └── gameStore.ts
├── styles/
├── types/
├── App.tsx
└── main.tsx
```

---

# Comunicación entre React y Phaser

Crear un sistema claro para comunicar Phaser con React.

Ejemplos de eventos:

```ts
export const GAME_EVENTS = {
  OPEN_DIALOGUE: 'open-dialogue',
  OPEN_INVENTORY: 'open-inventory',
  OPEN_MEMORY: 'open-memory',
  ACTIVITY_COMPLETED: 'activity-completed',
  ITEM_COLLECTED: 'item-collected',
  OPEN_FINAL_GIFT: 'open-final-gift',
} as const;
```

Usar un Event Bus reutilizable.

React podrá abrir modales cuando Phaser emita eventos.

Phaser podrá consultar el estado global para saber:

- Qué misión está completada.
- Qué objeto fue recogido.
- Cuántas partes de la llave existen.
- Si el regalo está desbloqueado.

Evitar crear múltiples instancias de Phaser durante los renders de React.

Destruir correctamente la instancia cuando el componente se desmonte.

---

# Responsive

El juego debe ser mobile-first.

Debe funcionar en:

- Celulares pequeños.
- Celulares grandes.
- Tablets.
- Notebook.
- Escritorio.

Requisitos:

- Mantener la relación de aspecto.
- No deformar el canvas.
- Mostrar controles táctiles en móvil.
- Ocultar controles táctiles en escritorio.
- Permitir pantalla completa.
- Evitar scroll accidental durante el juego.
- Permitir orientación horizontal.
- Mostrar una recomendación si el dispositivo está en vertical.

El texto debe ser legible en pantallas pequeñas.

---

# Accesibilidad

Implementar:

- Botones semánticos.
- `aria-label`.
- Navegación por teclado en interfaces React.
- Focus visible.
- Opción para reducir animaciones.
- Control independiente de música y efectos.
- Subtítulos o texto para diálogos.
- Alternativa textual para información importante.
- Contraste suficiente.
- Respeto por `prefers-reduced-motion`.

---

# Audio

Agregar:

- Música para la pantalla inicial.
- Música para el mapa.
- Música para la escena final.
- Sonido de pasos.
- Sonido de interacción.
- Sonido de objeto recogido.
- Sonido de actividad completada.
- Sonido del regalo.

No reproducir sonido antes de la primera interacción del usuario.

Guardar preferencias de audio en `localStorage`.

Pausar el audio cuando la pestaña pierda visibilidad.

---

# Guardado

Implementar autoguardado.

Guardar después de:

- Completar una actividad.
- Recoger un objeto.
- Cambiar de escena.
- Elegir una película.
- Elegir sabores.
- Abrir el regalo.

Mostrar brevemente:

```text
Progreso guardado
```

La partida debe recuperarse después de actualizar la página.

---

# Pruebas

Agregar pruebas para:

- Contador regresivo.
- Desbloqueo por fecha.
- Desbloqueo del regalo.
- Persistencia del progreso.
- Actividades completadas.
- Recolección de partes de la llave.
- Comunicación entre React y Phaser.
- Reinicio de partida.
- Cálculo del porcentaje de progreso.

No es necesario probar visualmente todos los sprites.

Priorizar pruebas de lógica.

---

# Rendimiento

Optimizar para dispositivos móviles.

Aplicar:

- Spritesheets pequeños.
- Atlas de texturas cuando sea conveniente.
- Precarga organizada.
- Lazy loading para galerías.
- Compresión de audio.
- Evitar imágenes demasiado grandes.
- Evitar actualizar React en cada frame de Phaser.
- Reutilizar objetos cuando sea posible.
- Limitar partículas.
- Pausar Phaser cuando la pestaña no esté visible.

El juego debe ser funcional en dispositivos sin GPU dedicada.

---

# Desarrollo por etapas

No implementar todo en una única respuesta.

## Etapa 1: Base del proyecto

Entregar:

- Creación del proyecto.
- Instalación de dependencias.
- Configuración de React, TypeScript y Phaser.
- Estructura de carpetas.
- Pantalla inicial.
- Contador regresivo.
- Integración React-Phaser.
- Escena de precarga.
- Habitación placeholder.
- Personaje con movimiento.
- Controles de teclado.
- Colisiones básicas.

## Etapa 2: Mundo e interacción

Entregar:

- Plaza central.
- Transición entre escenas.
- Objetos interactivos.
- NPC.
- Sistema de diálogo.
- Inventario.
- Guardado con Zustand.
- Controles móviles.

## Etapa 3: Actividades

Entregar:

- Hamburguesería.
- Heladería.
- Cine.
- Billar.
- Jardín de recuerdos.
- Recompensas.
- Partes de la llave.

## Etapa 4: Final

Entregar:

- Regalo bloqueado.
- Verificación de fecha.
- Animación de apertura.
- Carta.
- Galería.
- Confeti.
- Música final.
- Estadísticas.

## Etapa 5: Calidad

Entregar:

- Pruebas.
- Accesibilidad.
- Responsive.
- Rendimiento.
- Corrección de errores.
- Despliegue en Vercel.
- Lista de assets que debo reemplazar.

---

# Forma de responder

Comenzá solamente con la Etapa 1.

La respuesta debe incluir:

1. Resumen breve de la arquitectura.
2. Comandos para crear el proyecto.
3. Dependencias necesarias.
4. Estructura de carpetas.
5. Código completo de cada archivo.
6. Ruta exacta de cada archivo.
7. Assets placeholder necesarios.
8. Instrucciones para ejecutar el proyecto.
9. Instrucciones para probar movimiento y colisiones.
10. Explicación de cómo continuar con la Etapa 2.

Reglas para el código:

- No usar pseudocódigo.
- No omitir imports.
- No escribir comentarios como “agregar lógica aquí”.
- Entregar archivos completos.
- Usar TypeScript estricto.
- Separar responsabilidades.
- Evitar archivos excesivamente grandes.
- Manejar errores.
- No colocar toda la lógica en `App.tsx`.
- No crear el juego Phaser en cada render.
- No usar `any` salvo que sea estrictamente necesario.
- Explicar cada dependencia utilizada.
- Mantener el proyecto ejecutable al finalizar cada etapa.

El resultado de la Etapa 1 debe poder ejecutarse con:

```bash
npm install
npm run dev
```

Al terminar la Etapa 1, detenerse y esperar mi confirmación antes de implementar la siguiente etapa.

```

```
