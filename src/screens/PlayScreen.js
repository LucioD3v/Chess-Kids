import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { useProgress } from '../context/ProgressContext';

const DIFFICULTIES = [
  {
    id: 'easy',
    title: '🌱 Fácil',
    description: 'Para empezar, el bot juega tranquilo',
    color: '#4CAF50',
    botName: 'Botín el Amigable',
    botEmoji: '🤖',
    stars: '⭐',
  },
  {
    id: 'medium',
    title: '🔥 Medio',
    description: 'El bot piensa un poco más',
    color: '#FF9800',
    botName: 'Robo el Pensador',
    botEmoji: '🧠',
    stars: '⭐⭐',
  },
  {
    id: 'hard',
    title: '💎 Difícil',
    description: '¡El bot da todo su esfuerzo!',
    color: '#F44336',
    botName: 'Mega el Campeón',
    botEmoji: '👾',
    stars: '⭐⭐⭐',
  },
];

export default function PlayScreen({ navigation }) {
  const { profile, AVATARS } = useProfile();
  const { progress, clearSavedGame } = useProgress();

  const avatar = AVATARS.find((a) => a.id === profile?.avatarId);

  const handleStartGame = (difficulty) => {
    navigation.navigate('Game', { difficulty, resumeSaved: false });
  };

  const handleResumeSaved = () => {
    if (progress.savedGame) {
      navigation.navigate('Game', {
        difficulty: progress.savedGame.difficulty,
        resumeSaved: true,
      });
    }
  };

  const handleDeleteSaved = () => {
    Alert.alert(
      '¿Borrar partida guardada?',
      'No podrás recuperarla después',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: () => clearSavedGame(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🎮 ¡A Jugar!</Text>
      <Text style={styles.subtitle}>Elige la dificultad del bot</Text>

      {/* Saved Game */}
      {progress.savedGame && (
        <View style={styles.savedGameCard}>
          <View style={styles.savedGameHeader}>
            <Text style={styles.savedGameTitle}>💾 Partida Guardada</Text>
            <TouchableOpacity onPress={handleDeleteSaved}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.savedGameInfo}>
            Dificultad: {DIFFICULTIES.find((d) => d.id === progress.savedGame.difficulty)?.title || 'Fácil'}
          </Text>
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={handleResumeSaved}
          >
            <Text style={styles.resumeButtonText}>▶️ Continuar Partida</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Player Info */}
      <View style={styles.playerCard}>
        <Text style={styles.playerEmoji}>{avatar?.emoji || '🎮'}</Text>
        <Text style={styles.playerName}>{profile?.name}</Text>
        <Text style={styles.playerStats}>
          Victorias: {profile?.gamesWon || 0} / {profile?.gamesPlayed || 0}
        </Text>
      </View>

      <Text style={styles.vsText}>VS</Text>

      {/* Difficulty Cards */}
      {DIFFICULTIES.map((diff) => (
        <TouchableOpacity
          key={diff.id}
          style={[styles.difficultyCard, { borderLeftColor: diff.color }]}
          onPress={() => handleStartGame(diff.id)}
          activeOpacity={0.7}
        >
          <View style={styles.diffContent}>
            <View style={styles.diffHeader}>
              <Text style={styles.diffTitle}>{diff.title}</Text>
              <Text style={styles.diffStars}>{diff.stars}</Text>
            </View>
            <Text style={styles.diffDesc}>{diff.description}</Text>
            <View style={styles.botInfo}>
              <Text style={styles.botEmoji}>{diff.botEmoji}</Text>
              <Text style={styles.botName}>{diff.botName}</Text>
            </View>
          </View>
          <View style={[styles.playIcon, { backgroundColor: diff.color }]}>
            <Text style={styles.playIconText}>▶️</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Consejos antes de jugar:</Text>
        <Text style={styles.tipItem}>• Juegas con las piezas blancas (empiezas tú)</Text>
        <Text style={styles.tipItem}>• Toca una pieza para ver sus movimientos</Text>
        <Text style={styles.tipItem}>• Toca la casilla destino para mover</Text>
        <Text style={styles.tipItem}>• Puedes guardar tu partida en cualquier momento</Text>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A90D9',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  savedGameCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  savedGameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedGameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  deleteText: {
    fontSize: 20,
  },
  savedGameInfo: {
    fontSize: 14,
    color: '#1976D2',
    marginTop: 4,
  },
  resumeButton: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  resumeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  playerCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  playerEmoji: {
    fontSize: 40,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 6,
  },
  playerStats: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginVertical: 12,
  },
  difficultyCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  diffContent: {
    flex: 1,
  },
  diffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  diffTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  diffStars: {
    fontSize: 14,
  },
  diffDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  botInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  botName: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  playIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  playIconText: {
    fontSize: 18,
  },
  tipsCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFF176',
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F57F17',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#5D4037',
    marginBottom: 4,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 40,
  },
});
