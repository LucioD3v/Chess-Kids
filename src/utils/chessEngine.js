import { Chess } from 'chess.js';

/**
 * Creates a new chess game instance
 */
export function createGame(fen = undefined) {
  return new Chess(fen);
}

/**
 * Get all legal moves for the current position
 */
export function getLegalMoves(game, square = undefined) {
  if (square) {
    return game.moves({ square, verbose: true });
  }
  return game.moves({ verbose: true });
}

/**
 * Make a move on the board
 */
export function makeMove(game, move) {
  try {
    const result = game.move(move);
    return result;
  } catch (e) {
    return null;
  }
}

/**
 * Check game status
 */
export function getGameStatus(game) {
  if (game.isCheckmate()) return 'checkmate';
  if (game.isDraw()) return 'draw';
  if (game.isStalemate()) return 'stalemate';
  if (game.isCheck()) return 'check';
  if (game.isThreefoldRepetition()) return 'draw';
  if (game.isInsufficientMaterial()) return 'draw';
  return 'playing';
}

/**
 * Get the board as a 2D array for rendering
 */
export function getBoardArray(game) {
  const board = game.board();
  return board;
}

/**
 * Convert board position to algebraic notation
 */
export function posToSquare(row, col) {
  const files = 'abcdefgh';
  return `${files[col]}${8 - row}`;
}

/**
 * Convert algebraic notation to board position
 */
export function squareToPos(square) {
  const files = 'abcdefgh';
  const col = files.indexOf(square[0]);
  const row = 8 - parseInt(square[1]);
  return { row, col };
}
