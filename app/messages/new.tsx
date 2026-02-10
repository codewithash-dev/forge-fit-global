import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../../components/LogoMark';

type Profile = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
};

export default function NewMessageScreen() {
  const { session } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[]>([]);

  const handleSearch = async () => {
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('id, name, username, email')
      .or(`name.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`)
      .limit(20);

    setResults((data ?? []).filter((item) => item.id !== session?.user?.id) as Profile[]);
  };

  const handleStartChat = async (profileId: string) => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .or(`and(user_a.eq.${userId},user_b.eq.${profileId}),and(user_a.eq.${profileId},user_b.eq.${userId})`)
      .maybeSingle();

    if (existing?.id) {
      router.replace(`/messages/${existing.id}`);
      return;
    }

    const { data: created } = await supabase
      .from('conversations')
      .insert({ user_a: userId, user_b: profileId })
      .select('id')
      .single();

    if (created?.id) {
      router.replace(`/messages/${created.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(201,168,76,0.35)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.titleRow}>
          <LogoMark size={26} />
          <Text style={styles.title}>Start a chat</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.gray} />
          <TextInput
            placeholder="Search by name or username"
            placeholderTextColor={COLORS.gray}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchAction}>Search</Text>
          </TouchableOpacity>
        </View>

        {results.map((profile) => (
          <TouchableOpacity
            key={profile.id}
            style={styles.card}
            onPress={() => handleStartChat(profile.id)}
          >
            <Image source={require('../../assets/images/bodyParts/avatar.png')} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{profile.name || profile.username || 'Member'}</Text>
              <Text style={styles.handle}>
                {profile.username ? `@${profile.username}` : profile.email ?? 'User'}
              </Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={18} color={COLORS.gray} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darker
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240
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
    marginBottom: 16
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600'
  },
  searchAction: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
    gap: 10
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  info: {
    flex: 1
  },
  name: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700'
  },
  handle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2
  }
});
