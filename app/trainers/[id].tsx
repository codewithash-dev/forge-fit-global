import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { COLORS, SIZES } from '../../constants/theme';
import { trainers } from '../../constants/trainers';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../../components/LogoMark';

export default function TrainerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trainer = trainers.find((item) => item.id === id);

  if (!trainer) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trainer not found</Text>
      </View>
    );
  }

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

        <View style={styles.header}>
          <LogoMark size={36} style={styles.logo} />
          <Image source={trainer.image} style={styles.avatar} />
          <Text style={styles.name}>{trainer.name}</Text>
          <Text style={styles.specialty}>{trainer.specialty}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bio}>{trainer.bio}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Credentials</Text>
          <View style={styles.credentialRow}>
            {trainer.credentials.map((credential) => (
              <View key={credential} style={styles.credentialChip}>
                <Text style={styles.credentialText}>{credential}</Text>
              </View>
            ))}
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
    height: 280
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
    marginBottom: 24
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  logo: {
    marginBottom: 12
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800'
  },
  specialty: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 6
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 64
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10
  },
  bio: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 18
  },
  credentialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
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
