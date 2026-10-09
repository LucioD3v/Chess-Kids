# Chess Kids — Aprende Ajedrez Jugando

Aplicación móvil educativa desarrollada en **React Native + Expo** para que niños desde **4 años** aprendan a jugar ajedrez de forma divertida e interactiva. Funciona en iOS, Android y Web.

![Expo](https://img.shields.io/badge/Expo-57.x-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)
![License](https://img.shields.io/badge/License-Educational%20Use-green)

---

## Tabla de Contenidos

- [Inicio Rápido](#inicio-rápido)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Setup](#instalación-y-setup)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Instrucciones de Juego](#instrucciones-de-juego)
- [Arquitectura Técnica](#arquitectura-técnica)
- [Construcción para Producción](#construcción-para-producción)
- [Probar Build de Producción](#probar-build-de-producción)
- [Dependencias](#dependencias)
- [Personalización](#personalización)
- [Solución de Problemas](#solución-de-problemas)

---

## Inicio Rápido

```bash
git clone <url-del-repositorio>
cd chess-kids
npm install
npx expo start --clear
```

Escanea el código QR con **Expo Go** (disponible en App Store / Play Store) y la app corre en tu dispositivo al instante.

---

## Requisitos Previos

| Herramienta | Versión mínima | Notas |
|-------------|----------------|-------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Incluido con Node.js |
| Expo Go | última | App Store / Play Store |
| Android Studio | cualquier | Solo para emulador Android |
| Xcode | 14+ | Solo para emulador iOS (macOS) |

Expo CLI no requiere instalación global — se ejecuta con `npx`.

---

## Instalación y Setup

1. **Clona el repositorio:**

```bash
git clone <url-del-repositorio>
cd chess-kids
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Inicia el servidor de desarrollo:**

```bash
npx expo start --clear
```

4. **Abre la app en tu dispositivo:**

| Destino | Acción |
|---------|--------|
| Dispositivo físico | Escanea el QR con Expo Go |
| Android Emulator | Presiona `a` en la terminal |
| iOS Simulator (macOS) | Presiona `i` en la terminal |
| Navegador web | Presiona `w` en la terminal |

> **Kiro IDE**: Abre la carpeta `chess-kids` como workspace. El IDE detecta automáticamente el proyecto Node.js/Expo. Los cambios se reflejan en tiempo real gracias a Hot Reload. El proyecto usa JavaScript puro (sin TypeScript) para simplificar el desarrollo.

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo Expo |
| `npm run android` | Ejecuta directamente en Android |
| `npm run ios` | Ejecuta directamente en iOS (macOS) |
| `npm run web` | Abre en el navegador web |

---

## Estructura del Proyecto

```
chess-kids/
├── App.js                    # Punto de entrada — providers + stack navigator
├── app.json                  # Config de Expo (nombre, iconos, splash, bundle IDs)
├── babel.config.js           # Configuración de Babel (babel-preset-expo)
├── package.json              # Dependencias y scripts
│
├── assets/                   # Recursos estáticos
│   ├── icon.png              # Ícono de la app (1024×1024 px, sin transparencia)
│   ├── splash.png            # Pantalla de carga (1284×2778 px)
│   ├── adaptive-icon.png     # Ícono adaptativo Android (1024×1024 px)
│   └── sounds/               # Efectos de sonido
│       ├── move.wav           # Sonido al mover pieza
│       ├── capture.wav        # Sonido de captura
│       ├── check.wav          # Sonido de jaque
│       ├── win.wav            # Fanfara de victoria
│       └── lose.wav           # Sonido de derrota amigable
│
└── src/
    ├── components/
    │   ├── ChessBoard.js     # Tablero 8×8 con tap-to-move, selector de coronación
    │   └── ChessPieces.js    # 12 piezas SVG con diseño friendly para niños
    │
    ├── context/
    │   ├── ProfileContext.js # Perfil del niño (nombre, avatar, estadísticas)
    │   └── ProgressContext.js# Progreso: lecciones, logros, estrellas, partida guardada
    │
    ├── hooks/
    │   └── useSounds.js      # Hook de sonidos con expo-av (degradación elegante)
    │
    ├── screens/
    │   ├── SplashScreen.js         # Pantalla de carga con animaciones
    │   ├── ProfileScreen.js        # Crear/editar perfil + reinicio de progreso
    │   ├── HomeScreen.js           # Menú principal con barra de progreso
    │   ├── LearnScreen.js          # Lista de lecciones con badges
    │   ├── PieceLessonScreen.js    # Lección interactiva paso a paso
    │   ├── PlayScreen.js           # Selección de dificultad y partida guardada
    │   ├── GameScreen.js           # Tablero de juego vs bot con sonidos y tutorial
    │   ├── AchievementsScreen.js   # Logros y estadísticas
    │   └── AboutScreen.js          # Acerca de la app y redes sociales del desarrollador
    │
    └── utils/
        ├── botAI.js          # IA del bot: minimax con poda alpha-beta y límite de nodos
        ├── chessEngine.js    # Wrapper sobre chess.js
        └── lessons.js        # Contenido de lecciones (6 piezas + jugadas especiales)
```

---

## Funcionalidades

### Perfil del Jugador
- Crea tu perfil con nombre y avatar (8 emojis: Caballito, Gatito, Dragón, Estrella, Cohete, Arcoíris, León, Unicornio)
- Estadísticas de partidas jugadas y ganadas
- Perfil editable en cualquier momento
- **Reinicio de progreso** con doble confirmación (🗑️ en pantalla de perfil)

### Módulo de Aprendizaje
- **6 lecciones interactivas** (una por pieza): Peón, Torre, Caballo, Alfil, Reina, Rey
- Cada lección tiene **4 pasos**: Introducción → Movimientos → Práctica visual → Dato curioso
- **Lección adicional** de Jugadas Especiales: Enroque, Captura al Paso, Coronación, Jaque, Jaque Mate, Ahogado
- Progreso visual con indicadores de avance

### Juego vs Bot
- **3 niveles de dificultad** con bots con personalidad propia:

| Nivel | Bot | Estrategia |
|-------|-----|------------|
| Fácil | Botín el Amigable | 70% aleatorio, 30% busca capturas |
| Medio | Robo el Pensador | Minimax profundidad 2 con 40% de error |
| Difícil | Mega el Campeón | Minimax + alpha-beta, profundidad 2 + límite 3 000 nodos |

- El jugador siempre juega con las piezas blancas
- Indicador animado mientras el bot "piensa"
- Detección automática de jaque, jaque mate y empate
- **Selector de coronación** al llegar el peón al otro extremo (Reina, Torre, Alfil, Caballo)
- **Tutorial interactivo** de 3 pasos para la primera partida
- **Efectos de sonido** para mover, capturar, jaque, victoria y derrota (🔊/🔇 botón mute)

### Tablero Interactivo
- **Tap** para seleccionar pieza
- **Puntos verdes** para movimientos legales
- **Círculo rojo** para capturas posibles
- **Resaltado amarillo** en la pieza seleccionada
- **Resaltado verde** en la última jugada
- **Resaltado rojo** en el Rey cuando está en jaque
- Coordenadas del tablero (a-h, 1-8)

### Guardar Partida
- Guarda el estado completo (posición FEN, piezas capturadas, número de movimientos, dificultad)
- Continúa la partida guardada desde el menú de juego
- Un slot de guardado a la vez

### Logros y Progreso
- **8 logros desbloqueables** con emojis y predicados automáticos
- **Sistema de estrellas**: 1 por lección completada, 1/2/3 por victoria en fácil/medio/difícil
- Estadísticas desglosadas por nivel de dificultad
- Barra de progreso general en la pantalla principal

---

## Instrucciones de Juego

### Primeros Pasos
1. Crea tu perfil eligiendo un nombre y un avatar
2. Ve a **"Aprender"** y completa las lecciones en orden
3. Cuando te sientas listo, ve a **"Jugar"** y elige dificultad Fácil

### Cómo Jugar una Partida
1. Toca una de tus piezas (blancas) para seleccionarla
2. Los puntos verdes muestran las casillas válidas
3. Toca la casilla destino para ejecutar el movimiento
4. El bot (negras) responde automáticamente
5. Si tu Rey está en jaque, resuélvelo en tu siguiente turno
6. La partida termina con jaque mate o empate

### Controles
| Acción | Resultado |
|--------|-----------|
| Toca una pieza propia | Selecciona y muestra movimientos legales |
| Toca otra pieza propia | Cambia la selección |
| Toca una casilla vacía | Deselecciona |
| Toca un punto verde | Mueve la pieza |
| Botón 💾 | Guarda la partida |
| Botón ✕ | Opciones de salida (guardar / descartar) |

### Consejos
- Empieza conociendo cómo se mueve cada pieza antes de jugar
- En nivel Fácil, el bot comete errores a propósito — es normal ganar
- Protege siempre a tu Rey
- Intenta controlar el centro del tablero
- Cuida tu Reina — es la pieza más poderosa

---

## Arquitectura Técnica

### Flujo de Navegación

```
Splash ──► Profile (primera vez)
       └─► Home ──► Learn ──► PieceLesson
                ├─► Play  ──► Game
                ├─► Achievements
                └─► About
```

Todas las transiciones usan `slide_from_right`. Los headers de navegación están ocultos — cada pantalla controla su propia cabecera.

### Estado Global

| Contexto | Clave AsyncStorage | Datos |
|----------|--------------------|-------|
| `ProfileContext` | `chess_kids_profile` | nombre, avatarId, gamesPlayed, gamesWon, currentLevel |
| `ProgressContext` | `chess_kids_progress` | lessonsCompleted, achievements, savedGame, totalStars, wins por dificultad |

### Motor de Ajedrez

- **`chess.js`** maneja toda la lógica: validación de movimientos, detección de jaque/mate/ahogado, formato FEN/SAN
- **`chessEngine.js`** expone una API simplificada: `createGame`, `getLegalMoves`, `makeMove`, `getGameStatus`, `getBoardArray`, `posToSquare`, `squareToPos`
- **`botAI.js`** implementa `evaluateBoard` + `minimax` con tablas de valores posicionales (peón, caballo)

### Piezas SVG

Todas las piezas están dibujadas inline en `ChessPieces.js` usando `react-native-svg` — no se requieren archivos de imagen externos. Las piezas tienen diseño "friendly" con ojos y sonrisa.

---

## Construcción para Producción

El proyecto está configurado con Expo Managed Workflow. Para generar los binarios de producción se usa **EAS Build**:

1. Instala EAS CLI:

```bash
npm install -g eas-cli
```

2. Inicia sesión en Expo:

```bash
eas login
```

3. Configura EAS (solo la primera vez):

```bash
eas build:configure
```

4. Construye:

```bash
# Android (.aab para Play Store)
eas build --platform android --profile production

# iOS (.ipa para App Store)
eas build --platform ios --profile production
```

> Para builds de desarrollo/testing local, usa `expo run:android` o `expo run:ios` (requiere Android Studio / Xcode).

---

## Probar Build de Producción

Expo Go tiene limitaciones con módulos nativos (ej. expo-av). Para probar la app exactamente como se publicará en tienda, usa una de estas opciones:

### Opción A — Build local Android (gratis, sin cuenta de tienda)

Requiere Android Studio con un emulador configurado o un teléfono conectado por USB con depuración USB activada.

```bash
npx expo run:android
```

Compila e instala la app directamente. Todos los módulos nativos (sonido, hápticos) funcionan correctamente.

### Opción B — EAS Build preview (APK descargable, sin tienda)

Genera un APK listo para instalar en cualquier Android sin pasar por la Play Store:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Cuando termina (~10-15 min), EAS proporciona un enlace para descargar el `.apk` e instalarlo directamente.

### Opción C — Build local iOS

Requiere macOS con Xcode instalado.

```bash
npx expo run:ios
```

> **Nota:** Los archivos de sonido en `assets/sounds/` son placeholders silenciosos. Reemplázalos con audio real antes de publicar.

---

## Dependencias

### Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `expo` | ^57.0.10 | Framework cross-platform |
| `react` | 19.2.3 | Biblioteca UI |
| `react-native` | 0.86.2 | Runtime móvil nativo |
| `chess.js` | 1.0.0-beta.8 | Motor de ajedrez (reglas, FEN, validación) — versión fijada |
| `react-native-svg` | 15.15.4 | Renderizado de piezas SVG |
| `@react-navigation/native` | ^6.1.18 | Navegación entre pantallas |
| `@react-navigation/native-stack` | ^6.11.0 | Stack navigator con transiciones |
| `@react-native-async-storage/async-storage` | 2.2.0 | Persistencia local |
| `react-native-gesture-handler` | ~2.32.0 | Gestos táctiles |
| `expo-haptics` | ~57.0.1 | Retroalimentación háptica |
| `expo-av` | ~15.1.0 | Efectos de sonido |

### Dev Dependencies

| Paquete | Propósito |
|---------|-----------|
| `@babel/core` | Transpilación JavaScript |
| `@react-native-community/cli` | CLI nativa React Native |

---

## Personalización

### Reemplazar iconos de la app

Sustituye los archivos en `/assets/`:

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `icon.png` | 1024×1024 px | Ícono principal |
| `splash.png` | 1284×2778 px | Pantalla de carga |
| `adaptive-icon.png` | 1024×1024 px | Ícono adaptativo Android |

El color de fondo del splash se configura en `app.json` → `splash.backgroundColor`.

### Agregar lecciones

Edita `src/utils/lessons.js` siguiendo la estructura del array `LESSONS`. Cada lección requiere: `id`, `title`, `emoji`, `color`, `description`, `intro`, `movements[]`, `funFact`, `practicePosition` (FEN), `highlightSquares[]`.

### Ajustar dificultad del bot

Modifica en `src/utils/botAI.js`:
- `getBotMove`: porcentajes de comportamiento aleatorio vs minimax
- `minimax`: profundidad de búsqueda por nivel
- Tablas `PAWN_TABLE` / `KNIGHT_TABLE`: valores posicionales

### Agregar avatares

Agrega emojis al array `AVATARS` en `src/context/ProfileContext.js`.

---

## Solución de Problemas

**La app no carga / pantalla en blanco**
```bash
npx expo start --clear
```
Limpia la caché de Metro y reinicia el servidor.

**Error al instalar dependencias**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Expo Go muestra "Something went wrong" o "runtime not ready"**
- Actualiza Expo Go a la última versión (debe coincidir con SDK 57)
- Asegúrate de que tu dispositivo y la computadora estén en la **misma red Wi-Fi**
- Si usas VPN, desactívala temporalmente
- Para módulos nativos (sonido, hápticos), usa `npx expo run:android` en lugar de Expo Go

**Los sonidos no se escuchan**
- En Expo Go los sonidos pueden no funcionar por limitaciones de módulos nativos
- Usa `npx expo run:android` o un EAS Build para probar audio real
- Verifica que los archivos en `assets/sounds/` contengan audio real (no son los placeholders silenciosos)

**Error nativo en Android**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**Metro bundler lento o colgado**
```bash
npx expo start --clear --reset-cache
```

---

## Licencia

Proyecto educativo de código abierto. Uso libre para aprendizaje y enseñanza.
