import { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DragGuideVerticalProps {
  style?: ViewStyle;
  isReversed?: boolean; // 위아래 반전 여부
}

const DragGuideVertical: React.FC<DragGuideVerticalProps> = ({
  style,
  isReversed = false,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 애니메이션 루프
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnimation]);

  // 투명도 애니메이션
  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <BorderContainer style={style}>
      <GuideContainer>
        <AnimatedLinearGradient
          colors={[
            'rgba(255,255,255,1)',
            'rgba(255,255,255,0.7)',
            'rgba(255,255,255,0.3)',
            'transparent',
          ]}
          start={isReversed ? { x: 0.5, y: 1 } : { x: 0.5, y: 0 }}
          end={isReversed ? { x: 0.5, y: 0 } : { x: 0.5, y: 1 }}
          style={{ opacity: shimmerOpacity }}
        >
          <IconContainer>
            <Ionicons
              name='chevron-up-outline' // 위쪽 화살표로 기본 설정
              size={32}
              color='#ffffff'
              style={{ paddingTop: 110 }}
            />
            <Ionicons
              name='chevron-up-outline'
              size={32}
              color='#ffffff'
              style={{ marginTop: -18, marginBottom: 16 }}
            />
          </IconContainer>
        </AnimatedLinearGradient>
      </GuideContainer>
    </BorderContainer>
  );
};

export default DragGuideVertical;

const BorderContainer = styled.View`
  width: 45px;
  height: 155px;
  border-radius: 300px;
  overflow: hidden;
`;

const GuideContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.View`
  flex-direction: column; /* 위아래 방향으로 배치 */
  align-items: center;
  padding: 0 8px 0 6px;
`;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
