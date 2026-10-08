import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function ProfileScreen({ navigation }) {
  const { createProfile, profile, saveProfile, AVATARS } = useProfile();
  const [name, setName] = useState(profile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatarId || null);
  const [saving, setSaving] = useState(false);
  const isEditing = !!profile;

  const handleSave = async () => {
    if (saving) return;
    if (!name.trim()) {
      Alert.alert('¡Oops!', '¡Necesitas escribir tu nombre! 📝');
      return;
    }
    if (!selectedAvatar) {
      Alert.alert('¡Oops!', '¡Elige tu personaje favorito! 🎭');
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await saveProfile({ ...profile, name: name.trim(), avatarId: selectedAvatar });
        navigation.goBack(); // return to HomeScreen without duplicating the stack
      } else {
        await createProfile(name.trim(), selectedAvatar);
        navigation.replace('Home');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isEditing && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>← Cancelar</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {isEditing ? '✏️ Editar Perfil' : '🎉 ¡Crea tu Perfil!'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditing
            ? 'Cambia tu nombre o personaje'
            : '¿Cómo te llamas, pequeño campeón?'}
        </Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tu nombre:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Escribe tu nombre aquí..."
            placeholderTextColor="#999"
            maxLength={20}
            autoCapitalize="words"
          />
        </View>

        {/* Avatar Selection */}
        <Text style={styles.sectionTitle}>Elige tu personaje:</Text>
        <View style={styles.avatarGrid}>
          {AVATARS.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarCard,
                selectedAvatar === avatar.id && styles.avatarSelected,
              ]}
              onPress={() => setSelectedAvatar(avatar.id)}
            >
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
              <Text style={styles.avatarName}>{avatar.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview */}
        {name.trim() && selectedAvatar && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>¡Así te verás!</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewEmoji}>
                {AVATARS.find((a) => a.id === selectedAvatar)?.emoji}
              </Text>
              <Text style={styles.previewName}>{name}</Text>
            </View>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? '⏳ Guardando...' : isEditing ? '💾 Guardar Cambios' : '🚀 ¡Empezar a Jugar!'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  avatarCard: {
    width: 80,
    height: 90,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
    elevation: 5,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  avatarName: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  preview: {
    marginTop: 24,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  previewEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  previewName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
