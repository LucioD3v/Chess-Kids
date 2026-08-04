import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressContext = createContext();

const INITIAL_PROGRESS = {
  lessonsCompleted: [],
  achievements: [],
  savedGame: null,
  totalStars: 0,
  easyWins: 0,
  mediumWins: 0,
  hardWins: 0,
};

const ACHIEVEMENTS = [
  { id: 'first_lesson', title: '¡Primera Lección!', description: 'Completaste tu primera lección', emoji: '📚', requirement: (p) => p.lessonsCompleted.length >= 1 },
  { id: 'all_pieces', title: 'Conocedor de Piezas', description: 'Aprendiste todas las piezas', emoji: '♟️', requirement: (p) => p.lessonsCompleted.length >= 6 },
  { id: 'first_win', title: '¡Primera Victoria!', description: 'Ganaste tu primera partida', emoji: '🏆', requirement: (p) => (p.easyWins + p.mediumWins + p.hardWins) >= 1 },
  { id: 'easy_master', title: 'Maestro Principiante', description: 'Ganaste 3 partidas en fácil', emoji: '🌟', requirement: (p) => p.easyWins >= 3 },
  { id: 'medium_player', title: 'Jugador Intermedio', description: 'Ganaste una partida en medio', emoji: '🎯', requirement: (p) => p.mediumWins >= 1 },
  { id: 'hard_player', title: '¡Campeón!', description: 'Ganaste una partida en difícil', emoji: '👑', requirement: (p) => p.hardWins >= 1 },
  { id: 'star_collector', title: 'Coleccionista', description: 'Conseguiste 10 estrellas', emoji: '⭐', requirement: (p) => p.totalStars >= 10 },
  { id: 'dedicated', title: 'Dedicado', description: 'Ganaste 10 partidas en total', emoji: '💪', requirement: (p) => (p.easyWins + p.mediumWins + p.hardWins) >= 10 },
];

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem('chess_kids_progress');
      if (data) {
        setProgress(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress) => {
    try {
      await AsyncStorage.setItem('chess_kids_progress', JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const completeLesson = async (lessonId) => {
    const updated = { ...progress };
    if (!updated.lessonsCompleted.includes(lessonId)) {
      updated.lessonsCompleted = [...updated.lessonsCompleted, lessonId];
      updated.totalStars += 1;
    }
    checkAchievements(updated);
    await saveProgress(updated);
  };

  const recordWin = async (difficulty) => {
    const updated = { ...progress };
    if (difficulty === 'easy') updated.easyWins += 1;
    else if (difficulty === 'medium') updated.mediumWins += 1;
    else if (difficulty === 'hard') updated.hardWins += 1;
    updated.totalStars += difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    checkAchievements(updated);
    await saveProgress(updated);
  };

  const checkAchievements = (currentProgress) => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (
        !currentProgress.achievements.includes(achievement.id) &&
        achievement.requirement(currentProgress)
      ) {
        currentProgress.achievements = [...currentProgress.achievements, achievement.id];
      }
    });
  };

  const saveGame = async (gameState) => {
    const updated = { ...progress, savedGame: gameState };
    await saveProgress(updated);
  };

  const clearSavedGame = async () => {
    const updated = { ...progress, savedGame: null };
    await saveProgress(updated);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        completeLesson,
        recordWin,
        saveGame,
        clearSavedGame,
        ACHIEVEMENTS,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
