import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { LESSONS, SPECIAL_MOVES_LESSON, GAME_CONCEPTS } from '../utils/lessons';

export default function LearnScreen({ navigation }) {
  const { progress } = useProgress();

  const isLessonCompleted = (lessonId) => {
    return progress.lessonsCompleted.includes(lessonId);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📚 Aprende Ajedrez</Text>
        <Text style={styles.subtitle}>
          Conoce cada pieza y cómo se mueve
        </Text>
      </View>

      {/* Piece Lessons */}
      <Text style={styles.sectionTitle}>Las Piezas del Ajedrez</Text>
      <View style={styles.lessonGrid}>
        {LESSONS.map((lesson, index) => (
          <TouchableOpacity
            key={lesson.id}
            style={[
              styles.lessonCard,
              { borderColor: lesson.color },
              isLessonCompleted(lesson.id) && styles.completedCard,
            ]}
            onPress={() =>
              navigation.navigate('PieceLesson', { lessonId: lesson.id })
            }
            activeOpacity={0.7}
          >
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonEmoji}>{lesson.emoji}</Text>
              {isLessonCompleted(lesson.id) && (
                <Text style={styles.checkmark}>✅</Text>
              )}
            </View>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDesc}>{lesson.description}</Text>
            <View
              style={[styles.lessonNumber, { backgroundColor: lesson.color }]}
            >
              <Text style={styles.lessonNumberText}>{index + 1}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Special Moves Section */}
      <Text style={styles.sectionTitle}>✨ Jugadas Especiales</Text>
      <TouchableOpacity
        style={[styles.specialCard, { borderColor: SPECIAL_MOVES_LESSON.color }]}
        onPress={() =>
          navigation.navigate('PieceLesson', {
            lessonId: SPECIAL_MOVES_LESSON.id,
          })
        }
      >
        <Text style={styles.specialEmoji}>{SPECIAL_MOVES_LESSON.emoji}</Text>
        <View style={styles.specialContent}>
          <Text style={styles.specialTitle}>{SPECIAL_MOVES_LESSON.title}</Text>
          <Text style={styles.specialDesc}>
            {SPECIAL_MOVES_LESSON.description}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Game Concepts */}
      <Text style={styles.sectionTitle}>🎯 Conceptos Importantes</Text>
      {GAME_CONCEPTS.map((concept) => (
        <View key={concept.id} style={styles.conceptCard}>
          <Text style={styles.conceptEmoji}>{concept.emoji}</Text>
          <View style={styles.conceptContent}>
            <Text style={styles.conceptTitle}>{concept.title}</Text>
            <Text style={styles.conceptDesc}>{concept.description}</Text>
          </View>
        </View>
      ))}

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
  header: {
    marginBottom: 20,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  lessonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  lessonCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  completedCard: {
    backgroundColor: '#F1F8E9',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonEmoji: {
    fontSize: 36,
  },
  checkmark: {
    fontSize: 18,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  lessonDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  lessonNumber: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  specialCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  specialEmoji: {
    fontSize: 40,
    marginRight: 14,
  },
  specialContent: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  conceptCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  conceptEmoji: {
    fontSize: 30,
    marginRight: 14,
  },
  conceptContent: {
    flex: 1,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  conceptDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 40,
  },
});
