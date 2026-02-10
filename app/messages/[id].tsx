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

type Message = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    if (!id) return;
    const { data } = await supabase
      .from('messages')
      .select('id, sender_id, body, created_at')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });
    setMessages((data ?? []) as Message[]);
  };

  useEffect(() => {
    loadMessages();
  }, [id]);

  const handleSend = async () => {
    if (!id || !session?.user?.id) return;
    const body = text.trim();
    if (!body) return;
    await supabase.from('messages').insert({
      conversation_id: id,
      sender_id: session.user.id,
      body
    });
    setText('');
    await loadMessages();
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

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <LogoMark size={26} />
        <Text style={styles.title}>Chat</Text>
      </View>

      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.map((message) => {
          const isMine = message.sender_id === session?.user?.id;
          return (
            <View key={message.id} style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
              <Text style={styles.bubbleText}>{message.body}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Message..."
          placeholderTextColor={COLORS.gray}
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 64,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 12
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)'
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700'
  },
  messages: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 90
  },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    maxWidth: '75%',
    marginBottom: 10
  },
  bubbleMine: {
    backgroundColor: 'rgba(201,168,76,0.35)',
    alignSelf: 'flex-end'
  },
  bubbleOther: {
    backgroundColor: COLORS.cardBg,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  bubbleText: {
    color: COLORS.white,
    fontSize: 13
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingBottom: 30
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
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
  }
});
