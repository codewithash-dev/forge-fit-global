import { Image, StyleSheet, View, ViewStyle } from 'react-native';

type LogoMarkProps = {
  size?: number;
  style?: ViewStyle;
  visible?: boolean;
};

export default function LogoMark({ size = 32, style, visible = false }: LogoMarkProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style, { width: size, height: size }]}>
      <Image
        source={require('../assets/images/fitforge-logo.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
