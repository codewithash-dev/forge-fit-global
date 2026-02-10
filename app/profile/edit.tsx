import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import LogoMark from '../../components/LogoMark';

export default function ProfileEditScreen() {
  const { profile, session, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.name ?? '');
  const [username, setUsername] = useState(profile?.username ?? '');
  const [email, setEmail] = useState(session?.user?.email ?? '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError('');
    setMessage('');
    setSaving(true);
    try {
      if (email.trim() && email.trim() !== session?.user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email: email.trim() });
        if (emailError) {
          throw emailError;
        }
        setMessage('Check your inbox to confirm the new email address.');
      }

      await updateProfile({
        name: name.trim() || null,
        username: username.trim() || null
      });
      if (!message) {
        router.back();
      }
    } catch (err: any) {
      setError(err?.message ?? 'Unable to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(201,168,76,0.35)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <View style={styles.content}>
        <LogoMark size={48} style={styles.logo} />
        <Text style={styles.title}>Edit profile</Text>
        <Text style={styles.subtitle}>Update your details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Your name"
            placeholderTextColor={COLORS.gray}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="your_username"
            placeholderTextColor={COLORS.gray}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="you@email.com"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {message ? <Text style={styles.successText}>{message}</Text> : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>{saving ? 'Saving...' : 'Save changes'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darker
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: SIZES.padding * 1.5
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800'
  },
  logo: {
    marginBottom: 16
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 32
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    color: COLORS.lightGray,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
  },
  linkText: {
    color: COLORS.gray,
    fontSize: 13,
    textAlign: 'center'
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 12,
    marginBottom: 10
  },
  successText: {
    color: '#86EFAC',
    fontSize: 12,
    marginBottom: 10
  }
});
