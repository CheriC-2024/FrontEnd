import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { homeExhibitData } from '../data';
import { MusicOffIcon, MusicOnIcon } from 'src/assets/icons/_index.js';
import { ButtonText } from 'src/styles/typography';
import { DragGuideHorizontal } from 'src/components/_index';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const ExhibitLoading: React.FC = () => {
  const navigation = useNavigation();
  const exhibitData = homeExhibitData.find((exhibit) => exhibit.id === '1');

  // 애니메이션 값
  const fadeAnimTitle = useRef(new Animated.Value(0)).current; // 타이틀 페이드 인 초기값
  const fadeAnimDescription = useRef(new Animated.Value(0)).current; // 설명 페이드 인 초기값
  const translateYTitle = useRef(new Animated.Value(20)).current; // 타이틀 아래에서 위로 초기값
  const translateYDescription = useRef(new Animated.Value(20)).current; // 설명 아래에서 위로 초기값
  const fadeAnimGuide = useRef(new Animated.Value(1)).current; // DragGuideHorizontal 페이드 인/아웃 값

  // 음악 아이콘 상태 관리
  const [isMusicOn, setIsMusicOn] = useState(true); // 초기값은 MusicOnIcon
  const [isDragGuideVisible, setIsDragGuideVisible] = useState(true); // DragGuideHorizontal의 가시성 상태
  const [showDragGuide, setShowDragGuide] = useState(false); // DragGuideHorizontal 표시 여부

  // 헤더 설정 및 애니메이션 시작
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#fff',
        headerTransparent: true,
      }),
    );

    // 타이틀 애니메이션 (페이드 인 + 아래에서 위로 이동)
    Animated.parallel([
      Animated.timing(fadeAnimTitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYTitle, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // 설명 애니메이션 (페이드 인 + 아래에서 위로 이동) - 타이틀 애니메이션이 끝난 후 시작
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnimDescription, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateYDescription, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowDragGuide(true); // DragGuideHorizontal 표시
      });
    }, 1200); // 타이틀 애니메이션 후 딜레이
  }, [
    navigation,
    fadeAnimTitle,
    fadeAnimDescription,
    translateYTitle,
    translateYDescription,
  ]);

  const handleScreenPress = () => {
    Animated.timing(fadeAnimGuide, {
      toValue: 0,
      duration: 500, // 0.5초 동안 서서히 사라짐
      useNativeDriver: true,
    }).start(() => {
      setIsDragGuideVisible(false); // 애니메이션이 끝난 후 컴포넌트 제거
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={handleScreenPress}
      shouldCancelWhenOutside={false}
    >
      <PanGestureHandler
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            const { translationX } = event.nativeEvent;

            // 오른쪽에서 왼쪽으로 스와이프 감지
            if (translationX < -100) {
              navigation.navigate('ExhibitViewing');
            }
          }
        }}
      >
        <GradientBackground
          colors={['#1F2C35', '#49A0BE', '#95BFC4', '#E2DFCA']}
        >
          <OverlayBackground>
            <TouchableOpacity onPress={() => setIsMusicOn((prev) => !prev)}>
              {isMusicOn ? <MusicOnIcon /> : <MusicOffIcon />}
            </TouchableOpacity>

            {/* 타이틀 애니메이션 적용 */}
            <AnimatedTitle
              style={{
                opacity: fadeAnimTitle,
                transform: [{ translateY: translateYTitle }],
              }}
            >
              {exhibitData?.title}
            </AnimatedTitle>

            {/* 설명 애니메이션 적용 */}
            <AnimatedDescription
              style={{
                opacity: fadeAnimDescription,
                transform: [{ translateY: translateYDescription }],
              }}
            >
              {exhibitData?.description}
            </AnimatedDescription>

            {showDragGuide && (
              <Animated.View
                style={{
                  opacity: fadeAnimGuide,
                  position: 'absolute',
                  bottom: 360,
                  right: 16,
                  zIndex: 1,
                }}
              >
                <DragGuideHorizontal isReversed />
              </Animated.View>
            )}
          </OverlayBackground>
        </GradientBackground>
      </PanGestureHandler>
    </TouchableWithoutFeedback>
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
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 16px;
  padding-top: 90px;
`;

const AnimatedTitle = styled(Animated.Text)`
  font-size: 44px;
  font-family: 'Mapo';
  margin-top: 16px;
  margin-bottom: 24px;
  color: #fff;
`;

const AnimatedDescription = styled(
  Animated.createAnimatedComponent(ButtonText),
)`
  color: #fff;
`;
