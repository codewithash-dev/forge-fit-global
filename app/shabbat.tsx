import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useMemo } from 'react';

const SHABBAT_VERSE =
  '"Remember the Sabbath day, to keep it set-apart. Six days you labour, and shall do all your work, but the seventh day is a Sabbath of YAHUAH."';

const RESOURCES = [
  { id: '1', icon: 'restaurant', name: 'Challah Recipe', desc: 'Traditional braided bread for Shabbat' },
  { id: '2', icon: 'body', name: 'Sabbath Stretch', desc: 'Gentle recovery · 15 min flow' },
  { id: '3', icon: 'book', name: 'Weekly Torah Portion', desc: 'Parashat Vayikra · Wayyiqra 1-5' },
  { id: '4', icon: 'musical-notes', name: 'Shabbat Worship Playlist', desc: 'Psalms-inspired instrumental rest' }
];

function getNextShabbatCountdown(): { days: number; hours: number; min: number } {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  // Friday = 5. Assume Shabbat starts Friday 6:12 PM (18:12).
  let days = (5 - day + 7) % 7;
  let hours = 18 - hour;
  let min = 12 - minute;
  if (days === 0 && (hour > 18 || (hour === 18 && minute >= 12))) {
    days = 7;
  }
  if (hours < 0) {
    hours += 24;
    if (days > 0) days--;
  }
  if (min < 0) {
    min += 60;
    hours--;
    if (hours < 0) {
      hours += 24;
      if (days > 0) days--;
    }
  }
  return { days: Math.max(0, days), hours: Math.max(0, hours), min: Math.max(0, min) };
}

export default function ShabbatScreen() {
  const countdown = useMemo(getNextShabbatCountdown, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(123,110,199,0.25)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450).springify()} style={styles.header}>
          <Text style={styles.title}>Shabbat</Text>
          <Text style={styles.subtitle}>Rest is obedience, not weakness</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(80).duration(450).springify()} style={styles.hero}>
          <LinearGradient
            colors={['#1c1840', '#13112a', '#13112a']}
            style={styles.heroGradient}
          >
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>✦ This Week</Text>
            </View>
            <Text style={styles.heroGreeting}>Shabbat Shalom</Text>
            <Text style={styles.heroTime}>Friday 6:12 PM — Saturday 6:12 PM</Text>
            <View style={styles.candleRow}>
              <Text style={styles.candle}>🕯️</Text>
              <Text style={styles.candle}>🕯️</Text>
            </View>
            <Text style={styles.heroVerse}>{SHABBAT_VERSE}</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(140).duration(450).springify()} style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>⏳ Next Shabbat Begins In</Text>
          <View style={styles.countdownRow}>
            <View style={styles.countdownUnit}>
              <Text style={styles.countdownNum}>{countdown.days}</Text>
              <Text style={styles.countdownUnitLabel}>Days</Text>
            </View>
            <Text style={styles.countdownSep}>:</Text>
            <View style={styles.countdownUnit}>
              <Text style={styles.countdownNum}>{countdown.hours}</Text>
              <Text style={styles.countdownUnitLabel}>Hours</Text>
            </View>
            <Text style={styles.countdownSep}>:</Text>
            <View style={styles.countdownUnit}>
              <Text style={styles.countdownNum}>{countdown.min}</Text>
              <Text style={styles.countdownUnitLabel}>Min</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(450).springify()}>
          <Text style={styles.sectionTitle}>🌙 Shabbat Resources</Text>
          {RESOURCES.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={styles.resourceCard}
              activeOpacity={0.8}
            >
              <View style={styles.resourceIcon}>
                <Ionicons name={r.icon as any} size={22} color={COLORS.shabbatLight} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>{r.name}</Text>
                <Text style={styles.resourceDesc}>{r.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </Animated.View>

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
    height: 280
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: SIZES.padding,
    paddingBottom: 24
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.shabbatLight
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2
  },
  hero: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(123,110,199,0.2)'
  },
  heroGradient: {
    padding: 28,
    alignItems: 'center'
  },
  heroPill: {
    backgroundColor: 'rgba(123,110,199,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.shabbatLight,
    letterSpacing: 0.5
  },
  heroGreeting: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.shabbatLight,
    marginBottom: 6
  },
  heroTime: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 16
  },
  candleRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16
  },
  candle: {
    fontSize: 28
  },
  heroVerse: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.lightGray,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 300
  },
  countdownCard: {
    backgroundColor: 'rgba(123,110,199,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(123,110,199,0.15)',
    borderRadius: 16,
    padding: 22,
    marginBottom: 24,
    alignItems: 'center'
  },
  countdownLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.15,
    color: COLORS.shabbatLight,
    marginBottom: 12
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  countdownUnit: {
    alignItems: 'center'
  },
  countdownNum: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.shabbatLight
  },
  countdownUnitLabel: {
    fontSize: 10,
    color: COLORS.gray,
    marginTop: 4,
    letterSpacing: 0.1
  },
  countdownSep: {
    fontSize: 20,
    color: 'rgba(123,110,199,0.4)',
    fontWeight: '300'
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.16,
    color: COLORS.shabbatLight,
    marginBottom: 12
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)'
  },
  resourceIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(123,110,199,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  resourceInfo: {
    flex: 1
  },
  resourceName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white
  },
  resourceDesc: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2
  }
});
