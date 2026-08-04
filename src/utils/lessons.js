/**
 * Chess lessons data for teaching kids about each piece
 * Each lesson has an introduction, how the piece moves, and practice exercises
 */

export const LESSONS = [
  {
    id: 'pawn',
    title: 'El Peón',
    emoji: '♟️',
    color: '#4CAF50',
    description: 'El soldadito valiente del ajedrez',
    intro: '¡Hola! Soy el Peón, el soldadito más valiente del tablero. Soy pequeño pero muy importante. ¡Hay 8 de nosotros en cada equipo!',
    movements: [
      'Avanzo un paso hacia adelante',
      'En mi primer movimiento puedo avanzar 2 pasos',
      'Capturo en diagonal (una casilla)',
      'Si llego al otro lado del tablero, ¡me convierto en otra pieza!',
    ],
    funFact: '¿Sabías que si un peón llega al final del tablero puede convertirse en una Reina? ¡Es como un superpoder!',
    practicePosition: '4k3/8/8/8/8/8/4P3/4K3 w - - 0 1',
    highlightSquares: ['e3', 'e4'],
  },
  {
    id: 'rook',
    title: 'La Torre',
    emoji: '🏰',
    color: '#2196F3',
    description: 'La fortaleza que se mueve en línea recta',
    intro: '¡Soy la Torre! Me muevo en líneas rectas como un tren en sus rieles. Puedo ir hacia arriba, abajo, izquierda o derecha, ¡todo lo que quiera!',
    movements: [
      'Me muevo en línea recta: arriba, abajo, izquierda o derecha',
      'Puedo mover tantas casillas como quiera en una dirección',
      'No puedo saltar sobre otras piezas',
      'Participo en una jugada especial llamada "enroque" con el Rey',
    ],
    funFact: '¡La Torre es una de las piezas más poderosas! Es como un carro de carreras que va recto por la pista.',
    practicePosition: '4k3/8/8/8/3R4/8/8/4K3 w - - 0 1',
    highlightSquares: ['d1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4'],
  },
  {
    id: 'knight',
    title: 'El Caballo',
    emoji: '🐴',
    color: '#FF9800',
    description: 'El saltarín que se mueve en L',
    intro: '¡Soy el Caballo! Mi movimiento es muy especial: salto en forma de "L". ¡Soy el único que puede saltar sobre otras piezas!',
    movements: [
      'Me muevo en forma de "L": 2 casillas en una dirección y 1 hacia un lado',
      'Puedo saltar sobre otras piezas (¡soy el único!)',
      'Siempre caigo en una casilla de color diferente',
      'Tengo 8 posibles casillas donde puedo saltar',
    ],
    funFact: '¡El Caballo es la pieza más traviesa! Como puede saltar, es perfecto para sorprender al oponente.',
    practicePosition: '4k3/8/8/8/3N4/8/8/4K3 w - - 0 1',
    highlightSquares: ['c6', 'e6', 'b5', 'f5', 'b3', 'f3', 'c2', 'e2'],
  },
  {
    id: 'bishop',
    title: 'El Alfil',
    emoji: '⛪',
    color: '#9C27B0',
    description: 'El corredor diagonal',
    intro: '¡Soy el Alfil! Me encanta moverme en diagonal. Siempre me quedo en casillas del mismo color. ¡Tenemos dos alfiles, uno para casillas blancas y otro para negras!',
    movements: [
      'Me muevo en diagonal, tantas casillas como quiera',
      'Siempre me quedo en casillas del mismo color',
      'No puedo saltar sobre otras piezas',
      'Cada equipo tiene un alfil de casillas blancas y otro de negras',
    ],
    funFact: '¡El Alfil es como un ninja que se mueve por las sombras diagonales! Cada alfil solo puede pisar la mitad de las casillas del tablero.',
    practicePosition: '4k3/8/8/8/3B4/8/8/4K3 w - - 0 1',
    highlightSquares: ['a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', 'a7', 'b6', 'c5', 'e3', 'f2', 'g1'],
  },
  {
    id: 'queen',
    title: 'La Reina',
    emoji: '👑',
    color: '#E91E63',
    description: 'La pieza más poderosa del tablero',
    intro: '¡Soy la Reina, la pieza más poderosa! Puedo moverme como la Torre Y como el Alfil. ¡Puedo ir a cualquier dirección!',
    movements: [
      'Me muevo en línea recta (como la Torre)',
      'Me muevo en diagonal (como el Alfil)',
      'Puedo mover tantas casillas como quiera',
      'No puedo saltar sobre otras piezas',
    ],
    funFact: '¡La Reina es la superheroína del ajedrez! Tiene los poderes de la Torre y el Alfil combinados. ¡Pero cuidado, si la pierdes será difícil ganar!',
    practicePosition: '4k3/8/8/8/3Q4/8/8/4K3 w - - 0 1',
    highlightSquares: ['d1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', 'a7', 'b6', 'c5', 'e3', 'f2', 'g1'],
  },
  {
    id: 'king',
    title: 'El Rey',
    emoji: '🤴',
    color: '#FFC107',
    description: 'La pieza más importante que debes proteger',
    intro: '¡Soy el Rey! Soy la pieza más importante del juego. Si me atrapan (jaque mate), ¡el juego termina! Me muevo despacio pero soy muy especial.',
    movements: [
      'Me muevo una sola casilla en cualquier dirección',
      'No puedo moverme a casillas donde me ataquen',
      'Puedo hacer el "enroque" con la Torre (movimiento especial)',
      '¡Si me dan jaque mate, pierdes la partida!',
    ],
    funFact: 'El Rey es como el presidente del equipo. No es el más fuerte, pero es el más importante. ¡Todo el equipo trabaja para protegerlo!',
    practicePosition: '4k3/8/8/8/3K4/8/8/8 w - - 0 1',
    highlightSquares: ['c5', 'd5', 'e5', 'c4', 'e4', 'c3', 'd3', 'e3'],
  },
];

export const SPECIAL_MOVES_LESSON = {
  id: 'special_moves',
  title: 'Jugadas Especiales',
  emoji: '✨',
  color: '#00BCD4',
  description: 'Aprende los movimientos mágicos del ajedrez',
  sections: [
    {
      title: 'El Enroque',
      description: 'El Rey y la Torre se mueven juntos para proteger al Rey.',
      rules: [
        'El Rey se mueve 2 casillas hacia la Torre',
        'La Torre salta sobre el Rey al otro lado',
        'Solo funciona si ni el Rey ni la Torre se han movido antes',
        'No puedes enrocar si estás en jaque',
      ],
      emoji: '🏰',
    },
    {
      title: 'Captura al Paso',
      description: 'Un peón puede capturar a otro peón que acaba de avanzar 2 casillas.',
      rules: [
        'Solo funciona con peones',
        'El peón rival debe haber avanzado 2 casillas en su último turno',
        'Tu peón captura como si el peón rival hubiera avanzado solo 1',
        'Solo puedes hacerlo inmediatamente después del avance',
      ],
      emoji: '👻',
    },
    {
      title: 'Coronación del Peón',
      description: '¡Cuando un peón llega al otro lado del tablero se transforma!',
      rules: [
        'El peón debe llegar a la última fila',
        'Se convierte en Reina, Torre, Alfil o Caballo',
        'Casi siempre elegimos la Reina (¡es la más fuerte!)',
        'Es como un premio por llegar hasta el final',
      ],
      emoji: '🦋',
    },
  ],
};

export const GAME_CONCEPTS = [
  {
    id: 'check',
    title: 'Jaque',
    emoji: '⚡',
    description: '¡Cuando el Rey está en peligro! Debes protegerlo moviendo el Rey, bloqueando el ataque, o capturando la pieza atacante.',
  },
  {
    id: 'checkmate',
    title: 'Jaque Mate',
    emoji: '🎯',
    description: '¡El Rey no puede escapar! Esto termina el juego. El jugador que da jaque mate gana.',
  },
  {
    id: 'stalemate',
    title: 'Ahogado',
    emoji: '😶',
    description: 'Cuando un jugador no tiene movimientos legales pero NO está en jaque. ¡Es empate!',
  },
];
