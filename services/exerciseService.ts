import { RAPID_API_KEY, RAPID_API_HOST } from '../constants/bodyParts';
import { Exercise } from '../types/exercise';

const BASE_URL = 'https://exercisedb.p.rapidapi.com';

const fetchAPI = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  });
  return response.json();
};

export const exerciseService = {
  getExercisesByBodyPart: async (bodyPart: string): Promise<Exercise[]> => {
    return fetchAPI(`/exercises/bodyPart/${bodyPart}?limit=20`);
  },

  getExerciseById: async (id: string): Promise<Exercise> => {
    return fetchAPI(`/exercises/exercise/${id}`);
  },

  getAllBodyParts: async (): Promise<string[]> => {
    return fetchAPI('/exercises/bodyPartList');
  }
};
