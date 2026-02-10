export type ExerciseMedia = {
  image?: number;
  video?: number;
};

// Map ExerciseDB IDs to local assets when you add them.
// Example:
// export const exerciseMedia: Record<string, ExerciseMedia> = {
//   '0001': { image: require('../assets/images/exercises/0001.jpg') },
//   '0001': { video: require('../assets/videos/exercises/0001.mp4') }
// };
export const exerciseMedia: Record<string, ExerciseMedia> = {
  '0007': {
    image: require('../assets/images/exercises/alternate-lateral-pulldown.jpg'),
    video: require('../assets/videos/alternate-lateral-pulldown.mp4')
  }
};
