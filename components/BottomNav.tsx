import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { COLORS, SIZES } from '../constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const NAV_HEIGHT = 72;

const TABS: {
  path: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeColor: string;
}[] = [
  { path: '/', label: 'Scripture', icon: 'book', activeColor: COLORS.primary },
  { path: '/exercises', label: 'Forge', icon: 'flame', activeColor: COLORS.ember },
  { path: '/updates', label: 'Testimony', icon: 'leaf', activeColor: COLORS.sage },
  { path: '/shabbat', label: 'Shabbat', icon: 'star', activeColor: COLORS.shabbatLight },
  { path: '/profile', label: 'Profile', icon: 'person', activeColor: COLORS.primary }
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <NavTab
          key={tab.path}
          path={tab.path}
          label={tab.label}
          icon={tab.icon}
          activeColor={tab.activeColor}
          active={isActive(tab.path)}
          onPress={() => {
            void Haptics.selectionAsync();
            router.push(tab.path as '/');
          }}
        />
      ))}
    </View>
  );
}

function NavTab({
  path,
  label,
  icon,
  activeColor,
  active,
  onPress
}: {
  path: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeColor: string;
  active: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.12), withSpring(1));
    onPress();
  };

  return (
    <Pressable style={styles.tab} onPress={handlePress}>
      {active ? (
        <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />
      ) : null}
      <Animated.View style={[styles.tabInner, animatedStyle]}>
        <Ionicons
          name={icon}
          size={22}
          color={active ? activeColor : COLORS.gray}
        />
        <Text
          style={[
            styles.label,
            active ? { color: activeColor } : styles.labelInactive
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 18,
    left: SIZES.padding * 1.5,
    right: SIZES.padding * 1.5,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 8
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 22,
    height: 2,
    borderRadius: 2
  },
  tabInner: {
    alignItems: 'center',
    gap: 4
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.06
  },
  labelInactive: {
    color: 'rgba(245,240,232,0.35)'
  }
});
