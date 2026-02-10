import { supabase } from './supabase';

export type ScriptureEntry = {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  source: string;
};

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export async function getDailyScripture() {
  const { count } = await supabase
    .from('scripture_entries')
    .select('id', { count: 'exact', head: true });

  if (!count || count <= 0) {
    return null;
  }

  const index = (getDayOfYear() - 1) % count;
  const { data } = await supabase
    .from('scripture_entries')
    .select('id, book, chapter, verse, text, source')
    .range(index, index)
    .single();

  if (!data) return null;
  const cleaned = String(data.text).replace(/^#\s*/, '').trim();
  return { ...(data as ScriptureEntry), text: cleaned };
}
