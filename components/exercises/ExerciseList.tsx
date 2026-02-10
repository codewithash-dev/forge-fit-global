import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ExerciseCard from './ExerciseCard';
import { Exercise } from '../../types/exercise';
import { COLORS } from '../../constants/theme';

interface ExerciseListProps {
  exercises: Exercise[];
  loading: boolean;
}

export default function ExerciseList({ exercises, loading }: ExerciseListProps) {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (exercises.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Pick a plan to load exercises, then search</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContent}>
      {exercises.map((item, index) => (
        <ExerciseCard key={item.id} exercise={item} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 16
  },
  listContent: {
    paddingBottom: 100
  }
});
