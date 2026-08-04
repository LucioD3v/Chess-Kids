import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { getPieceComponent } from './ChessPieces';
import { posToSquare, squareToPos, getLegalMoves } from '../utils/chessEngine';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOARD_SIZE = Math.min(SCREEN_WIDTH - 32, 380);
const SQUARE_SIZE = BOARD_SIZE / 8;

const LIGHT_SQUARE = '#F0D9B5';
const DARK_SQUARE = '#B58863';
const SELECTED_COLOR = '#FFEB3B80';
const LEGAL_MOVE_COLOR = '#4CAF5060';
const LAST_MOVE_COLOR = '#66BB6A40';
const CHECK_COLOR = '#FF000060';

export default function ChessBoard({
  game,
  onMove,
  playerColor = 'w',
  disabled = false,
  highlightSquares = [],
  lastMove = null,
}) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const board = useMemo(() => game.board(), [game.fen()]);
  const isCheck = game.isCheck();
  const currentTurn = game.turn();

  const handleSquarePress = (row, col) => {
    if (disabled) return;
    if (currentTurn !== playerColor) return;

    const square = posToSquare(row, col);
    const piece = board[row][col];

    // If a piece is already selected
    if (selectedSquare) {
      // Check if the pressed square is a legal move destination
      const moveTarget = legalMoves.find((m) => m.to === square);
      
      if (moveTarget) {
        // Make the move
        onMove(moveTarget);
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // If clicking on own piece, select it instead
      if (piece && piece.color === playerColor) {
        selectPiece(square, row, col);
        return;
      }

      // Deselect
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // Select a piece
    if (piece && piece.color === playerColor) {
      selectPiece(square, row, col);
    }
  };

  const selectPiece = (square, row, col) => {
    setSelectedSquare(square);
    const moves = getLegalMoves(game, square);
    setLegalMoves(moves);
  };

  const getSquareColor = (row, col) => {
    return (row + col) % 2 === 0 ? LIGHT_SQUARE : DARK_SQUARE;
  };

  const getSquareHighlight = (row, col) => {
    const square = posToSquare(row, col);

    // Check highlight
    if (isCheck) {
      const piece = board[row][col];
      if (piece && piece.type === 'k' && piece.color === currentTurn) {
        return CHECK_COLOR;
      }
    }

    // Selected piece highlight
    if (selectedSquare === square) {
      return SELECTED_COLOR;
    }

    // Last move highlight
    if (lastMove && (lastMove.from === square || lastMove.to === square)) {
      return LAST_MOVE_COLOR;
    }

    // Custom highlight squares
    if (highlightSquares.includes(square)) {
      return '#4FC3F780';
    }

    return null;
  };

  const isLegalMoveSquare = (row, col) => {
    const square = posToSquare(row, col);
    return legalMoves.some((m) => m.to === square);
  };

  const renderSquare = (row, col) => {
    const squareColor = getSquareColor(row, col);
    const highlight = getSquareHighlight(row, col);
    const piece = board[row][col];
    const isLegalMove = isLegalMoveSquare(row, col);
    const hasPiece = piece !== null;

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          { backgroundColor: squareColor },
          highlight && { backgroundColor: highlight },
        ]}
        onPress={() => handleSquarePress(row, col)}
        activeOpacity={0.7}
      >
        {/* Legal move indicator */}
        {isLegalMove && !hasPiece && (
          <View style={styles.legalMoveDot} />
        )}
        {isLegalMove && hasPiece && (
          <View style={styles.captureIndicator} />
        )}

        {/* Piece */}
        {piece && (
          <View style={styles.pieceContainer}>
            {getPieceComponent(piece, SQUARE_SIZE * 0.85)}
          </View>
        )}

        {/* Coordinate labels */}
        {col === 0 && (
          <Text style={[styles.coordLabel, styles.rankLabel, { color: (row + col) % 2 === 0 ? DARK_SQUARE : LIGHT_SQUARE }]}>
            {8 - row}
          </Text>
        )}
        {row === 7 && (
          <Text style={[styles.coordLabel, styles.fileLabel, { color: (row + col) % 2 === 0 ? DARK_SQUARE : LIGHT_SQUARE }]}>
            {'abcdefgh'[col]}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const rows = [];
    const startRow = playerColor === 'w' ? 0 : 7;
    const endRow = playerColor === 'w' ? 8 : -1;
    const rowStep = playerColor === 'w' ? 1 : -1;

    for (let row = startRow; row !== endRow; row += rowStep) {
      const cols = [];
      const startCol = playerColor === 'w' ? 0 : 7;
      const endCol = playerColor === 'w' ? 8 : -1;
      const colStep = playerColor === 'w' ? 1 : -1;

      for (let col = startCol; col !== endCol; col += colStep) {
        cols.push(renderSquare(row, col));
      }
      rows.push(
        <View key={row} style={styles.row}>
          {cols}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.boardContainer}>
      <View style={styles.board}>{renderBoard()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#5D4037',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalMoveDot: {
    width: SQUARE_SIZE * 0.3,
    height: SQUARE_SIZE * 0.3,
    borderRadius: SQUARE_SIZE * 0.15,
    backgroundColor: LEGAL_MOVE_COLOR,
  },
  captureIndicator: {
    position: 'absolute',
    width: SQUARE_SIZE * 0.9,
    height: SQUARE_SIZE * 0.9,
    borderRadius: SQUARE_SIZE * 0.45,
    borderWidth: 3,
    borderColor: '#F4433680',
  },
  coordLabel: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: 'bold',
  },
  rankLabel: {
    top: 2,
    left: 2,
  },
  fileLabel: {
    bottom: 2,
    right: 2,
  },
});
