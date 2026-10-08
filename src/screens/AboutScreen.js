import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

const openLink = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'No se pudo abrir el enlace.');
    }
  } catch {
    Alert.alert('Error', 'No se pudo abrir el enlace.');
  }
};

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      {/* App logo section */}
      <View style={styles.logoSection}>
        <Text style={styles.logoEmoji}>♟️</Text>
        <Text style={styles.appName}>Aprende Ajedrez Jugando</Text>
        <Text style={styles.appVersion}>Versión 1.0.0</Text>
      </View>

      {/* Inspiration card */}
      <View style={styles.inspirationCard}>
        <Text style={styles.inspirationEmoji}>👦♟️</Text>
        <Text style={styles.inspirationText}>
          Esta app nació por amor a mi hijo <Text style={styles.inspirationName}>Gerardo</Text>.
          Verlo querer aprender ajedrez me inspiró a crear algo especial para él —
          un lugar donde los niños puedan descubrir este hermoso juego de una manera
          divertida y sin complicaciones.
        </Text>
      </View>

      {/* Developer card */}
      <View style={styles.devCard}>
        <Text style={styles.devLabel}>Desarrollado por</Text>
        <Text style={styles.devName}>Vicente G. Guzmán L.</Text>
        <Text style={styles.devTagline}>
          Desarrollador de software apasionado por crear experiencias educativas que marquen la vida de los niños.
        </Text>
      </View>

      {/* Social links */}
      <View style={styles.linksSection}>
        <Text style={styles.linksSectionTitle}>Encuéntrame en</Text>

        <TouchableOpacity
          style={[styles.linkCard, { borderLeftColor: '#4A90D9' }]}
          onPress={() => openLink('https://vicenteguzman.com')}
          activeOpacity={0.75}
        >
          <Text style={styles.linkIcon}>🌐</Text>
          <View style={styles.linkInfo}>
            <Text style={styles.linkTitle}>Sitio Web</Text>
            <Text style={styles.linkUrl}>vicenteguzman.com</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.linkCard, { borderLeftColor: '#E91E63' }]}
          onPress={() => openLink('https://www.instagram.com/chentechmx')}
          activeOpacity={0.75}
        >
          <Text style={styles.linkIcon}>📸</Text>
          <View style={styles.linkInfo}>
            <Text style={styles.linkTitle}>Instagram</Text>
            <Text style={styles.linkUrl}>@chentechmx</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.linkCard, { borderLeftColor: '#FF0000' }]}
          onPress={() => openLink('https://www.youtube.com/@AlexaNinja')}
          activeOpacity={0.75}
        >
          <Text style={styles.linkIcon}>▶️</Text>
          <View style={styles.linkInfo}>
            <Text style={styles.linkTitle}>YouTube</Text>
            <Text style={styles.linkUrl}>Alexa Ninja</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Hecho con ❤️ para pequeños campeones del ajedrez
        </Text>
        <Text style={styles.footerCopy}>© 2026 Vicente G. Guzmán L.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  logoSection: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingVertical: 30,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  logoEmoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 6,
  },
  inspirationCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE082',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  inspirationEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  inspirationText: {
    fontSize: 15,
    color: '#5D4037',
    textAlign: 'center',
    lineHeight: 23,
  },
  inspirationName: {
    fontWeight: 'bold',
    color: '#E65100',
  },
  devCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  devLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  devName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 10,
  },
  devTagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  linksSection: {
    marginBottom: 24,
  },
  linksSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  linkIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  linkInfo: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  linkUrl: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  linkArrow: {
    fontSize: 24,
    color: '#CCC',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerCopy: {
    fontSize: 12,
    color: '#BBB',
    marginTop: 6,
  },
});
