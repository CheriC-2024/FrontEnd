import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { MusicOffIcon, MusicOnIcon } from 'src/assets/icons/_index.js';
import { ButtonText } from 'src/styles/typography';
import { DragGuideHorizontal } from 'src/components/_index';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Audio } from 'expo-av';
import { getGradientConfig } from 'src/utils/gradientBgUtils';

const ExhibitIntro: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exhibitId, bgType, exhibitColors } = route.params || {}; // 전시 ID 가져오기

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
  const exhibitDetails = useSelector(
    (state: RootState) => state.watchingExhibit.details,
  );
  const font = useSelector((state: RootState) => state.watchingExhibit.font);
  if (!font) {
    // Redux 상태가 아직 준비되지 않은 경우 로딩 화면을 보여줌
    return;
  }

  const [sound, setSound] = useState<Audio.Sound | null>(null); // 오디오 객체

  // 음악 재생 함수
  const playSound = async () => {
    try {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        require('src/assets/music.mp3'), // 로컬 MP3 파일 경로
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound', error);
    }
  };

  // 음악 정지 함수
  const stopSound = async () => {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  // 음악 상태 토글
  const toggleMusic = async () => {
    if (isMusicOn) {
      await stopSound();
    } else {
      await playSound();
    }
    setIsMusicOn((prev) => !prev);
  };

  // 헤더 설정
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

  // Gradient 설정
  const gradientConfig = getGradientConfig(bgType);

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
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
          colors={exhibitColors}
          start={gradientConfig.start}
          end={gradientConfig.end}
        >
          <OverlayBackground>
            <TouchableOpacity onPress={toggleMusic}>
              {isMusicOn ? <MusicOnIcon /> : <MusicOffIcon />}
            </TouchableOpacity>

            {/* 타이틀 애니메이션 적용 */}
            <Animated.View
              style={{
                opacity: fadeAnimTitle,
                transform: [{ translateY: translateYTitle }],
              }}
            >
              <StyledTitle fontFamily={font}>
                {exhibitDetails?.title}
              </StyledTitle>
            </Animated.View>

            {/* 설명 애니메이션 적용 */}
            <AnimatedDescription
              style={{
                opacity: fadeAnimDescription,
                transform: [{ translateY: translateYDescription }],
              }}
            >
              {exhibitDetails?.description}
            </AnimatedDescription>

            {showDragGuide && (
              <Animated.View
                style={{
                  opacity: fadeAnimGuide,
                  position: 'absolute',
                  bottom: 50,
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

export default ExhibitIntro;

const GradientBackground = styled(LinearGradient)`
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

const StyledTitle = styled.Text<{ fontFamily: string }>`
  font-size: 44px;
  margin-top: 16px;
  margin-bottom: 24px;
  color: #fff;
  font-family: ${({ fontFamily }) => fontFamily};
`;

const AnimatedDescription = styled(
  Animated.createAnimatedComponent(ButtonText),
)`
  color: #fff;
`;
