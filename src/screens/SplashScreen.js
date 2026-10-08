import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { useProgress } from '../context/ProgressContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const { profile, loading: profileLoading } = useProfile();
  const { loading: progressLoading } = useProgress();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bounceLoopRef = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    bounceLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    bounceLoopRef.current.start();

    return () => {
      if (bounceLoopRef.current) bounceLoopRef.current.stop();
    };
  }, []);

  useEffect(() => {
    // Wait for BOTH contexts to finish loading before navigating
    if (profileLoading || progressLoading) return;

    const timer = setTimeout(() => {
      if (profile) {
        navigation.replace('Home');
      } else {
        navigation.replace('Profile');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [profileLoading, progressLoading, profile, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.piecesRow,
            { transform: [{ translateY: bounceAnim }] },
          ]}
        >
          ♔ ♕ ♗ ♘ ♖
        </Animated.Text>
        <Text style={styles.title}>Chess Kids</Text>
        <Text style={styles.subtitle}>¡Aprende Ajedrez Jugando! 🎮</Text>
        <Text style={styles.tagline}>Para pequeños campeones</Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>♟️ ♟️ ♟️ ♟️ ♟️ ♟️ ♟️ ♟️</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  piecesRow: {
    fontSize: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF8DC',
    marginTop: 10,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 8,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
  footerText: {
    fontSize: 24,
    letterSpacing: 4,
  },
});
