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

const PROMOTION_PIECES = [
  { piece: 'q', symbol: '♛', name: 'Reina' },
  { piece: 'r', symbol: '♜', name: 'Torre' },
  { piece: 'b', symbol: '♝', name: 'Alfil' },
  { piece: 'n', symbol: '♞', name: 'Caballo' },
];

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
  const [promotionMove, setPromotionMove] = useState(null);

  const { board, isCheck, currentTurn } = useMemo(() => ({
    board: game.board(),
    isCheck: game.isCheck(),
    currentTurn: game.turn(),
  }), [game.fen()]);

  const handleSquarePress = (row, col) => {
    if (disabled) return;
    if (currentTurn !== playerColor) return;

    const square = posToSquare(row, col);
    const piece = board[row][col];

    if (selectedSquare) {
      const moveTarget = legalMoves.find((m) => m.to === square);

      if (moveTarget) {
        setSelectedSquare(null);
        setLegalMoves([]);
        // Pawn promotion: let the player choose the piece
        if (moveTarget.promotion) {
          setPromotionMove(moveTarget);
          return;
        }
        onMove(moveTarget);
        return;
      }

      if (piece && piece.color === playerColor) {
        selectPiece(square, row, col);
        return;
      }

      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    if (piece && piece.color === playerColor) {
      selectPiece(square, row, col);
    }
  };

  const selectPiece = (square, row, col) => {
    setSelectedSquare(square);
    const moves = getLegalMoves(game, square);
    setLegalMoves(moves);
  };

  const handlePromotion = (piece) => {
    if (!promotionMove) return;
    onMove({ ...promotionMove, promotion: piece });
    setPromotionMove(null);
  };

  const getSquareColor = (row, col) => {
    return (row + col) % 2 === 0 ? LIGHT_SQUARE : DARK_SQUARE;
  };

  const getSquareHighlight = (row, col) => {
    const square = posToSquare(row, col);

    if (isCheck) {
      const piece = board[row][col];
      if (piece && piece.type === 'k' && piece.color === currentTurn) {
        return CHECK_COLOR;
      }
    }

    if (selectedSquare === square) {
      return SELECTED_COLOR;
    }

    if (lastMove && (lastMove.from === square || lastMove.to === square)) {
      return LAST_MOVE_COLOR;
    }

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
        {isLegalMove && !hasPiece && (
          <View style={styles.legalMoveDot} />
        )}
        {isLegalMove && hasPiece && (
          <View style={styles.captureIndicator} />
        )}

        {piece && (
          <View style={styles.pieceContainer}>
            {getPieceComponent(piece, SQUARE_SIZE * 0.85)}
          </View>
        )}

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

      {/* Promotion picker — appears over the board */}
      {promotionMove && (
        <View style={styles.promotionOverlay}>
          <View style={styles.promotionCard}>
            <Text style={styles.promotionTitle}>¡Tu peón llegó al final!</Text>
            <Text style={styles.promotionSubtitle}>¿En qué pieza lo conviertes?</Text>
            <View style={styles.promotionOptions}>
              {PROMOTION_PIECES.map(({ piece, symbol, name }) => (
                <TouchableOpacity
                  key={piece}
                  style={styles.promotionOption}
                  onPress={() => handlePromotion(piece)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.promotionSymbol}>{symbol}</Text>
                  <Text style={styles.promotionName}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
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
  promotionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.82)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  promotionCard: {
    backgroundColor: '#FFFDE7',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    width: '95%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
  },
  promotionSubtitle: {
    fontSize: 13,
    color: '#8D6E63',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  promotionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 8,
  },
  promotionOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#FFCA28',
    elevation: 2,
  },
  promotionSymbol: {
    fontSize: 28,
    color: '#1a1a2e',
  },
  promotionName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#5D4037',
    marginTop: 4,
  },
});
