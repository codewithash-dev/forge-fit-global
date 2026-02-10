import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type Profile = {
  id: string;
  name: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string | null;
};

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, username, avatar_url, created_at')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        const fallbackUsername = session?.user?.email?.split('@')[0] ?? null;
        await supabase.from('profiles').upsert({
          id: userId,
          username: fallbackUsername,
          name: null
        });
        const { data: freshProfile } = await supabase
          .from('profiles')
          .select('id, name, username, avatar_url, created_at')
          .eq('id', userId)
          .single();
        setProfile((freshProfile ?? null) as Profile | null);
        return;
      }

      console.warn('Failed to load profile', error.message);
      setProfile(null);
      return;
    }

    setProfile(data as Profile);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      if (data.session?.user?.id) {
        await fetchProfile(data.session.user.id);
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, nextSession) => {
        setSession(nextSession);
        if (nextSession?.user?.id) {
          await fetchProfile(nextSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    init();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      profile,
      loading,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          throw error;
        }
      },
      signUp: async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        });

        if (error) {
          throw error;
        }

        if (data.user?.id) {
          const username = email.split('@')[0];
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            name,
            username,
            email
          });

          if (profileError) {
            console.warn('Profile upsert failed', profileError.message);
          }
        }
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      },
      refreshProfile: async () => {
        if (session?.user?.id) {
          await fetchProfile(session.user.id);
        }
      },
      updateProfile: async (updates) => {
        if (!session?.user?.id) return;
        const { error } = await supabase
          .from('profiles')
          .upsert(
            { id: session.user.id, ...updates },
            { onConflict: 'id' }
          );
        if (error) {
          throw error;
        }
        await fetchProfile(session.user.id);
      }
    }),
    [session, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
