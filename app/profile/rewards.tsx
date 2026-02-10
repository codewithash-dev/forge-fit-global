import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../../components/LogoMark';

type Achievement = {
  id: string;
  type: string;
  value: number;
  created_at: string;
};

export default function RewardsScreen() {
  const { session } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) return;
      const { data } = await supabase
        .from('achievements')
        .select('id, type, value, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setAchievements((data ?? []) as Achievement[]);
    };

    load();
  }, [session?.user?.id]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(201,168,76,0.35)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <LogoMark size={26} />
          <Ionicons name="trophy" size={20} color={COLORS.white} />
          <Text style={styles.title}>Rewards</Text>
        </View>

        {achievements.length === 0 ? (
          <Text style={styles.emptyText}>No rewards yet. Complete workouts to earn badges.</Text>
        ) : (
          achievements.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.type}</Text>
              <Text style={styles.cardSubtitle}>Value: {item.value}</Text>
            </View>
          ))
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800'
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 13
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
  },
  cardSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6
  }
});
