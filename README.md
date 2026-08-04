# Chess Kids - Aprende Ajedrez Jugando

Aplicación móvil educativa desarrollada en React Native (Expo) para que niños desde 4 años aprendan a jugar ajedrez de forma divertida e interactiva. Funciona en iOS, Android y Web.

---

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación y Setup](#instalación-y-setup)
- [Abrir el Proyecto con Kiro](#abrir-el-proyecto-con-kiro)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Dependencias](#dependencias)
- [Funcionalidades](#funcionalidades)
- [Instrucciones de Juego](#instrucciones-de-juego)
- [Arquitectura Técnica](#arquitectura-técnica)

---

## Requisitos Previos

- **Node.js** v18 o superior
- **npm** v9 o superior (viene con Node.js)
- **Expo CLI** (se ejecuta con `npx`, no requiere instalación global)
- **Expo Go** app en tu dispositivo móvil (disponible en App Store / Play Store)
- Para emuladores: Android Studio (Android) o Xcode (iOS/macOS)

---

## Instalación y Setup

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd chess-kids
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npx expo start --clear
```

4. Abre la app:
   - **Dispositivo físico**: Escanea el código QR con Expo Go
   - **Android emulator**: Presiona `a` en la terminal
   - **iOS simulator** (solo macOS): Presiona `i` en la terminal
   - **Navegador web**: Presiona `w` en la terminal

---

## Abrir el Proyecto con Kiro

Si abres este proyecto por primera vez en Kiro IDE:

1. Abre la carpeta `chess-kids` como workspace en Kiro
2. El IDE detectará automáticamente que es un proyecto Node.js/Expo
3. Abre una terminal integrada y ejecuta:

```bash
npm install
npx expo start --clear
```

4. Para hacer cambios y ver el resultado en tiempo real, Expo recargará la app automáticamente (Hot Reload)
5. Si necesitas limpiar caché después de cambios en configuración:

```bash
npx expo start --clear
```

**Nota**: No se requiere configuración adicional de IDE. El proyecto usa JavaScript puro (sin TypeScript) para simplificar el desarrollo.

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo Expo |
| `npm run android` | Inicia directamente en Android |
| `npm run ios` | Inicia directamente en iOS |
| `npm run web` | Inicia en el navegador web |

---

## Estructura del Proyecto

```
chess-kids/
├── App.js                    # Punto de entrada, navegación principal
├── app.json                  # Configuración de Expo (nombre, iconos, splash)
├── babel.config.js           # Configuración de Babel
├── package.json              # Dependencias y scripts
├── .gitignore                # Archivos excluidos de git
│
├── assets/                   # Recursos estáticos
│   └── placeholder.txt      # Instrucciones para agregar iconos
│
└── src/                      # Código fuente de la aplicación
    ├── components/           # Componentes reutilizables
    │   ├── ChessBoard.js     # Tablero interactivo con tap-to-move
    │   └── ChessPieces.js    # Piezas SVG kid-friendly con caritas
    │
    ├── context/              # Estado global (React Context + AsyncStorage)
    │   ├── ProfileContext.js # Gestión del perfil del niño (nombre, avatar)
    │   └── ProgressContext.js# Progreso, logros, partidas guardadas
    │
    ├── screens/              # Pantallas de la aplicación
    │   ├── SplashScreen.js   # Pantalla de carga animada
    │   ├── ProfileScreen.js  # Crear/editar perfil del jugador
    │   ├── HomeScreen.js     # Menú principal con progreso
    │   ├── LearnScreen.js    # Lista de lecciones disponibles
    │   ├── PieceLessonScreen.js # Lección interactiva paso a paso
    │   ├── PlayScreen.js     # Selección de dificultad del bot
    │   ├── GameScreen.js     # Pantalla de juego vs bot
    │   └── AchievementsScreen.js # Logros y estadísticas
    │
    └── utils/                # Lógica de negocio y utilidades
        ├── botAI.js          # Inteligencia artificial del bot (minimax)
        ├── chessEngine.js    # Wrapper sobre chess.js
        └── lessons.js        # Contenido educativo de las lecciones
```

### Detalle de carpetas

**`src/components/`** - Componentes visuales reutilizables. `ChessBoard.js` renderiza el tablero con interacción táctil, indicadores de movimientos legales, y resaltado de última jugada. `ChessPieces.js` contiene todas las piezas dibujadas en SVG con diseño amigable para niños (incluyen caritas).

**`src/context/`** - Manejo de estado global usando React Context API. Los datos persisten en AsyncStorage del dispositivo, así que el progreso se mantiene entre sesiones. `ProfileContext` almacena nombre y avatar; `ProgressContext` almacena lecciones completadas, victorias, logros y partidas guardadas.

**`src/screens/`** - Cada archivo es una pantalla completa de la aplicación. La navegación entre ellas se maneja con React Navigation (stack navigator).

**`src/utils/`** - Lógica pura sin componentes visuales. `botAI.js` implementa 3 niveles de dificultad usando el algoritmo minimax con poda alpha-beta. `lessons.js` contiene todo el contenido educativo en español.

---

## Dependencias

### Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `expo` | ^57.0 | Framework para desarrollo móvil cross-platform |
| `react` | 18.3.1 | Biblioteca UI principal |
| `react-native` | 0.76.6 | Runtime móvil nativo |
| `@react-navigation/native` | ^7.0.0 | Navegación entre pantallas |
| `@react-navigation/native-stack` | ^7.0.0 | Stack navigator (transiciones) |
| `@react-native-async-storage/async-storage` | ~2.1.0 | Persistencia local de datos |
| `chess.js` | ^1.0.0-beta.8 | Motor de ajedrez (validación, reglas, FEN) |
| `react-native-svg` | ~15.8.0 | Renderizado de piezas SVG |
| `react-native-gesture-handler` | ~2.20.0 | Gestos táctiles mejorados |
| `react-native-screens` | ~4.4.0 | Optimización de navegación nativa |
| `react-native-safe-area-context` | ~4.12.0 | Manejo de áreas seguras (notch, etc.) |

### Expo Modules

| Paquete | Propósito |
|---------|-----------|
| `expo-status-bar` | Control de la barra de estado |
| `expo-asset` | Carga de assets estáticos |
| `expo-font` | Carga de fuentes personalizadas |
| `expo-constants` | Constantes del dispositivo |
| `expo-haptics` | Retroalimentación háptica |
| `expo-linear-gradient` | Gradientes decorativos |
| `expo-keep-awake` | Mantener pantalla activa durante juego |
| `expo-file-system` | Acceso al sistema de archivos |

### Dev Dependencies

| Paquete | Propósito |
|---------|-----------|
| `@babel/core` | Transpilación de JavaScript moderno |

---

## Funcionalidades

### Perfil del Jugador
- El niño crea su perfil con nombre y avatar (emojis divertidos)
- 8 avatares disponibles: Caballito, Gatito, Dragón, Estrella, Cohete, Arcoíris, León, Unicornio
- Estadísticas de partidas jugadas y ganadas
- Perfil editable en cualquier momento

### Módulo de Aprendizaje
- 6 lecciones interactivas (una por pieza): Peón, Torre, Caballo, Alfil, Reina, Rey
- Cada lección tiene 4 pasos: Introducción, Movimientos, Práctica visual, Dato curioso
- Lección adicional de Jugadas Especiales: Enroque, Captura al Paso, Coronación
- Conceptos de juego: Jaque, Jaque Mate, Ahogado
- Progreso visual con puntos de avance

### Juego vs Bot
- 3 niveles de dificultad:
  - **Fácil** (Botín el Amigable): Movimientos mayormente aleatorios, ideal para principiantes
  - **Medio** (Robo el Pensador): Evaluación básica con errores ocasionales
  - **Difícil** (Mega el Campeón): Minimax con poda alpha-beta, profundidad 3
- El jugador siempre juega con blancas (mueve primero)
- Indicador visual cuando el bot está "pensando"
- Detección automática de jaque, jaque mate y empate

### Tablero Interactivo
- Tap para seleccionar pieza
- Puntos verdes muestran movimientos legales
- Círculo rojo indica capturas posibles
- Resaltado de última jugada
- Indicador de jaque en el Rey
- Coordenadas del tablero (a-h, 1-8)

### Guardar Partida
- Botón de guardado durante la partida
- Persistencia completa del estado (posición, capturas, dificultad)
- Opción de continuar partida guardada desde el menú de juego
- Una partida guardada a la vez

### Logros y Progreso
- 8 logros desbloqueables con emojis
- Sistema de estrellas (1 por lección, 1-3 por victoria según dificultad)
- Estadísticas detalladas por nivel de dificultad
- Barra de progreso general
- Mensajes motivacionales personalizados

---

## Instrucciones de Juego

### Primeros Pasos
1. Al abrir la app por primera vez, crea tu perfil eligiendo nombre y avatar
2. Desde el menú principal, ve a "Aprender" para conocer las piezas
3. Completa las lecciones en orden: Peón, Torre, Caballo, Alfil, Reina, Rey
4. Cuando te sientas listo, ve a "Jugar" y elige dificultad Fácil

### Cómo Jugar una Partida
1. Toca una de tus piezas (blancas) para seleccionarla
2. Aparecerán puntos verdes en las casillas donde puede moverse
3. Toca la casilla destino para mover la pieza
4. El bot (negras) responderá automáticamente después de "pensar"
5. Si tu Rey está en jaque, debes resolverlo en tu siguiente movimiento
6. La partida termina con jaque mate (victoria/derrota) o empate

### Controles
- **Toca una pieza propia** → La selecciona y muestra movimientos
- **Toca otra pieza propia** → Cambia la selección
- **Toca una casilla vacía** → Deselecciona
- **Toca un punto verde** → Mueve la pieza ahí
- **Botón 💾** → Guarda la partida actual
- **Botón ✕** → Opciones para salir (guardar/descartar)

### Consejos para Niños
- Empieza por aprender cómo se mueve cada pieza
- En nivel Fácil el bot comete errores a propósito
- Protege siempre a tu Rey
- Intenta controlar el centro del tablero
- No pierdas tu Reina temprano, es la pieza más fuerte
- Si pierdes, no te preocupes, cada partida es práctica

---

## Arquitectura Técnica

### Navegación
La app usa un Stack Navigator con las siguientes rutas:
```
Splash → Profile (si es primera vez) → Home → Learn/Play/Achievements
                                                  ↓         ↓
                                           PieceLesson    Game
```

### Estado Global
- **ProfileContext**: Nombre, avatar, estadísticas de partidas
- **ProgressContext**: Lecciones completadas, logros, estrellas, partida guardada

Ambos persisten en AsyncStorage bajo las claves `chess_kids_profile` y `chess_kids_progress`.

### Motor de Ajedrez
- `chess.js` maneja toda la lógica: validación de movimientos, detección de jaque/mate, formato FEN
- El wrapper `chessEngine.js` expone funciones simplificadas para el UI
- El bot AI (`botAI.js`) usa el algoritmo minimax con evaluación posicional

### Bot AI - Niveles
- **Fácil**: 70% aleatorio, 30% intenta capturar
- **Medio**: 60% minimax (profundidad 2), 40% aleatorio
- **Difícil**: Minimax completo con poda alpha-beta (profundidad 3) y tablas de evaluación posicional

---

## Personalización

### Agregar iconos de la app
Reemplaza los archivos en `/assets/`:
- `icon.png` - Ícono de la app (1024x1024 px)
- `splash.png` - Pantalla de carga (1284x2778 px)
- `adaptive-icon.png` - Ícono adaptativo Android (1024x1024 px)

### Agregar más lecciones
Edita `src/utils/lessons.js` siguiendo la estructura existente de `LESSONS`.

### Ajustar dificultad del bot
Modifica los porcentajes y profundidades en `src/utils/botAI.js`.

---

## Licencia

Proyecto educativo. Uso libre para aprendizaje.
