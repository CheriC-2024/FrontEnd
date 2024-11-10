import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ExhibitCard, { ExhibitCardProps } from './ExhibitCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ExhibitCarouselProps {
  data: ExhibitCardProps[];
}

const ExhibitCarousel: React.FC<ExhibitCarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue<number>(0);

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
        // 각 카드에 애니메이션 효과 적용
        const animatedStyle = useAnimatedStyle(() => {
          // 중앙 카드는 scale 1, 양옆 카드는 0.85
          const scale = withSpring(progress.value === index ? 1 : 0.7);
          return {
            transform: [{ scale }],
          };
        });

        const isCurrent = index === currentIndex;

        return (
          <View
            style={{
              width: width,
              alignItems: 'center',
            }}
          >
            <Animated.View style={animatedStyle}>
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
