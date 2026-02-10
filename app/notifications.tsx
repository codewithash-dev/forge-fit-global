import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LogoMark from '../components/LogoMark';

const notifications = [
  {
    id: '1',
    title: 'Workout streak',
    message: 'You are 1 day away from a 7-day streak.',
    time: '2h ago'
  },
  {
    id: '2',
    title: 'New community post',
    message: 'Polly Strong shared a 12-minute HIIT session.',
    time: '4h ago'
  },
  {
    id: '3',
    title: 'Achievement unlocked',
    message: 'You completed 12 workouts this month.',
    time: '1d ago'
  }
];

export default function NotificationsScreen() {
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.titleRow}>
          <LogoMark size={28} />
          <Text style={styles.title}>Notifications</Text>
        </View>
        <Text style={styles.subtitle}>Recent activity and reminders</Text>

        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.message}</Text>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
        ))}
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 16
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 20
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
  cardBody: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6
  },
  cardTime: {
    color: COLORS.gray,
    fontSize: 11,
    marginTop: 8
  }
});
