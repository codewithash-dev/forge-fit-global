import { useState, useEffect } from 'react';
import { exerciseService } from '../services/exerciseService';
import { Exercise } from '../types/exercise';

export const useExercises = (bodyPart?: string) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bodyPart) {
      fetchExercises(bodyPart);
    } else {
      setExercises([]);
    }
  }, [bodyPart]);

  const fetchExercises = async (part: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await exerciseService.getExercisesByBodyPart(part);
      setExercises(data);
    } catch (err) {
      setError('Failed to fetch exercises');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { exercises, loading, error, refetch: fetchExercises };
};
