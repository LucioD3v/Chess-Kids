import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { useProfile } from '../context/ProfileContext';

export default function AchievementsScreen({ navigation }) {
  const { progress, ACHIEVEMENTS } = useProgress();
  const { profile, AVATARS } = useProfile();

  const avatar = AVATARS.find((a) => a.id === profile?.avatarId);
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = progress.achievements.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🏆 Mis Logros</Text>

      {/* Stats Summary */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statValue}>{progress.totalStars}</Text>
          <Text style={styles.statLabel}>Estrellas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🎖️</Text>
          <Text style={styles.statValue}>
            {unlockedCount}/{totalAchievements}
          </Text>
          <Text style={styles.statLabel}>Logros</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🎮</Text>
          <Text style={styles.statValue}>
            {progress.easyWins + progress.mediumWins + progress.hardWins}
          </Text>
          <Text style={styles.statLabel}>Victorias</Text>
        </View>
      </View>

      {/* Wins Breakdown */}
      <View style={styles.winsCard}>
        <Text style={styles.winsTitle}>Victorias por dificultad</Text>
        <View style={styles.winsRow}>
          <View style={[styles.winBadge, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.winBadgeEmoji}>🌱</Text>
            <Text style={styles.winBadgeCount}>{progress.easyWins}</Text>
            <Text style={styles.winBadgeLabel}>Fácil</Text>
          </View>
          <View style={[styles.winBadge, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.winBadgeEmoji}>🔥</Text>
            <Text style={styles.winBadgeCount}>{progress.mediumWins}</Text>
            <Text style={styles.winBadgeLabel}>Medio</Text>
          </View>
          <View style={[styles.winBadge, { backgroundColor: '#FFEBEE' }]}>
            <Text style={styles.winBadgeEmoji}>💎</Text>
            <Text style={styles.winBadgeCount}>{progress.hardWins}</Text>
            <Text style={styles.winBadgeLabel}>Difícil</Text>
          </View>
        </View>
      </View>

      {/* Lessons Progress */}
      <View style={styles.lessonsCard}>
        <Text style={styles.lessonsTitle}>📚 Lecciones completadas</Text>
        <View style={styles.lessonsProgress}>
          <View style={styles.lessonsBarContainer}>
            <View
              style={[
                styles.lessonsBar,
                { width: `${(progress.lessonsCompleted.length / 6) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.lessonsCount}>
            {progress.lessonsCompleted.length}/6
          </Text>
        </View>
      </View>

      {/* Achievements Grid */}
      <Text style={styles.sectionTitle}>Tus Medallas</Text>
      <View style={styles.achievementsGrid}>
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = progress.achievements.includes(achievement.id);
          return (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !isUnlocked && styles.achievementLocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>
                {isUnlocked ? achievement.emoji : '🔒'}
              </Text>
              <Text
                style={[
                  styles.achievementTitle,
                  !isUnlocked && styles.lockedText,
                ]}
              >
                {achievement.title}
              </Text>
              <Text
                style={[
                  styles.achievementDesc,
                  !isUnlocked && styles.lockedText,
                ]}
              >
                {achievement.description}
              </Text>
              {isUnlocked && <Text style={styles.unlockedBadge}>✅</Text>}
            </View>
          );
        })}
      </View>

      {/* Motivation */}
      <View style={styles.motivationCard}>
        <Text style={styles.motivationEmoji}>{avatar?.emoji || '🎮'}</Text>
        <Text style={styles.motivationText}>
          {unlockedCount === totalAchievements
            ? '🎉 ¡Increíble! ¡Has desbloqueado todos los logros! ¡Eres un verdadero campeón!'
            : unlockedCount > totalAchievements / 2
            ? '🌟 ¡Vas muy bien! ¡Sigue jugando para desbloquear todos los logros!'
            : '💪 ¡Sigue practicando! Cada partida te acerca más a nuevos logros.'}
        </Text>
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
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 28,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  winsCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  winsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  winsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  winBadge: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: '30%',
  },
  winBadgeEmoji: {
    fontSize: 24,
  },
  winBadgeCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  winBadgeLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  lessonsCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lessonsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  lessonsProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lessonsBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  lessonsBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  lessonsCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  achievementLocked: {
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  lockedText: {
    color: '#999',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 14,
  },
  motivationCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  motivationEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 15,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomPadding: {
    height: 40,
  },
});
