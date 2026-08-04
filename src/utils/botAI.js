import { Chess } from 'chess.js';

/**
 * Chess Bot AI with difficulty levels for kids
 * 
 * Easy: Makes mostly random moves with occasional blunders
 * Medium: Uses basic evaluation but sometimes picks sub-optimal moves
 * Hard: Uses minimax with alpha-beta pruning (depth 3)
 */

const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Position bonus tables for better positional play
const PAWN_TABLE = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const KNIGHT_TABLE = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
];

/**
 * Evaluate the board position
 */
function evaluateBoard(game) {
  const board = game.board();
  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;

      let value = PIECE_VALUES[piece.type] || 0;

      // Add positional bonus
      if (piece.type === 'p') {
        value += piece.color === 'w' ? PAWN_TABLE[row][col] : PAWN_TABLE[7 - row][col];
      } else if (piece.type === 'n') {
        value += piece.color === 'w' ? KNIGHT_TABLE[row][col] : KNIGHT_TABLE[7 - row][col];
      }

      score += piece.color === 'w' ? value : -value;
    }
  }

  return score;
}

/**
 * Minimax with alpha-beta pruning
 */
function minimax(game, depth, alpha, beta, isMaximizing) {
  if (depth === 0) return evaluateBoard(game);
  
  if (game.isGameOver()) {
    if (game.isCheckmate()) {
      return isMaximizing ? -99999 : 99999;
    }
    return 0; // Draw
  }

  const moves = game.moves();

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Get best move using minimax
 */
function getBestMove(game, depth = 3) {
  const moves = game.moves();
  if (moves.length === 0) return null;

  const isWhite = game.turn() === 'w';
  let bestMove = moves[0];
  let bestValue = isWhite ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    const value = minimax(game, depth - 1, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite && value > bestValue) {
      bestValue = value;
      bestMove = move;
    } else if (!isWhite && value < bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Get a random move
 */
function getRandomMove(game) {
  const moves = game.moves();
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

/**
 * Easy bot - mostly random with occasional captures
 * Makes mistakes on purpose to let kids win
 */
function getEasyMove(game) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // 70% random, 30% try to capture something
  if (Math.random() < 0.3) {
    const captures = moves.filter((m) => m.captured);
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)].san;
    }
  }

  return moves[Math.floor(Math.random() * moves.length)].san;
}

/**
 * Medium bot - basic evaluation with some randomness
 */
function getMediumMove(game) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // 40% chance to make a sub-optimal move
  if (Math.random() < 0.4) {
    return getEasyMove(game);
  }

  // Use shallow minimax (depth 2)
  return getBestMove(game, 2);
}

/**
 * Hard bot - full minimax with depth 3
 */
function getHardMove(game) {
  return getBestMove(game, 3);
}

/**
 * Main bot move function
 */
export function getBotMove(game, difficulty = 'easy') {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(game);
    case 'medium':
      return getMediumMove(game);
    case 'hard':
      return getHardMove(game);
    default:
      return getEasyMove(game);
  }
}
