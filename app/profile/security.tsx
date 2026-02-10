import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, GRADIENT_GLOW_STRONG } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import LogoMark from '../../components/LogoMark';

export default function SecurityScreen() {
  const { session } = useAuth();

  const handleResetPassword = async () => {
    if (!session?.user?.email) return;
    await supabase.auth.resetPasswordForEmail(session.user.email, {
      redirectTo: 'fitforge-global://reset-password'
    });
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <LogoMark size={26} />
          <Text style={styles.title}>Security</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Password</Text>
          <Text style={styles.cardSubtitle}>Send yourself a password reset link.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
            <Text style={styles.primaryButtonText}>Send reset email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    height: 240
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 120
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
  },
  cardSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 14
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  }
});
