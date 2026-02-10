import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';
import BottomNav from '../components/BottomNav';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSpring
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

type Post = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

type Profile = {
  id: string;
  name: string | null;
  username: string | null;
};

export default function UpdatesScreen() {
  const { session } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [newPost, setNewPost] = useState('');
  const [likeMap, setLikeMap] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, { likes: number; comments: number }>>({});
  const [refreshing, setRefreshing] = useState(false);
  const refreshSpin = useSharedValue(0);

  const pressScale = useSharedValue(1);
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }]
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${refreshSpin.value}deg` }]
  }));

  const userId = session?.user?.id;

  const loadFeed = async () => {
    const { data } = await supabase
      .from('posts')
      .select('id, user_id, content, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    const feed = (data ?? []) as Post[];
    setPosts(feed);

    const userIds = Array.from(new Set(feed.map((item) => item.user_id)));
    if (userIds.length > 0) {
      const { data: profileRows } = await supabase
        .from('profiles')
        .select('id, name, username')
        .in('id', userIds);

      const profileMap: Record<string, Profile> = {};
      (profileRows ?? []).forEach((profile) => {
        profileMap[profile.id] = profile as Profile;
      });
      setProfiles(profileMap);
    }

    if (userId) {
      const { data: likes } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', userId);

      const liked = new Set((likes ?? []).map((row) => row.post_id));
      const nextLikeMap: Record<string, boolean> = {};
      feed.forEach((post) => {
        nextLikeMap[post.id] = liked.has(post.id);
      });
      setLikeMap(nextLikeMap);
    }

    const nextCounts: Record<string, { likes: number; comments: number }> = {};
    await Promise.all(
      feed.map(async (post) => {
        const { count: likeCount } = await supabase
          .from('post_likes')
          .select('id', { count: 'exact', head: true })
          .eq('post_id', post.id);
        const { count: commentCount } = await supabase
          .from('post_comments')
          .select('id', { count: 'exact', head: true })
          .eq('post_id', post.id);
        nextCounts[post.id] = {
          likes: likeCount ?? 0,
          comments: commentCount ?? 0
        };
      })
    );
    setCounts(nextCounts);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [])
  );

  useEffect(() => {
    if (refreshing) {
      refreshSpin.value = withRepeat(withTiming(360, { duration: 700 }), -1, false);
    } else {
      refreshSpin.value = withTiming(0, { duration: 200 });
    }
  }, [refreshing, refreshSpin]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  }, []);

  const handleCreatePost = async () => {
    if (!userId) return;
    const content = newPost.trim();
    if (!content) return;

    await supabase.from('posts').insert({
      user_id: userId,
      content
    });

    setNewPost('');
    await loadFeed();
  };

  const handleToggleLike = async (postId: string) => {
    if (!userId) return;
    if (likeMap[postId]) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
      setLikeMap((prev) => ({ ...prev, [postId]: false }));
      setCounts((prev) => ({
        ...prev,
        [postId]: { likes: Math.max(0, (prev[postId]?.likes ?? 1) - 1), comments: prev[postId]?.comments ?? 0 }
      }));
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: userId });
      setLikeMap((prev) => ({ ...prev, [postId]: true }));
      setCounts((prev) => ({
        ...prev,
        [postId]: { likes: (prev[postId]?.likes ?? 0) + 1, comments: prev[postId]?.comments ?? 0 }
      }));
    }
  };

  const formattedPosts = useMemo(() => posts, [posts]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(107,143,113,0.2)', 'rgba(13,13,13,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGlow}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={COLORS.sage} />}
      >
        <Animated.View entering={FadeInDown.duration(450).springify()} style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Testimony</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>Real believers. Real transformation.</Text>
              {refreshing ? (
                <Animated.View style={spinStyle}>
                  <Ionicons name="refresh" size={14} color={COLORS.gray} />
                </Animated.View>
              ) : null}
            </View>
          </View>
          <Pressable
            onPressIn={() => (pressScale.value = withSpring(0.95))}
            onPressOut={() => (pressScale.value = withSpring(1))}
            onPress={() => {
              void Haptics.selectionAsync();
              router.push('/messages');
            }}
          >
            <Animated.View style={[styles.messageButton, buttonAnimatedStyle]}>
              <Ionicons name="chatbubbles" size={18} color={COLORS.white} />
              <Text style={styles.messageText}>Messages</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(450).springify()} style={styles.featuredCard}>
          <View style={styles.featuredPill}>
            <Text style={styles.featuredPillText}>✦ Featured Story</Text>
          </View>
          <Text style={styles.featuredQuote}>
            &quot;Your story could be the encouragement someone needs today. Share how faith and fitness changed your life.&quot;
          </Text>
          <View style={styles.featuredTags}>
            <View style={styles.featuredTag}><Text style={styles.featuredTagText}>Transformation</Text></View>
            <View style={styles.featuredTag}><Text style={styles.featuredTagText}>Faith Journey</Text></View>
            <View style={styles.featuredTag}><Text style={styles.featuredTagText}>Set Apart</Text></View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(140).duration(450).springify()}>
          <Text style={styles.sectionTitle}>💬 Community Feed</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(160).duration(450).springify()} style={styles.createCard}>
          <Text style={styles.cardTitle}>Share your testimony</Text>
          <TextInput
            placeholder="Post a workout, milestone, or tip..."
            placeholderTextColor={COLORS.gray}
            value={newPost}
            onChangeText={setNewPost}
            style={styles.input}
            multiline
          />
          <Pressable
            onPressIn={() => (pressScale.value = withSpring(0.96))}
            onPressOut={() => (pressScale.value = withSpring(1))}
            onPress={() => {
              void Haptics.selectionAsync();
              handleCreatePost();
            }}
          >
            <Animated.View style={[styles.primaryButton, buttonAnimatedStyle]}>
              <Text style={styles.primaryButtonText}>Post</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        {formattedPosts.map((post) => {
          const author = profiles[post.user_id];
          const authorLabel = author?.name || (author?.username ? `@${author.username}` : 'Member');
          const postCounts = counts[post.id] ?? { likes: 0, comments: 0 };
          return (
            <Animated.View
              key={post.id}
              entering={FadeInUp.delay(180).duration(450).springify()}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>{authorLabel}</Text>
              <Text style={styles.cardBody}>{post.content}</Text>
              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => {
                    void Haptics.selectionAsync();
                    handleToggleLike(post.id);
                  }}
                  style={styles.actionButton}
                >
                  <Ionicons
                    name={likeMap[post.id] ? 'heart' : 'heart-outline'}
                    size={16}
                    color={likeMap[post.id] ? '#F87171' : COLORS.white}
                  />
                  <Text style={styles.actionText}>{postCounts.likes}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    void Haptics.selectionAsync();
                    router.push(`/updates/${post.id}`);
                  }}
                  style={styles.actionButton}
                >
                  <Ionicons name="chatbubble-outline" size={16} color={COLORS.white} />
                  <Text style={styles.actionText}>{postCounts.comments}</Text>
                </Pressable>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
      <BottomNav />
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
    height: 260
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 120
  },
  title: {
    color: COLORS.sageLight,
    fontSize: 26,
    fontWeight: '900'
  },
  titleBlock: {
    flex: 1
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 6,
    marginBottom: 24
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  messageButton: {
    backgroundColor: 'rgba(107,143,113,0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(107,143,113,0.45)'
  },
  messageText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  featuredCard: {
    backgroundColor: 'rgba(15,26,17,0.6)',
    marginBottom: 16,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(107,143,113,0.18)',
    overflow: 'hidden'
  },
  featuredPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(107,143,113,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14
  },
  featuredPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.sageLight,
    letterSpacing: 0.5
  },
  featuredQuote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: COLORS.lightGray,
    lineHeight: 22,
    marginBottom: 14
  },
  featuredTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  featuredTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(107,143,113,0.1)'
  },
  featuredTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.sageLight,
    textTransform: 'uppercase',
    letterSpacing: 0.06
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.16,
    color: COLORS.sageLight,
    marginBottom: 12
  },
  createCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.white,
    marginTop: 10,
    minHeight: 70
  },
  primaryButton: {
    backgroundColor: COLORS.sage,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700'
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    marginBottom: 12
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700'
  },
  cardBody: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  actionText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600'
  }
});
