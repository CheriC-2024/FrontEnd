import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ExhibitCard from './ExhibitCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Exhibition } from 'src/interfaces/collection';

const { width } = Dimensions.get('window');

interface ExhibitCarouselProps {
  data: Exhibition[];
}

const ExhibitCarousel: React.FC<ExhibitCarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue<number>(0);

  const animatedStyles = data.map((item, index) => {
    return useAnimatedStyle(() => {
      const scale = withSpring(progress.value === index ? 1 : 0.7);
      return {
        transform: [{ scale }],
      };
    });
  });

  return (
    <Carousel
      width={width}
      height={300}
      data={data}
      scrollAnimationDuration={400}
      onSnapToItem={(index) => setCurrentIndex(index)}
      onProgressChange={(_, absoluteProgress) =>
        (progress.value = absoluteProgress)
      }
      renderItem={({ item, index }) => {
        const isCurrent = index === currentIndex;

        return (
          <View style={{ width: width, alignItems: 'center' }}>
            <Animated.View style={animatedStyles[index]}>
              <ExhibitCard {...item} index={index} isCurrent={isCurrent} />
            </Animated.View>
          </View>
        );
      }}
      loop
      mode='parallax'
      modeConfig={{
        parallaxScrollingScale: 1,
        parallaxScrollingOffset: 190,
      }}
    />
  );
};

export default ExhibitCarousel;
