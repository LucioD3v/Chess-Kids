import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();

const AVATARS = [
  { id: 'knight', emoji: '🐴', name: 'Caballito' },
  { id: 'cat', emoji: '🐱', name: 'Gatito' },
  { id: 'dragon', emoji: '🐲', name: 'Dragón' },
  { id: 'star', emoji: '⭐', name: 'Estrella' },
  { id: 'rocket', emoji: '🚀', name: 'Cohete' },
  { id: 'rainbow', emoji: '🌈', name: 'Arcoíris' },
  { id: 'lion', emoji: '🦁', name: 'León' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicornio' },
];

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('chess_kids_profile');
      if (data) {
        setProfile(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (newProfile) => {
    try {
      await AsyncStorage.setItem('chess_kids_profile', JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const createProfile = async (name, avatarId) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      avatarId,
      createdAt: new Date().toISOString(),
      gamesPlayed: 0,
      gamesWon: 0,
      currentLevel: 'easy',
    };
    await saveProfile(newProfile);
    return newProfile;
  };

  const updateStats = async (won) => {
    if (!profile) return;
    const updated = {
      ...profile,
      gamesPlayed: profile.gamesPlayed + 1,
      gamesWon: won ? profile.gamesWon + 1 : profile.gamesWon,
    };
    await saveProfile(updated);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        createProfile,
        updateStats,
        saveProfile,
        AVATARS,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
