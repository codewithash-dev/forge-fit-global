import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, GRADIENT_GLOW_STRONG } from '../constants/theme';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import LogoMark from '../components/LogoMark';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      await signUp(email.trim(), password, name.trim());
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Signup failed');
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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join Fit Forge Global and track your progress</Text>

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
            placeholder="Create a password"
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
          onPress={handleSignup}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Creating account...' : 'Sign up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
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
    paddingTop: 110,
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
  }
});
