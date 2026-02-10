import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import { trainers } from '../constants/trainers';
import { router } from 'expo-router';
import BottomNav from '../components/BottomNav';
import LogoMark from '../components/LogoMark';

export default function TrainersScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(201,168,76,0.3)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <LogoMark size={28} />
          <View>
            <Text style={styles.title}>Trainers</Text>
            <Text style={styles.subtitle}>Bios and credentials</Text>
          </View>
        </View>

        {trainers.map((trainer) => (
          <TouchableOpacity
            key={trainer.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push(`/trainers/${trainer.id}`)}
          >
            <View style={styles.cardHeader}>
              <Image source={trainer.image} style={styles.avatar} />
              <View style={styles.cardHeaderText}>
                <Text style={styles.name}>{trainer.name}</Text>
                <Text style={styles.specialty}>{trainer.specialty}</Text>
              </View>
            </View>
            <Text style={styles.bio}>{trainer.bio}</Text>
            <View style={styles.credentialRow}>
              {trainer.credentials.map((credential) => (
                <View key={credential} style={styles.credentialChip}>
                  <Text style={styles.credentialText}>{credential}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
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
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  cardHeaderText: {
    flex: 1
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700'
  },
  specialty: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4
  },
  bio: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 18
  },
  credentialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12
  },
  credentialChip: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  credentialText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  }
});
