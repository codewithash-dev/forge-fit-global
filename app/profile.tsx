import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, GRADIENT_GLOW } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BottomNav from '../components/BottomNav';
import { recordWorkout } from '../lib/achievements';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import LogoMark from '../components/LogoMark';

export default function ProfileScreen() {
  const { profile, session, signOut } = useAuth();
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [rewardsCount, setRewardsCount] = useState(0);
  const editScale = useSharedValue(1);
  const logScale = useSharedValue(1);

  const editAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: editScale.value }]
  }));
  const logAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logScale.value }]
  }));

  const displayName =
    profile?.name || profile?.username || session?.user?.email || 'Fit Forge Global member';
  const displayHandle = profile?.username ? `@${profile.username}` : session?.user?.email ?? 'Signed in';
  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    const loadCounts = async () => {
      if (!session?.user?.id) return;
      const userId = session.user.id;

      const { count: followers } = await supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('following_id', userId);

      const { count: following } = await supabase
        .from('follows')
        .select('id', { count: 'exact', head: true })
        .eq('follower_id', userId);

      const { count: rewards } = await supabase
        .from('achievements')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      setFollowersCount(followers ?? 0);
      setFollowingCount(following ?? 0);
      setRewardsCount(rewards ?? 0);
    };

    loadCounts();
  }, [session?.user?.id]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[...GRADIENT_GLOW]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(450).springify()} style={styles.header}>
          <LogoMark size={28} />
          <Image source={require('../assets/images/bodyParts/avatar.png')} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.handle}>{displayHandle}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>
        <Pressable
          onPressIn={() => (editScale.value = withSpring(0.96))}
          onPressOut={() => (editScale.value = withSpring(1))}
          onPress={() => {
            void Haptics.selectionAsync();
            router.push('/profile/edit');
          }}
        >
          <Animated.View style={[styles.editButton, editAnimatedStyle]}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </Animated.View>
        </Pressable>

        <Animated.View entering={FadeInUp.delay(120).duration(450).springify()} style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statChip}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/profile/followers');
            }}
          >
            <Text style={styles.statNumber}>{followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statChip}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/profile/following');
            }}
          >
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statChip}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/profile/rewards');
            }}
          >
            <Text style={styles.statNumber}>{rewardsCount}</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(180).duration(450).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>My achievements</Text>
          <View style={styles.card}>
            <Ionicons name="trophy" size={20} color={COLORS.white} />
            <Text style={styles.cardTitle}>Consistency streak</Text>
            <Text style={styles.cardSubtitle}>12 workouts in the last 30 days.</Text>
          </View>
          <Pressable
            onPressIn={() => (logScale.value = withSpring(0.96))}
            onPressOut={() => (logScale.value = withSpring(1))}
            onPress={() => {
            void Haptics.selectionAsync();
              if (session?.user?.id) {
                recordWorkout(session.user.id, 45).then(() => {
                  setRewardsCount((prev) => prev + 1);
                });
              }
            }}
          >
            <Animated.View style={[styles.logButton, logAnimatedStyle]}>
              <Text style={styles.logButtonText}>Log workout</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(240).duration(450).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>My statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={18} color={COLORS.white} />
              <Text style={styles.statValue}>18,900</Text>
              <Text style={styles.statLabel}>Calories burned</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="walk" size={18} color={COLORS.white} />
              <Text style={styles.statValue}>49,120</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="barbell" size={18} color={COLORS.white} />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={18} color={COLORS.white} />
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Goal progress</Text>
            <Text style={styles.cardSubtitle}>You completed 75% of your weekly target.</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(450).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/profile/preferences');
            }}
          >
            <Ionicons name="settings" size={20} color={COLORS.white} />
            <Text style={styles.cardTitle}>Preferences</Text>
            <Text style={styles.cardSubtitle}>Notifications, goals, privacy.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/profile/security');
            }}
          >
            <Ionicons name="shield-checkmark" size={20} color={COLORS.white} />
            <Text style={styles.cardTitle}>Security</Text>
            <Text style={styles.cardSubtitle}>Password, devices, recovery.</Text>
          </TouchableOpacity>
        </Animated.View>
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
    height: 260
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 120
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  headerInfo: {
    flex: 1
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800'
  },
  handle: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 4
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)',
    marginBottom: 20
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  logButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(212,85,58,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(212,85,58,0.5)',
    marginTop: 6
  },
  logButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  statChip: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center'
  },
  statNumber: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700'
  },
  statLabel: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 4
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  statValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10
  },
  statLabel: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 6
  },
  progressCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 12
  },
  progressFill: {
    width: '75%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.primary
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10
  },
  cardSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6
  }
});
