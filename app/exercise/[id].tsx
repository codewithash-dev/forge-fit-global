import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { exerciseService } from '../../services/exerciseService';
import { Exercise } from '../../types/exercise';
import { Ionicons } from '@expo/vector-icons';
import { exerciseMedia } from '../../constants/exerciseMedia';
import { Video } from 'expo-av';
import LogoMark from '../../components/LogoMark';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;
      try {
        const data = await exerciseService.getExerciseById(id);
        setExercise(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  const localMedia = id ? exerciseMedia[id] : undefined;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Exercise not found</Text>
      </View>
    );
  }

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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <LogoMark size={28} />
          <Text style={styles.name}>{exercise.name}</Text>
        </View>
        <Text style={styles.idText}>Exercise ID: {exercise.id}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tagPrimary}>
            <Text style={styles.tagText}>{exercise.bodyPart.toUpperCase()}</Text>
          </View>
          <View style={styles.tagSecondary}>
            <Text style={styles.tagText}>{exercise.target.toUpperCase()}</Text>
          </View>
          <View style={styles.tagSecondary}>
            <Text style={styles.tagText}>{exercise.equipment.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.mediaCard}>
          {localMedia?.video ? (
            <Video
              source={localMedia.video}
              style={styles.media}
              useNativeControls
              resizeMode="cover"
              isLooping
            />
          ) : (
            <Image
              source={localMedia?.image ?? { uri: exercise.gifUrl }}
              style={styles.media}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {exercise.instructions.map((step, index) => (
            <View key={`${step}-${index}`} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Secondary muscles</Text>
          <View style={styles.chipRow}>
            {exercise.secondaryMuscles.map((muscle) => (
              <View key={muscle} style={styles.chip}>
                <Text style={styles.chipText}>{muscle}</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.darker,
    alignItems: 'center',
    justifyContent: 'center'
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 20
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 64
  },
  name: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'capitalize'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  idText: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12
  },
  tagPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(34,211,238,0.2)'
  },
  tagSecondary: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(201,168,76,0.25)'
  },
  tagText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  },
  mediaCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginTop: 20
  },
  media: {
    width: '100%',
    height: 220
  },
  sectionCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginTop: 20
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10
  },
  stepNumber: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    width: 20,
    height: 20,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(201,168,76,0.3)'
  },
  stepText: {
    color: COLORS.lightGray,
    fontSize: 13,
    lineHeight: 18,
    flex: 1
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  chipText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  }
});
