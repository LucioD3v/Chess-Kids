import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ProfileProvider } from './src/context/ProfileContext';
import { ProgressProvider } from './src/context/ProgressContext';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import PieceLessonScreen from './src/screens/PieceLessonScreen';
import PlayScreen from './src/screens/PlayScreen';
import GameScreen from './src/screens/GameScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProfileProvider>
      <ProgressProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="PieceLesson" component={PieceLessonScreen} />
            <Stack.Screen name="Play" component={PlayScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProgressProvider>
    </ProfileProvider>
  );
}
