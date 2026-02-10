import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { bodyParts } from '../../constants/bodyParts';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SIZES } from '../../constants/theme';
import { useMemo, useState } from 'react';

interface BodyPartsProps {
  onSelectBodyPart: (bodyPart: string) => void;
}

export default function BodyParts({ onSelectBodyPart }: BodyPartsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'lower' | 'upper'>('all');

  const filteredParts = useMemo(() => {
    if (activeTab === 'all') return bodyParts;
    return bodyParts.filter((part) => part.category === activeTab);
  }, [activeTab]);

  const handleTabPress = (tab: 'all' | 'lower' | 'upper') => {
    setActiveTab(tab);
    if (tab !== 'all') {
      const firstPart = bodyParts.find((part) => part.category === tab);
      if (firstPart) {
        onSelectBodyPart(firstPart.name);
      }
    } else {
      onSelectBodyPart('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your plan</Text>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => handleTabPress('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            All workouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lower' && styles.tabActive]}
          onPress={() => handleTabPress('lower')}
        >
          <Text style={[styles.tabText, activeTab === 'lower' && styles.tabTextActive]}>
            Lower body
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upper' && styles.tabActive]}
          onPress={() => handleTabPress('upper')}
        >
          <Text style={[styles.tabText, activeTab === 'upper' && styles.tabTextActive]}>
            Upper body
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredParts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
            <TouchableOpacity
              onPress={() => onSelectBodyPart(item.name)}
              style={[styles.item, { backgroundColor: COLORS.cardBg }]}
              activeOpacity={0.8}
            >
              <View style={styles.itemContent}>
                <View>
                  <Text style={styles.itemTitle}>
                    {item.name} workout
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    30 mins
                  </Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Cardio</Text>
                  </View>
                  <Text style={styles.exercises}>
                    5 exercises
                  </Text>
                </View>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: SIZES.padding
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 20,
    gap: 12
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: 'rgba(255,255,255,0.25)'
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '700'
  },
  tabTextActive: {
    color: COLORS.white
  },
  listContent: {
    paddingHorizontal: SIZES.padding,
    gap: 16
  },
  item: {
    width: 280,
    borderRadius: SIZES.largeRadius,
    padding: 20,
    minHeight: 180,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    textTransform: 'capitalize',
    marginBottom: 4
  },
  itemSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 8
  },
  badge: {
    backgroundColor: 'rgba(201,168,76,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700'
  },
  exercises: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.lightGray
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
});
