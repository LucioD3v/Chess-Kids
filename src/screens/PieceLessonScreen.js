import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useProgress } from '../context/ProgressContext';
import { LESSONS, SPECIAL_MOVES_LESSON } from '../utils/lessons';
import ChessBoard from '../components/ChessBoard';
import { createGame } from '../utils/chessEngine';

const { width } = Dimensions.get('window');

export default function PieceLessonScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const { completeLesson, progress } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);

  const isSpecialMoves = lessonId === 'special_moves';
  const lesson = isSpecialMoves
    ? SPECIAL_MOVES_LESSON
    : LESSONS.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lección no encontrada</Text>
      </View>
    );
  }

  const isCompleted = progress.lessonsCompleted.includes(lessonId);

  const handleComplete = async () => {
    await completeLesson(lessonId);
    navigation.goBack();
  };

  if (isSpecialMoves) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <View style={[styles.lessonHeader, { backgroundColor: lesson.color }]}>
          <Text style={styles.headerEmoji}>{lesson.emoji}</Text>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <Text style={styles.headerDesc}>{lesson.description}</Text>
        </View>

        {lesson.sections.map((section, index) => (
          <View key={index} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionEmoji}>{section.emoji}</Text>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <Text style={styles.sectionDesc}>{section.description}</Text>
            {section.rules.map((rule, i) => (
              <View key={i} style={styles.ruleRow}>
                <Text style={styles.ruleNumber}>{i + 1}</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        ))}

        {!isCompleted && (
          <TouchableOpacity
            style={[styles.completeButton, { backgroundColor: lesson.color }]}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>
              ✅ ¡Entendido! Completar lección
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    );
  }

  // Regular piece lesson
  const steps = [
    { type: 'intro', title: '¡Conóceme!' },
    { type: 'moves', title: '¿Cómo me muevo?' },
    { type: 'practice', title: '¡Practiquemos!' },
    { type: 'funfact', title: '¿Sabías que...?' },
  ];

  const renderStep = () => {
    switch (steps[currentStep].type) {
      case 'intro':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.introEmoji}>{lesson.emoji}</Text>
            <View style={styles.speechBubble}>
              <Text style={styles.introText}>{lesson.intro}</Text>
            </View>
          </View>
        );
      case 'moves':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.movesTitle}>Mis movimientos:</Text>
            {lesson.movements.map((move, index) => (
              <View key={index} style={styles.moveItem}>
                <View
                  style={[styles.moveNumber, { backgroundColor: lesson.color }]}
                >
                  <Text style={styles.moveNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.moveText}>{move}</Text>
              </View>
            ))}
          </View>
        );
      case 'practice':
        let practiceGame = null;
        try {
          practiceGame = createGame(lesson.practicePosition);
        } catch (e) {
          practiceGame = null;
        }
        return (
          <View style={styles.stepContent}>
            <Text style={styles.practiceTitle}>
              ¡Mira dónde puedo moverme!
            </Text>
            <Text style={styles.practiceHint}>
              Las casillas azules muestran mis movimientos posibles
            </Text>
            {practiceGame ? (
              <View style={styles.boardWrapper}>
                <ChessBoard
                  game={practiceGame}
                  disabled={true}
                  highlightSquares={lesson.highlightSquares}
                />
              </View>
            ) : (
              <Text style={styles.practiceHint}>
                {lesson.highlightSquares.join(', ')}
              </Text>
            )}
          </View>
        );
      case 'funfact':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.funFactEmoji}>🤯</Text>
            <View style={styles.funFactCard}>
              <Text style={styles.funFactTitle}>¡Dato Curioso!</Text>
              <Text style={styles.funFactText}>{lesson.funFact}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        {/* Lesson Header */}
        <View style={[styles.lessonHeader, { backgroundColor: lesson.color }]}>
          <Text style={styles.headerEmoji}>{lesson.emoji}</Text>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <Text style={styles.headerDesc}>{lesson.description}</Text>
        </View>

        {/* Progress Dots */}
        <View style={styles.progressDots}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && {
                  backgroundColor: lesson.color,
                  transform: [{ scale: 1.3 }],
                },
                index < currentStep && { backgroundColor: '#4CAF50' },
              ]}
            />
          ))}
        </View>

        {/* Step Title */}
        <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>

        {/* Step Content */}
        {renderStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.prevButtonText}>← Anterior</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }} />
        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: lesson.color }]}
            onPress={() => setCurrentStep(currentStep + 1)}
          >
            <Text style={styles.nextButtonText}>Siguiente →</Text>
          </TouchableOpacity>
        )}
        {currentStep === steps.length - 1 && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: '#4CAF50' }]}
            onPress={handleComplete}
          >
            <Text style={styles.nextButtonText}>
              {isCompleted ? '✅ ¡Repasado!' : '⭐ ¡Completar!'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    paddingBottom: 100,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A90D9',
    fontWeight: '600',
  },
  lessonHeader: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerDesc: {
    fontSize: 14,
    color: '#FFFFFFCC',
    marginTop: 4,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DDD',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepContent: {
    alignItems: 'center',
  },
  introEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  speechBubble: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    maxWidth: '90%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  introText: {
    fontSize: 17,
    color: '#333',
    lineHeight: 26,
    textAlign: 'center',
  },
  movesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  moveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
  },
  moveNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moveNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  moveText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  practiceHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  boardWrapper: {
    alignItems: 'center',
  },
  funFactEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  funFactCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFF176',
    maxWidth: '90%',
  },
  funFactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 8,
    textAlign: 'center',
  },
  funFactText: {
    fontSize: 16,
    color: '#5D4037',
    lineHeight: 24,
    textAlign: 'center',
  },
  navButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  prevButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  prevButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nextButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleNumber: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#00BCD4',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    marginRight: 10,
    overflow: 'hidden',
  },
  ruleText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 20,
  },
  completeButton: {
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bottomPadding: {
    height: 40,
  },
});
