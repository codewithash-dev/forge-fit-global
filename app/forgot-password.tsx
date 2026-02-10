import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, GRADIENT_GLOW_STRONG } from '../constants/theme';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router';
import LogoMark from '../components/LogoMark';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'fitforge-global://reset-password'
      });

      if (resetError) {
        throw resetError;
      }

      setMessage('Check your email for a password reset link.');
    } catch (err: any) {
      setError(err?.message ?? 'Unable to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[...GRADIENT_GLOW_STRONG]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <View style={styles.content}>
        <LogoMark size={48} style={styles.logo} />
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>We will send you a reset link</Text>

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
          onPress={handleReset}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>{loading ? 'Sending...' : 'Send reset link'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Back to login</Text>
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
    marginBottom: 20
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
