import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { sliderImages } from '../../constants/bodyParts';
import { SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function ImageSlider() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {sliderImages.map((image, index) => (
          <CarouselItem key={index} image={image} index={index} scrollX={scrollX} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

function CarouselItem({ image, index, scrollX }: any) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity
    };
  });

  return (
    <Animated.View style={[{ width }, animatedStyle, styles.itemContainer]}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    marginTop: 20
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: SIZES.largeRadius,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8
  }
});
