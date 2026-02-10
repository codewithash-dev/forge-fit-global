import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../../components/LogoMark';

type Comment = {
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

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const postId = Array.isArray(id) ? id[0] : id;

  const loadComments = async () => {
    if (!postId) return;
    const { data, error: loadError } = await supabase
      .from('post_comments')
      .select('id, user_id, content, created_at')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const rows = (data ?? []) as Comment[];
    setComments(rows);

    const userIds = Array.from(new Set(rows.map((row) => row.user_id)));
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
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!postId || !session?.user?.id) return;
    const content = newComment.trim();
    if (!content) return;

    const { error: insertError } = await supabase.from('post_comments').insert({
      post_id: postId,
      user_id: session.user.id,
      content
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewComment('');
    await loadComments();
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
          <Text style={styles.title}>Comments</Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Write a comment..."
            placeholderTextColor={COLORS.gray}
            value={newComment}
            onChangeText={setNewComment}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
            <Ionicons name="send" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {comments.map((comment) => {
          const author = profiles[comment.user_id];
          const label = author?.name || (author?.username ? `@${author.username}` : 'Member');
          return (
            <View key={comment.id} style={styles.card}>
              <Text style={styles.cardTitle}>{label}</Text>
              <Text style={styles.cardBody}>{comment.content}</Text>
            </View>
          );
        })}
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
    marginBottom: 16
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 10
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700'
  },
  cardBody: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 6
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 12,
    marginBottom: 10
  }
});
