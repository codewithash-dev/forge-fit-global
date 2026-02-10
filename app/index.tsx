import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ImageSlider from '../components/carousel/ImageSlider';
import { COLORS, SIZES, GRADIENT_GLOW } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { bodyParts } from '../constants/bodyParts';
import { trainers } from '../constants/trainers';
import { useEffect, useMemo, useState } from 'react';
import BottomNav from '../components/BottomNav';
import { getDailyScripture, ScriptureEntry } from '../lib/scripture';

export default function HomeScreen() {
  const progress = 0.75;
  const [searchText, setSearchText] = useState('');
  const [scripture, setScripture] = useState<ScriptureEntry | null>(null);
  const [scriptureLoading, setScriptureLoading] = useState(false);

  const filteredTrainers = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return trainers;
    return trainers.filter((trainer) => trainer.name.toLowerCase().includes(query));
  }, [searchText, trainers]);

  const handleSearchSubmit = () => {
    const query = searchText.trim();
    if (!query) return;
    router.push({ pathname: '/exercises', params: { q: query } });
  };

  useEffect(() => {
    const loadScripture = async () => {
      setScriptureLoading(true);
      const entry = await getDailyScripture();
      setScripture(entry);
      setScriptureLoading(false);
    };
    loadScripture();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[...GRADIENT_GLOW]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.headerRow}>
          <View>
            <Text style={styles.scripturePageTitle}>Scripture</Text>
            <Text style={styles.scripturePageSub}>The Word that anchors your training</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </Animated.View>

        {/* Verse of the Day */}
        <Animated.View entering={FadeInUp.delay(120).duration(600).springify()} style={styles.scriptureSection}>
          <View style={styles.scriptureCard}>
            <View style={styles.scriptureHeader}>
              <Text style={styles.scriptureTitle}>✦ Verse of the Day</Text>
              <Ionicons name="book" size={16} color={COLORS.primary} />
            </View>
            {scriptureLoading ? (
              <Text style={styles.scriptureBody}>Loading verse...</Text>
            ) : scripture ? (
              <>
                <Text style={styles.scriptureBody}>{scripture.text}</Text>
                <Text style={styles.scriptureRef}>
                  {scripture.book} {scripture.chapter}:{scripture.verse}
                </Text>
              </>
            ) : (
              <Text style={styles.scriptureBody}>No scripture available yet.</Text>
            )}
          </View>
        </Animated.View>

        {/* Welcome Card */}
        <Animated.View entering={FadeInUp.delay(200).duration(600).springify()} style={styles.welcomeSection}>
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeHeader}>
              <View>
                <Text style={styles.welcomeTitle}>You have momentum</Text>
                <Text style={styles.welcomeSubtitle}>3 workouts this week</Text>
              </View>
              <View style={styles.welcomeBadge}>
                <Text style={styles.welcomeBadgeText}>+12%</Text>
              </View>
            </View>
            <Image
              source={require('../assets/images/bodyParts/welcome.png')}
              style={styles.welcomeImage}
            />
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>75% of weekly goal completed</Text>
          </View>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInUp.delay(260).duration(600).springify()} style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.gray} />
            <TextInput
              placeholder="Search workouts, trainers"
              placeholderTextColor={COLORS.gray}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearchSubmit}
              style={styles.searchInput}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearchSubmit}>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Image Slider */}
        <Animated.View entering={FadeInUp.delay(320).duration(600).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured workouts</Text>
            <TouchableOpacity onPress={() => router.push('/exercises')}>
              <Text style={styles.sectionAction}>See all</Text>
            </TouchableOpacity>
          </View>
          <ImageSlider />
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInUp.delay(360).duration(600).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick categories</Text>
            <TouchableOpacity onPress={() => router.push('/exercises')}>
              <Text style={styles.sectionAction}>Explore</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
            {bodyParts.map((part) => (
              <TouchableOpacity
                key={part.name}
                style={styles.categoryCard}
                onPress={() => router.push({ pathname: '/exercises', params: { bodyPart: part.name } })}
              >
                <Image source={part.image} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{part.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Start Training Button */}
        <Animated.View entering={FadeInUp.delay(400).duration(600).springify()} style={styles.ctaContainer}>
          <TouchableOpacity onPress={() => router.push('/exercises')} activeOpacity={0.8}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.ctaButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ctaContent}>
                <Ionicons name="barbell" size={26} color={COLORS.white} />
                <Text style={styles.ctaTitle}>Start Training</Text>
              </View>
              <Text style={styles.ctaSubtitle}>1000+ exercises to choose from</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View entering={FadeInUp.delay(500).duration(600).springify()} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(34,211,238,0.2)' }]}>
              <Ionicons name="walk" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.statNumber}>1,840</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(201,168,76,0.25)' }]}>
              <Ionicons name="trophy" size={20} color={COLORS.white} />
            </View>
            <Text style={styles.statNumber}>45%</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>
        </Animated.View>

        {/* Trainers */}
        <Animated.View entering={FadeInUp.delay(560).duration(600).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top trainers</Text>
            <TouchableOpacity onPress={() => router.push('/trainers')}>
              <Text style={styles.sectionAction}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trainersRow}>
            {filteredTrainers.map((trainer) => (
              <TouchableOpacity
                key={trainer.name}
                style={styles.trainerCard}
                onPress={() => router.push(`/trainers/${trainer.id}`)}
              >
                <Image source={trainer.image} style={styles.trainerAvatar} />
                <Text style={styles.trainerName}>{trainer.name}</Text>
                <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Calories Info */}
        <Animated.View entering={FadeInUp.delay(600).duration(600).springify()} style={styles.caloriesSection}>
          <View style={styles.caloriesCard}>
            <View style={styles.calorieRow}>
              <View style={styles.calorieDot} />
              <Text style={styles.calorieText}>1200 Kcal Target</Text>
            </View>
            <View style={styles.calorieRow}>
              <View style={[styles.calorieDot, { backgroundColor: COLORS.primary }]} />
              <Text style={styles.calorieText}>328 Kcal Burned</Text>
            </View>
            <View style={styles.calorieRow}>
              <View style={[styles.calorieDot, { backgroundColor: COLORS.secondary }]} />
              <Text style={styles.calorieText}>872 Kcal Remaining</Text>
            </View>
          </View>
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
    height: 360
  },
  header: {
    paddingTop: 48
  },
  headerRow: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  scripturePageTitle: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '900'
  },
  scripturePageSub: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 4
  },
  noticeRow: {
    paddingHorizontal: SIZES.padding * 1.5,
    alignItems: 'flex-end',
    marginBottom: 12
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  welcomeSection: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginBottom: 20
  },
  welcomeCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.largeRadius,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden'
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  welcomeTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700'
  },
  welcomeSubtitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 4
  },
  welcomeBadge: {
    backgroundColor: 'rgba(34,211,238,0.2)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  welcomeBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  welcomeImage: {
    position: 'absolute',
    right: -10,
    top: -20,
    width: 130,
    height: 130,
    opacity: 0.2
  },
  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8
  },
  progressText: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 8
  },
  searchSection: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginBottom: 8
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
  section: {
    marginTop: 8
  },
  sectionHeader: {
    paddingHorizontal: SIZES.padding * 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700'
  },
  sectionAction: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600'
  },
  scriptureSection: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginTop: 8,
    marginBottom: 4
  },
  scriptureCard: {
    backgroundColor: 'rgba(31,26,12,0.9)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.18)'
  },
  scriptureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  scriptureTitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  scriptureBody: {
    color: COLORS.primaryLight,
    fontSize: 13,
    lineHeight: 18
  },
  scriptureRef: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10
  },
  categoriesRow: {
    paddingHorizontal: SIZES.padding * 1.5,
    gap: 12
  },
  categoryCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: 110,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
    textTransform: 'capitalize'
  },
  ctaContainer: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginTop: 24,
    marginBottom: 24
  },
  ctaButton: {
    borderRadius: SIZES.largeRadius,
    padding: 24,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  ctaTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800'
  },
  ctaSubtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
    opacity: 0.7
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding * 1.5,
    gap: 16
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  statNumber: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4
  },
  statLabel: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '700'
  },
  trainersRow: {
    paddingHorizontal: SIZES.padding * 1.5,
    gap: 12
  },
  trainerCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  trainerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8
  },
  trainerName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
  },
  trainerSpecialty: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2
  },
  caloriesSection: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginTop: 24,
    marginBottom: 100
  },
  caloriesCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radius,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  calorieDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
    marginRight: 12
  },
  calorieText: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontWeight: '600'
  },
});
