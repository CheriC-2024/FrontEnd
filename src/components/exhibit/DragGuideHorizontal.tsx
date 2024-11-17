import { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DragGuideHorizontalProps {
  style?: ViewStyle;
  isReversed?: boolean; // 좌우 반전 여부
}

const DragGuideHorizontal: React.FC<DragGuideHorizontalProps> = ({
  style,
  isReversed = false,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 효과 계속 진행되도록 루핑 (loop)
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

  // 투명도 바뀌는 애니메이션
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
          start={isReversed ? { x: 1, y: 0.5 } : { x: 0, y: 0.5 }}
          end={isReversed ? { x: 0, y: 0.5 } : { x: 1, y: 0.5 }}
          style={{ opacity: shimmerOpacity }}
        >
          <IconContainer isReversed={isReversed}>
            <Ionicons
              name={
                isReversed ? 'chevron-forward-outline' : 'chevron-back-outline'
              }
              size={32}
              color='#ffffff'
            />
            <Ionicons
              name={
                isReversed ? 'chevron-forward-outline' : 'chevron-back-outline'
              }
              size={32}
              color='#ffffff'
              style={{ marginLeft: -18, paddingRight: 110 }}
            />
          </IconContainer>
        </AnimatedLinearGradient>
      </GuideContainer>
    </BorderContainer>
  );
};

export default DragGuideHorizontal;

const BorderContainer = styled.View`
  width: 155px;
  height: 45px;
  border-radius: 300px;
  overflow: hidden;
`;

const GuideContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.View<{ isReversed: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 6px 0 8px 0;
  ${({ isReversed }) => isReversed && 'transform: scaleX(-1);'}
`;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
