import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../../components/LogoMark';

type Conversation = {
  id: string;
  user_a: string;
  user_b: string;
  created_at: string;
};

type Profile = {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
};

export default function MessagesScreen() {
  const { session } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) return;
      const userId = session.user.id;

      const { data } = await supabase
        .from('conversations')
        .select('id, user_a, user_b, created_at')
        .or(`user_a.eq.${userId},user_b.eq.${userId}`)
        .order('created_at', { ascending: false });

      const rows = (data ?? []) as Conversation[];
      setConversations(rows);

      const otherIds = rows.map((conv) => (conv.user_a === userId ? conv.user_b : conv.user_a));
      if (otherIds.length > 0) {
        const { data: profileRows } = await supabase
          .from('profiles')
          .select('id, name, username, email')
          .in('id', otherIds);

        const profileMap: Record<string, Profile> = {};
        (profileRows ?? []).forEach((profile) => {
          profileMap[profile.id] = profile as Profile;
        });
        setProfiles(profileMap);
      }
    };

    load();
  }, [session?.user?.id]);

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
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <LogoMark size={26} />
            <Text style={styles.title}>Messages</Text>
          </View>
          <TouchableOpacity style={styles.newButton} onPress={() => router.push('/messages/new')}>
            <Ionicons name="create" size={16} color={COLORS.white} />
            <Text style={styles.newButtonText}>New chat</Text>
          </TouchableOpacity>
        </View>

        {conversations.length === 0 ? (
          <Text style={styles.emptyText}>No chats yet. Start a new conversation.</Text>
        ) : (
          conversations.map((conv) => {
            const otherId = session?.user?.id === conv.user_a ? conv.user_b : conv.user_a;
            const otherProfile = profiles[otherId];
            const label =
              otherProfile?.name || (otherProfile?.username ? `@${otherProfile.username}` : 'Member');
            return (
              <TouchableOpacity
                key={conv.id}
                style={styles.card}
                onPress={() => router.push(`/messages/${conv.id}`)}
              >
                <Image
                  source={require('../../assets/images/bodyParts/avatar.png')}
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <Text style={styles.name}>{label}</Text>
                  <Text style={styles.handle}>{otherProfile?.email ?? 'Tap to chat'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
              </TouchableOpacity>
            );
          })
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)'
  },
  newButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 13
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
