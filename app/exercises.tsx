import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import BodyParts from '../components/exercises/BodyParts';
import ExerciseList from '../components/exercises/ExerciseList';
import { useExercises } from '../hooks/useExercises';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const STREAK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;
const STREAK_FILLED = 5;

export default function ForgeScreen() {
  const { q, bodyPart } = useLocalSearchParams<{ q?: string; bodyPart?: string }>();
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState(typeof q === 'string' ? q : '');
  const { exercises, loading } = useExercises(selectedBodyPart);

  useEffect(() => {
    if (typeof bodyPart === 'string' && bodyPart.length > 0) {
      setSelectedBodyPart(bodyPart);
    }
  }, [bodyPart]);

  const filteredExercises = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return exercises;
    return exercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(query) ||
        exercise.target.toLowerCase().includes(query) ||
        exercise.bodyPart.toLowerCase().includes(query)
      );
    });
  }, [exercises, searchQuery]);

  const handleSelectBodyPart = (part: string) => {
    setSelectedBodyPart(part);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(212,85,58,0.18)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.header}>
          <Text style={styles.title}>Forge</Text>
          <Text style={styles.subtitle}>Your body is a temple — train it like one</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(80).duration(450).springify()} style={styles.streakBar}>
          <Text style={styles.streakFire}>🔥</Text>
          <View style={styles.streakInfo}>
            <Text style={styles.streakNum}>12</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <View style={styles.streakDots}>
            {STREAK_DAYS.map((d, i) => (
              <View
                key={`day-${i}`}
                style={[styles.streakDot, i < STREAK_FILLED ? styles.streakDotDone : styles.streakDotEmpty]}
              >
                <Text style={[styles.streakDotText, i < STREAK_FILLED && styles.streakDotTextDone]}>{d}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(120).duration(450).springify()} style={styles.todayCard}>
          <LinearGradient
            colors={['#2a1510', '#1f100a', '#1a0d0a']}
            style={styles.todayGradient}
          >
            <View style={styles.todayPill}>
              <Text style={styles.todayPillText}>⚡ Today&apos;s Workout</Text>
            </View>
            <Text style={styles.todayName}>Temple Builder</Text>
            <View style={styles.todayMeta}>
              <Text style={styles.todayMetaText}>🕐 30 min</Text>
              <Text style={styles.todayMetaText}>💪 Full Body</Text>
              <Text style={styles.todayMetaText}>⚡ Intermediate</Text>
            </View>
            <View style={styles.muscleTags}>
              {['Chest', 'Legs', 'Core', 'Shoulders'].map((m) => (
                <View key={m} style={styles.muscleTag}>
                  <Text style={styles.muscleTagText}>{m}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => router.push('/exercises')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[COLORS.ember, '#B8442D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startBtnGradient}
              >
                <Ionicons name="play" size={18} color={COLORS.white} />
                <Text style={styles.startBtnText}>Begin Workout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(180).duration(450).springify()}>
          <Text style={styles.sectionTitle}>🗓️ This Week&apos;s Programs</Text>
        </Animated.View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.gray} />
            <TextInput
              placeholder="Search within your plan"
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
        </View>

        <BodyParts onSelectBodyPart={handleSelectBodyPart} />

        <View style={styles.listContainer}>
          <ExerciseList exercises={filteredExercises} loading={loading} />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomNav />
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
    height: 320
  },
  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: SIZES.padding,
    paddingBottom: 24
  },
  header: {
    marginBottom: 16
  },
  title: {
    color: COLORS.emberLight,
    fontSize: 26,
    fontWeight: '900'
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4
  },
  streakBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)'
  },
  streakFire: {
    fontSize: 28,
    marginRight: 14
  },
  streakInfo: {},
  streakNum: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.emberLight
  },
  streakLabel: {
    fontSize: 10,
    color: COLORS.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
    marginTop: 2
  },
  streakDots: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 'auto'
  },
  streakDot: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  streakDotDone: {
    backgroundColor: 'rgba(212,85,58,0.25)'
  },
  streakDotEmpty: {
    backgroundColor: COLORS.slate
  },
  streakDotText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(245,240,232,0.25)'
  },
  streakDotTextDone: {
    color: COLORS.emberLight
  },
  todayCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212,85,58,0.18)'
  },
  todayGradient: {
    padding: 24
  },
  todayPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,85,58,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12
  },
  todayPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.emberLight,
    letterSpacing: 0.5
  },
  todayName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.emberLight,
    marginBottom: 6
  },
  todayMeta: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14
  },
  todayMetaText: {
    fontSize: 12,
    color: COLORS.gray
  },
  muscleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18
  },
  muscleTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(212,85,58,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,85,58,0.15)'
  },
  muscleTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.emberLight,
    textTransform: 'uppercase',
    letterSpacing: 0.06
  },
  startBtn: {
    borderRadius: 14,
    overflow: 'hidden'
  },
  startBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14
  },
  startBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.08
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.16,
    color: COLORS.emberLight,
    marginBottom: 12
  },
  searchSection: {
    marginBottom: 12
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600'
  },
  listContainer: {
    marginTop: 8
  }
});
