import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const ExhibitLoading: React.FC = () => {
  // TODO: 여기서 전시 관련 정보 모두 GET하기 -> 리덕스 (watchExhibitSlice) 넣어서 전역 상태 관리
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도 값 0

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: 'transparent',
        headerTransparent: true,
      }),
    );

    // 이미지 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1, // 최종 투명도 값 1
      duration: 1000, // 1초 동안 애니메이션 실행
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('ExhibitIntro');
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <GradientBackground colors={['#1F2C35', '#49A0BE', '#95BFC4', '#E2DFCA']}>
      <OverlayBackground>
        <AnimatedTicketIcon
          source={require('src/assets/ticket_lottie.png')}
          style={{ opacity: fadeAnim }} // 애니메이션된 투명도 값 적용
        />
      </OverlayBackground>
    </GradientBackground>
  );
};

export default ExhibitLoading;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#1F2C35', '#49A0BE', '#95BFC4', '#E2DFCA'],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 0.8 },
})`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

const OverlayBackground = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha80};
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const AnimatedTicketIcon = styled(Animated.Image)`
  width: 140px;
  height: 150px;
`;
