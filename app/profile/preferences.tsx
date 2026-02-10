import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useState } from 'react';
import LogoMark from '../../components/LogoMark';

export default function PreferencesScreen() {
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

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
        <View style={styles.titleRow}>
          <LogoMark size={26} />
          <Text style={styles.title}>Preferences</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Workout reminders</Text>
            <Switch value={workoutReminders} onValueChange={setWorkoutReminders} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Weekly summary</Text>
            <Switch value={weeklySummary} onValueChange={setWeeklySummary} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Private profile</Text>
            <Switch value={privateProfile} onValueChange={setPrivateProfile} />
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600'
  }
});
