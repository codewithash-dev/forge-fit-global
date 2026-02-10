import { supabase } from './supabase';

export async function recordWorkout(userId: string, durationMinutes: number) {
  await supabase.from('workouts').insert({
    user_id: userId,
    duration: durationMinutes
  });

  const { count } = await supabase
    .from('workouts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const workoutCount = count ?? 0;
  await upsertAchievement(userId, 'workouts', workoutCount);

  const { data: recent } = await supabase
    .from('workouts')
    .select('created_at')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  await upsertAchievement(userId, 'weekly_streak', recent?.length ?? 0);
}

export async function upsertAchievement(userId: string, type: string, value: number) {
  await supabase.from('achievements').upsert(
    {
      user_id: userId,
      type,
      value
    },
    {
      onConflict: 'user_id,type'
    }
  );
}
