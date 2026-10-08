import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { useProgress } from '../context/ProgressContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { profile, AVATARS } = useProfile();
  const { progress } = useProgress();

  const avatar = AVATARS.find((a) => a.id === profile?.avatarId);
  const totalGames = profile?.gamesPlayed || 0;
  const totalWins = profile?.gamesWon || 0;

  const menuItems = [
    {
      id: 'learn',
      title: '📚 Aprender',
      subtitle: 'Conoce las piezas y sus movimientos',
      color: '#4CAF50',
      screen: 'Learn',
      badge: `${progress.lessonsCompleted.length}/7`,
    },
    {
      id: 'play',
      title: '🎮 Jugar',
      subtitle: 'Reta al bot en una partida',
      color: '#2196F3',
      screen: 'Play',
      badge: progress.savedGame ? '💾' : null,
    },
    {
      id: 'achievements',
      title: '🏆 Logros',
      subtitle: 'Tus medallas y estrellas',
      color: '#FF9800',
      screen: 'Achievements',
      badge: `⭐ ${progress.totalStars}`,
    },
    {
      id: 'profile',
      title: '👤 Mi Perfil',
      subtitle: 'Edita tu personaje',
      color: '#9C27B0',
      screen: 'Profile',
      badge: null,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with profile */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>{avatar?.emoji || '🎮'}</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>¡Hola, {profile?.name}!</Text>
            <Text style={styles.stats}>
              🎯 {totalGames} partidas · 🏆 {totalWins} victorias
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Tu Progreso</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(
                  ((progress.lessonsCompleted.length + progress.easyWins + progress.mediumWins + progress.hardWins) / 20) * 100,
                  100
                )}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          ⭐ {progress.totalStars} estrellas · 🎖️ {progress.achievements.length} logros
        </Text>
      </View>

      {/* Menu Cards */}
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.menuCardContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            {item.badge && (
              <View style={[styles.badge, { backgroundColor: item.color }]}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Tips */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Consejo del día</Text>
        <Text style={styles.tipText}>
          {getTipOfDay()}
        </Text>
      </View>

      {/* About link */}
      <TouchableOpacity
        style={styles.aboutLink}
        onPress={() => navigation.navigate('About')}
        activeOpacity={0.6}
      >
        <Text style={styles.aboutLinkText}>ℹ️ Acerca de la app</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function getTipOfDay() {
  const tips = [
    '¡El caballo es la única pieza que puede saltar sobre las demás!',
    '¡Protege a tu Rey siempre! Si te dan jaque mate, pierdes.',
    'Los peones pueden convertirse en Reinas al llegar al otro lado.',
    '¡El centro del tablero es muy importante! Intenta controlarlo.',
    'La Reina es la pieza más fuerte. ¡No la pierdas fácilmente!',
    'El enroque es un movimiento especial que protege a tu Rey.',
    '¡Desarrolla tus piezas al inicio! Saca caballos y alfiles primero.',
  ];
  const dayIndex = new Date().getDate() % tips.length;
  return tips[dayIndex];
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
  header: {
    backgroundColor: '#4A90D9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  stats: {
    fontSize: 14,
    color: '#E3F2FD',
    marginTop: 4,
  },
  progressSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  menuGrid: {
    gap: 12,
    marginBottom: 16,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuCardContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: 'bold',
  },
  tipCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFF176',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F57F17',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: '#5D4037',
    lineHeight: 20,
  },
  aboutLink: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  aboutLinkText: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '500',
  },
});
