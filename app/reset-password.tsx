import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import LogoMark from '../components/LogoMark';

function parseParams(url: string) {
  const query = url.includes('#') ? url.split('#')[1] : url.split('?')[1];
  if (!query) return {};
  return query.split('&').reduce<Record<string, string>>((acc, pair) => {
    const [key, value] = pair.split('=');
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
    }
    return acc;
  }, {});
}

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleUrl = async (url: string) => {
      const params = parseParams(url);
      const accessToken = params.access_token;
      const refreshToken = params.refresh_token;

      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
      }
    };

    const init = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await handleUrl(initialUrl);
      }
    };

    const subscription = Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });

    init();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleUpdate = async () => {
    setError('');
    setStatus('');

    if (!password || password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setStatus('Password updated. You can log in now.');
    router.replace('/login');
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
        <Text style={styles.title}>Set new password</Text>
        <Text style={styles.subtitle}>Enter a new password for your account</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            placeholder="New password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={COLORS.gray}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {status ? <Text style={styles.successText}>{status}</Text> : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Update password</Text>
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
    marginTop: 10
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
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
