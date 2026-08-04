import React from 'react';
import Svg, { Path, Circle, Rect, G, Ellipse } from 'react-native-svg';

/**
 * Kid-friendly SVG chess pieces with fun, rounded designs
 * White pieces have warm colors, black pieces have cool colors
 */

const PIECE_SIZE = 40;

// White Pawn - Happy little soldier
export function WhitePawn({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Circle cx="22.5" cy="12" r="6" />
        <Path d="M 15 30 C 15 25 17 20 22.5 18 C 28 20 30 25 30 30 L 15 30 Z" />
        <Rect x="12" y="30" width="21" height="5" rx="2" />
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
      </G>
      {/* Happy face */}
      <Circle cx="20" cy="11" r="1" fill="#8B4513" />
      <Circle cx="25" cy="11" r="1" fill="#8B4513" />
      <Path d="M 20 14 Q 22.5 16 25 14" fill="none" stroke="#8B4513" strokeWidth="0.8" />
    </Svg>
  );
}

// Black Pawn
export function BlackPawn({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Circle cx="22.5" cy="12" r="6" />
        <Path d="M 15 30 C 15 25 17 20 22.5 18 C 28 20 30 25 30 30 L 15 30 Z" />
        <Rect x="12" y="30" width="21" height="5" rx="2" />
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
      </G>
      <Circle cx="20" cy="11" r="1" fill="#FFF" />
      <Circle cx="25" cy="11" r="1" fill="#FFF" />
      <Path d="M 20 14 Q 22.5 16 25 14" fill="none" stroke="#FFF" strokeWidth="0.8" />
    </Svg>
  );
}

// White Rook - Castle tower
export function WhiteRook({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Rect x="10" y="34" width="25" height="5" rx="2" />
        <Rect x="12" y="14" width="21" height="20" rx="2" />
        <Rect x="10" y="7" width="4" height="9" rx="1" />
        <Rect x="17" y="7" width="4" height="9" rx="1" />
        <Rect x="24" y="7" width="4" height="9" rx="1" />
        <Rect x="31" y="7" width="4" height="9" rx="1" />
      </G>
      {/* Little window */}
      <Rect x="19" y="22" width="7" height="8" rx="3.5" fill="#8B4513" opacity="0.3" />
    </Svg>
  );
}

// Black Rook
export function BlackRook({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Rect x="10" y="34" width="25" height="5" rx="2" />
        <Rect x="12" y="14" width="21" height="20" rx="2" />
        <Rect x="10" y="7" width="4" height="9" rx="1" />
        <Rect x="17" y="7" width="4" height="9" rx="1" />
        <Rect x="24" y="7" width="4" height="9" rx="1" />
        <Rect x="31" y="7" width="4" height="9" rx="1" />
      </G>
      <Rect x="19" y="22" width="7" height="8" rx="3.5" fill="#FFF" opacity="0.3" />
    </Svg>
  );
}

// White Knight - Cute horse
export function WhiteKnight({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Path d="M 14 37 L 14 28 C 14 20 18 14 22 10 C 24 8 28 7 30 9 C 33 12 32 16 30 20 L 33 20 C 35 20 36 22 35 24 L 32 30 L 32 37" />
        {/* Mane */}
        <Path d="M 18 14 C 16 12 17 10 19 11" fill="none" />
        <Path d="M 20 12 C 18 10 19 8 21 9" fill="none" />
      </G>
      {/* Eye */}
      <Circle cx="26" cy="14" r="2" fill="#8B4513" />
      <Circle cx="26.5" cy="13.5" r="0.8" fill="#FFF" />
      {/* Nostril */}
      <Circle cx="33" cy="22" r="1" fill="#8B4513" />
    </Svg>
  );
}

// Black Knight
export function BlackKnight({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Path d="M 14 37 L 14 28 C 14 20 18 14 22 10 C 24 8 28 7 30 9 C 33 12 32 16 30 20 L 33 20 C 35 20 36 22 35 24 L 32 30 L 32 37" />
        <Path d="M 18 14 C 16 12 17 10 19 11" fill="none" />
        <Path d="M 20 12 C 18 10 19 8 21 9" fill="none" />
      </G>
      <Circle cx="26" cy="14" r="2" fill="#FFF" />
      <Circle cx="26.5" cy="13.5" r="0.8" fill="#4A4A4A" />
      <Circle cx="33" cy="22" r="1" fill="#1A1A1A" />
    </Svg>
  );
}

// White Bishop - Pointy hat
export function WhiteBishop({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="15" y="32" width="15" height="6" rx="2" />
        <Ellipse cx="22.5" cy="25" rx="8" ry="10" />
        <Path d="M 22.5 7 L 18 17 C 18 17 22.5 15 27 17 L 22.5 7 Z" />
      </G>
      {/* Cross detail */}
      <Rect x="21.5" y="8" width="2" height="5" fill="#8B4513" rx="1" />
      <Rect x="20" y="10" width="5" height="2" fill="#8B4513" rx="1" />
      {/* Diagonal line */}
      <Path d="M 18 23 L 27 27" fill="none" stroke="#8B4513" strokeWidth="0.8" />
    </Svg>
  );
}

// Black Bishop
export function BlackBishop({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="15" y="32" width="15" height="6" rx="2" />
        <Ellipse cx="22.5" cy="25" rx="8" ry="10" />
        <Path d="M 22.5 7 L 18 17 C 18 17 22.5 15 27 17 L 22.5 7 Z" />
      </G>
      <Rect x="21.5" y="8" width="2" height="5" fill="#FFF" rx="1" />
      <Rect x="20" y="10" width="5" height="2" fill="#FFF" rx="1" />
      <Path d="M 18 23 L 27 27" fill="none" stroke="#FFF" strokeWidth="0.8" />
    </Svg>
  );
}

// White Queen - Crown
export function WhiteQueen({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="13" y="30" width="19" height="8" rx="3" />
        <Path d="M 13 30 L 10 12 L 16 20 L 22.5 8 L 29 20 L 35 12 L 32 30 Z" />
        {/* Crown jewels */}
        <Circle cx="10" cy="11" r="2.5" fill="#FF69B4" />
        <Circle cx="22.5" cy="7" r="2.5" fill="#FF69B4" />
        <Circle cx="35" cy="11" r="2.5" fill="#FF69B4" />
      </G>
    </Svg>
  );
}

// Black Queen
export function BlackQueen({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="13" y="30" width="19" height="8" rx="3" />
        <Path d="M 13 30 L 10 12 L 16 20 L 22.5 8 L 29 20 L 35 12 L 32 30 Z" />
        <Circle cx="10" cy="11" r="2.5" fill="#9C27B0" />
        <Circle cx="22.5" cy="7" r="2.5" fill="#9C27B0" />
        <Circle cx="35" cy="11" r="2.5" fill="#9C27B0" />
      </G>
    </Svg>
  );
}

// White King - Royal crown
export function WhiteKing({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="13" y="28" width="19" height="10" rx="3" />
        <Ellipse cx="22.5" cy="22" rx="9" ry="9" />
        {/* Cross on top */}
        <Rect x="21" y="5" width="3" height="10" rx="1.5" />
        <Rect x="18" y="7" width="9" height="3" rx="1.5" />
      </G>
      {/* Face */}
      <Circle cx="19" cy="21" r="1.5" fill="#8B4513" />
      <Circle cx="26" cy="21" r="1.5" fill="#8B4513" />
      <Path d="M 19 25 Q 22.5 28 26 25" fill="none" stroke="#8B4513" strokeWidth="1" />
    </Svg>
  );
}

// Black King
export function BlackKing({ size = PIECE_SIZE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
      <G fill="#4A4A4A" stroke="#1A1A1A" strokeWidth="1.5">
        <Ellipse cx="22.5" cy="37" rx="12" ry="4" />
        <Rect x="13" y="28" width="19" height="10" rx="3" />
        <Ellipse cx="22.5" cy="22" rx="9" ry="9" />
        <Rect x="21" y="5" width="3" height="10" rx="1.5" />
        <Rect x="18" y="7" width="9" height="3" rx="1.5" />
      </G>
      <Circle cx="19" cy="21" r="1.5" fill="#FFF" />
      <Circle cx="26" cy="21" r="1.5" fill="#FFF" />
      <Path d="M 19 25 Q 22.5 28 26 25" fill="none" stroke="#FFF" strokeWidth="1" />
    </Svg>
  );
}

/**
 * Get the appropriate piece component for a given piece
 * @param {object} piece - { type: 'p'|'r'|'n'|'b'|'q'|'k', color: 'w'|'b' }
 * @param {number} size - Size of the piece
 */
export function getPieceComponent(piece, size = PIECE_SIZE) {
  if (!piece) return null;
  
  const key = `${piece.color}${piece.type}`;
  
  const components = {
    wp: <WhitePawn size={size} />,
    bp: <BlackPawn size={size} />,
    wr: <WhiteRook size={size} />,
    br: <BlackRook size={size} />,
    wn: <WhiteKnight size={size} />,
    bn: <BlackKnight size={size} />,
    wb: <WhiteBishop size={size} />,
    bb: <BlackBishop size={size} />,
    wq: <WhiteQueen size={size} />,
    bq: <BlackQueen size={size} />,
    wk: <WhiteKing size={size} />,
    bk: <BlackKing size={size} />,
  };

  return components[key] || null;
}
