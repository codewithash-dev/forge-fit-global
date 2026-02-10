import 'react-native-url-polyfill/auto';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const expoExtra = Constants.expoConfig?.extra ?? {};
const supabaseUrl = expoExtra.supabaseUrl as string | undefined;
const supabaseAnonKey = expoExtra.supabaseAnonKey as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Check app.json extra fields.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
