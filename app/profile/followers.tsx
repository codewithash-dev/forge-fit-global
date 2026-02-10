import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import { useEffect, useState } from 'react';
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
  avatar_url: string | null;
};

export default function FollowersScreen() {
  const { session } = useAuth();
  const [followers, setFollowers] = useState<Profile[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) return;
      const userId = session.user.id;

      const { data: followerRows } = await supabase
        .from('follows')
        .select('follower_id')
        .eq('following_id', userId);

      const followerIds = (followerRows ?? []).map((row) => row.follower_id);

      const { data: followingRows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId);

      const currentFollowing = (followingRows ?? []).map((row) => row.following_id);
      setFollowingIds(currentFollowing);

      if (followerIds.length === 0) {
        setFollowers([]);
        return;
      }

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, username, email, avatar_url')
        .in('id', followerIds);

      setFollowers((profiles ?? []) as Profile[]);
    };

    load();
  }, [session?.user?.id]);

  const handleFollowBack = async (profileId: string) => {
    if (!session?.user?.id) return;
    if (followingIds.includes(profileId)) return;

    await supabase.from('follows').insert({
      follower_id: session.user.id,
      following_id: profileId
    });

    setFollowingIds((prev) => [...prev, profileId]);
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
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <LogoMark size={26} />
            <Text style={styles.title}>Followers</Text>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/profile/search')}>
            <Text style={styles.searchButtonText}>Find friends</Text>
          </TouchableOpacity>
        </View>

        {followers.length === 0 ? (
          <Text style={styles.emptyText}>No followers yet.</Text>
        ) : (
          followers.map((profile) => (
            <View key={profile.id} style={styles.card}>
              <Image
                source={require('../../assets/images/bodyParts/avatar.png')}
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.name}>{profile.name || profile.username || 'Member'}</Text>
                <Text style={styles.handle}>{profile.email ?? 'No email'}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  followingIds.includes(profile.id) && styles.actionButtonActive
                ]}
                onPress={() => handleFollowBack(profile.id)}
              >
                <Text style={styles.actionText}>
                  {followingIds.includes(profile.id) ? 'Following' : 'Follow back'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
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
    gap: 8
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)'
  },
  searchButtonText: {
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
  },
  actionButton: {
    backgroundColor: 'rgba(201,168,76,0.25)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  actionButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  actionText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  }
});
