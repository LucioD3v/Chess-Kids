import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  BackHandler,
} from 'react-native';
import { Chess } from 'chess.js';
import ChessBoard from '../components/ChessBoard';
import { getBotMove } from '../utils/botAI';
import { getGameStatus } from '../utils/chessEngine';
import { useProfile } from '../context/ProfileContext';
import { useProgress } from '../context/ProgressContext';

const { width } = Dimensions.get('window');

const BOT_NAMES = {
  easy: { name: 'Botín', emoji: '🤖' },
  medium: { name: 'Robo', emoji: '🧠' },
  hard: { name: 'Mega', emoji: '👾' },
};

export default function GameScreen({ route, navigation }) {
  const { difficulty, resumeSaved } = route.params;
  const { profile, updateStats, AVATARS } = useProfile();
  const { progress, recordWin, saveGame, clearSavedGame } = useProgress();

  const [game, setGame] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [capturedByPlayer, setCapturedByPlayer] = useState([]);
  const [capturedByBot, setCapturedByBot] = useState([]);

  const celebrationAnim = useRef(new Animated.Value(0)).current;
  const botThinkingAnim = useRef(new Animated.Value(0)).current;

  // Refs for cleanup and guards
  const botTimerRef = useRef(null);
  const botLoopRef = useRef(null);
  const gameEndedRef = useRef(false);

  // Refs so callbacks always see current state without stale closures
  const gameRef = useRef(null);
  const moveCountRef = useRef(0);
  const capturedByPlayerRef = useRef([]);
  const capturedByBotRef = useRef([]);

  const avatar = AVATARS.find((a) => a.id === profile?.avatarId);
  const bot = BOT_NAMES[difficulty] || BOT_NAMES.easy;

  useEffect(() => {
    initGame();
    return () => {
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
      if (botLoopRef.current) botLoopRef.current.stop();
    };
  }, []);

  // Intercept Android hardware back to show the quit dialog instead of silently leaving
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (gameOver) return false; // allow default back when game is over
      handleQuit();
      return true; // prevent default back
    });
    return () => sub.remove();
  }, [gameOver]);

  // Keep refs in sync with state
  useEffect(() => { gameRef.current = game; }, [game]);
  useEffect(() => { moveCountRef.current = moveCount; }, [moveCount]);
  useEffect(() => { capturedByPlayerRef.current = capturedByPlayer; }, [capturedByPlayer]);
  useEffect(() => { capturedByBotRef.current = capturedByBot; }, [capturedByBot]);

  useEffect(() => {
    if (isBotThinking) {
      botLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(botThinkingAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(botThinkingAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      botLoopRef.current.start();
    } else {
      if (botLoopRef.current) {
        botLoopRef.current.stop();
        botLoopRef.current = null;
      }
      botThinkingAnim.setValue(0);
    }
  }, [isBotThinking]);

  const initGame = () => {
    if (resumeSaved && progress.savedGame) {
      try {
        const savedGame = new Chess(progress.savedGame.fen);
        setGame(savedGame);
        setMoveCount(progress.savedGame.moveCount || 0);
        setCapturedByPlayer(progress.savedGame.capturedByPlayer || []);
        setCapturedByBot(progress.savedGame.capturedByBot || []);
      } catch {
        // Corrupted FEN — discard the saved game and start fresh
        clearSavedGame();
        setGame(new Chess());
      }
    } else {
      setGame(new Chess());
    }
  };

  const handleGameEnd = async (status, finalGame) => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    setGameOver(true);
    await clearSavedGame();

    let result;
    if (status === 'checkmate') {
      if (finalGame.turn() === 'b') {
        result = 'win';
        await recordWin(difficulty);
        await updateStats(true);
        Animated.spring(celebrationAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
      } else {
        result = 'lose';
        await updateStats(false);
      }
    } else {
      result = 'draw';
      await updateStats(false);
    }

    setGameResult(result);
  };

  const makeBotMove = (currentGame) => {
    const botMove = getBotMove(currentGame, difficulty);
    if (!botMove) {
      setIsBotThinking(false);
      // Safety net: if there's no move the game must already be over
      const status = getGameStatus(currentGame);
      if (status !== 'playing' && status !== 'check') {
        handleGameEnd(status, currentGame);
      }
      return;
    }

    const gameCopy = new Chess(currentGame.fen());
    const move = gameCopy.move(botMove);

    if (move) {
      if (move.captured) {
        setCapturedByBot((prev) => [...prev, move.captured]);
      }

      setGame(gameCopy);
      setLastMove({ from: move.from, to: move.to });
      setMoveCount((prev) => prev + 1);

      const status = getGameStatus(gameCopy);
      if (status !== 'playing' && status !== 'check') {
        handleGameEnd(status, gameCopy);
      }
    }

    setIsBotThinking(false);
  };

  const handlePlayerMove = useCallback(
    (moveData) => {
      if (!game || gameOver || isBotThinking) return;
      if (game.turn() !== 'w') return;

      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: moveData.from,
        to: moveData.to,
        promotion: moveData.promotion || 'q',
      });

      if (!move) return;

      if (move.captured) {
        setCapturedByPlayer((prev) => [...prev, move.captured]);
      }

      setGame(gameCopy);
      setLastMove({ from: move.from, to: move.to });
      setMoveCount((prev) => prev + 1);

      const status = getGameStatus(gameCopy);
      if (status !== 'playing' && status !== 'check') {
        handleGameEnd(status, gameCopy);
        return;
      }

      setIsBotThinking(true);
      botTimerRef.current = setTimeout(() => {
        makeBotMove(gameCopy);
      }, 800 + Math.random() * 700);
    },
    [game, gameOver, isBotThinking, difficulty]
  );

  const handleSaveGame = async () => {
    if (!game || gameOver) return;
    await saveGame({
      fen: game.fen(),
      difficulty,
      moveCount,
      capturedByPlayer,
      capturedByBot,
      savedAt: new Date().toISOString(),
    });
    Alert.alert('💾 ¡Partida Guardada!', 'Puedes continuar después desde donde te quedaste.', [
      { text: '¡Genial!', onPress: () => navigation.goBack() },
    ]);
  };

  const handleNewGame = () => {
    if (botTimerRef.current) {
      clearTimeout(botTimerRef.current);
      botTimerRef.current = null;
    }
    gameEndedRef.current = false;
    setGame(new Chess());
    setLastMove(null);
    setGameOver(false);
    setGameResult(null);
    setMoveCount(0);
    setCapturedByPlayer([]);
    setCapturedByBot([]);
    setIsBotThinking(false);
    celebrationAnim.setValue(0);
  };

  const handleQuit = () => {
    // Pause the bot timer while the dialog is open to avoid saving a stale position
    if (botTimerRef.current) {
      clearTimeout(botTimerRef.current);
      botTimerRef.current = null;
      setIsBotThinking(false);
    }
    Alert.alert(
      '¿Salir de la partida?',
      '¿Quieres guardar antes de salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir sin guardar',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Guardar y salir',
          onPress: async () => {
            const currentGame = gameRef.current;
            if (!currentGame || gameOver) {
              navigation.goBack();
              return;
            }
            await saveGame({
              fen: currentGame.fen(),
              difficulty,
              moveCount: moveCountRef.current,
              capturedByPlayer: capturedByPlayerRef.current,
              capturedByBot: capturedByBotRef.current,
              savedAt: new Date().toISOString(),
            });
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  const getPieceEmoji = (type, color) => {
    const pieces = {
      wp: '♙', bp: '♟',
      wr: '♖', br: '♜',
      wn: '♘', bn: '♞',
      wb: '♗', bb: '♝',
      wq: '♕', bq: '♛',
      wk: '♔', bk: '♚',
    };
    return pieces[`${color}${type}`] || '';
  };

  return (
    <View style={styles.container}>
      {/* Top Bar - Bot Info */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.quitButton} onPress={handleQuit}>
          <Text style={styles.quitButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.botSection}>
          <Text style={styles.botEmoji}>{bot.emoji}</Text>
          <View>
            <Text style={styles.botName}>{bot.name}</Text>
            <Text style={styles.diffLabel}>{difficulty}</Text>
          </View>
          {isBotThinking && (
            <Animated.Text
              style={[
                styles.thinkingText,
                { opacity: botThinkingAnim },
              ]}
            >
              🤔 Pensando...
            </Animated.Text>
          )}
        </View>
        {/* Bot captures */}
        <View style={styles.capturedRow}>
          {capturedByBot.map((piece, i) => (
            <Text key={i} style={styles.capturedPiece}>
              {getPieceEmoji(piece, 'w')}
            </Text>
          ))}
        </View>
      </View>

      {/* Game Status */}
      {game.isCheck() && !gameOver && (
        <View style={styles.checkBanner}>
          <Text style={styles.checkText}>⚡ ¡JAQUE!</Text>
        </View>
      )}

      {/* Chess Board */}
      <View style={styles.boardSection}>
        <ChessBoard
          game={game}
          onMove={handlePlayerMove}
          playerColor="w"
          disabled={gameOver || isBotThinking}
          lastMove={lastMove}
        />
      </View>

      {/* Player Info */}
      <View style={styles.bottomBar}>
        <View style={styles.capturedRow}>
          {capturedByPlayer.map((piece, i) => (
            <Text key={i} style={styles.capturedPiece}>
              {getPieceEmoji(piece, 'b')}
            </Text>
          ))}
        </View>
        <View style={styles.playerSection}>
          <Text style={styles.playerEmoji}>{avatar?.emoji || '🎮'}</Text>
          <View>
            <Text style={styles.playerName}>{profile?.name}</Text>
            <Text style={styles.moveCountText}>Movimientos: {moveCount}</Text>
          </View>
        </View>
        {!gameOver && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveGame}>
            <Text style={styles.saveButtonText}>💾</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Game Over Overlay */}
      {gameOver && (
        <Animated.View
          style={[
            styles.gameOverOverlay,
            {
              transform: [
                {
                  scale: gameResult === 'win' ? celebrationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }) : 1,
                },
              ],
            },
          ]}
        >
          <View style={styles.gameOverCard}>
            {gameResult === 'win' && (
              <>
                <Text style={styles.gameOverEmoji}>🎉🏆🎉</Text>
                <Text style={styles.gameOverTitle}>¡GANASTE!</Text>
                <Text style={styles.gameOverSubtitle}>
                  ¡Felicidades, {profile?.name}! ¡Eres un campeón!
                </Text>
                <Text style={styles.starsEarned}>
                  +{difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3} ⭐
                </Text>
              </>
            )}
            {gameResult === 'lose' && (
              <>
                <Text style={styles.gameOverEmoji}>😊</Text>
                <Text style={styles.gameOverTitle}>¡Buen intento!</Text>
                <Text style={styles.gameOverSubtitle}>
                  {bot.name} ganó esta vez. ¡Sigue practicando!
                </Text>
              </>
            )}
            {gameResult === 'draw' && (
              <>
                <Text style={styles.gameOverEmoji}>🤝</Text>
                <Text style={styles.gameOverTitle}>¡Empate!</Text>
                <Text style={styles.gameOverSubtitle}>
                  ¡Muy bien jugado! Ninguno pudo ganar.
                </Text>
              </>
            )}

            <View style={styles.gameOverButtons}>
              <TouchableOpacity
                style={[styles.gameOverButton, styles.newGameButton]}
                onPress={handleNewGame}
              >
                <Text style={styles.gameOverButtonText}>🔄 Jugar de nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.gameOverButton, styles.exitButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.gameOverButtonText, { color: '#666' }]}>
                  🏠 Volver al menú
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quitButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff20',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  quitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botEmoji: {
    fontSize: 32,
  },
  botName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  diffLabel: {
    fontSize: 12,
    color: '#AAA',
    textTransform: 'capitalize',
  },
  thinkingText: {
    fontSize: 14,
    color: '#FFC107',
    marginLeft: 12,
  },
  capturedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    minHeight: 20,
  },
  capturedPiece: {
    fontSize: 16,
    marginRight: 2,
  },
  checkBanner: {
    backgroundColor: '#FF5722',
    paddingVertical: 6,
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  checkText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boardSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 8,
  },
  playerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerEmoji: {
    fontSize: 32,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  moveCountText: {
    fontSize: 12,
    color: '#AAA',
  },
  saveButton: {
    position: 'absolute',
    right: 16,
    bottom: 30,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 20,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  gameOverCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 340,
    elevation: 10,
  },
  gameOverEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  gameOverSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  starsEarned: {
    fontSize: 22,
    color: '#FF9800',
    fontWeight: 'bold',
    marginTop: 12,
  },
  gameOverButtons: {
    marginTop: 24,
    width: '100%',
    gap: 10,
  },
  gameOverButton: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  newGameButton: {
    backgroundColor: '#4CAF50',
  },
  exitButton: {
    backgroundColor: '#F5F5F5',
  },
  gameOverButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
