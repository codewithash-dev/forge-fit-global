import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, GRADIENT_GLOW_STRONG } from '../constants/theme';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import LogoMark from '../components/LogoMark';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const logoSize = Math.min(Dimensions.get('window').width * 0.8, 320);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
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
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to your Fit Forge Global account</Text>

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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Log in'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.linkText}>New here? Create an account</Text>
        </TouchableOpacity>
        <LogoMark size={logoSize} visible style={styles.bottomLogo} />
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
  bottomLogo: {
    alignSelf: 'center',
    marginTop: 18
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
    textAlign: 'center',
    marginTop: 6
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 12,
    marginBottom: 10
  }
});
