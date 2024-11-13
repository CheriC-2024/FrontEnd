import { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DragGuideHorizontalProps {
  style?: ViewStyle;
}

const DragGuideHorizontal: React.FC<DragGuideHorizontalProps> = ({ style }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 효과 계속 진행 되도록 루핑 (loop)
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
    <GuideContainer style={style}>
      <AnimatedLinearGradient
        colors={[
          'rgba(255,255,255,1)',
          'rgba(255,255,255,0.7)',
          'rgba(255,255,255,0.3)',
          'transparent',
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ opacity: shimmerOpacity }}
      >
        <IconContainer>
          <Ionicons name='chevron-back-outline' size={32} color='#ffffff' />
          <Ionicons
            name='chevron-back-outline'
            size={32}
            color='#ffffff'
            style={{ marginLeft: -18, paddingRight: 50 }}
          />
        </IconContainer>
      </AnimatedLinearGradient>
    </GuideContainer>
  );
};

export default DragGuideHorizontal;

const GuideContainer = styled(Animated.View)`
  width: 155px;
  height: 45px;
  border-radius: 300px;
  overflow: hidden;
  align-items: flex-start;
  justify-content: center;
`;

const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
