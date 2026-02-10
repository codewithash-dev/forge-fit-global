import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise } from '../../types/exercise';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { exerciseMedia } from '../../constants/exerciseMedia';
import { router } from 'expo-router';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const localMedia = exerciseMedia[exercise.id];

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push(`/exercise/${exercise.id}`)}
      >
        <LinearGradient
          colors={['rgba(201,168,76,0.22)', 'rgba(160,125,46,0.12)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{exercise.name}</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tagPrimary}>
                <Text style={styles.tagText}>{exercise.bodyPart.toUpperCase()}</Text>
              </View>
              <View style={styles.tagSecondary}>
                <Text style={styles.tagText}>{exercise.target.toUpperCase()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={localMedia?.image ?? { uri: exercise.gifUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: SIZES.padding
  },
  card: {
    borderRadius: SIZES.largeRadius,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 160,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: COLORS.cardBg
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    textTransform: 'capitalize',
    marginBottom: 12,
    maxWidth: '70%'
  },
  tagsContainer: {
    flexDirection: 'column',
    gap: 8
  },
  tagPrimary: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34,211,238,0.2)'
  },
  tagSecondary: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201,168,76,0.25)'
  },
  tagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
