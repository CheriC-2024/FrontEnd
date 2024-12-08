import { useRef, useEffect, useState } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import { ArtistImage, DragGuideHorizontal } from 'src/components/_index';
import { Body1, Caption, H6, Subtitle1 } from 'src/styles/typography';
import { HeartIcon } from 'src/assets/icons/_index';
import LinearGradient from 'react-native-linear-gradient';
import { useExhibitionDetails } from 'src/api/hooks/useExhibitQueries';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setExhibitTitle, setFont } from 'src/slices/watchingExhibitSlice';
import { getGradientConfig } from 'src/utils/gradientBgUtils';
import {
  useAddExhibitHeart,
  useRemoveExhibitHeart,
} from 'src/api/hooks/useExhibitMutations';

const { width, height } = Dimensions.get('window');

// 상수 정의
const INITIAL_WIDTH = 350;
const INITIAL_HEIGHT = 400;
const MAX_EXPANDED_WIDTH = width + 100;
const MAX_EXPANDED_HEIGHT = height + 150;
const CHARACTER_SCALE_UP = 1.05;
const ANIMATION_DURATION = 500;
const INITIAL_BORDER_WIDTH = 1;
const INITIAL_TOP_LEFT_RADIUS = 300;
const INITIAL_LEFT_POSITION = -120;
const FINAL_LEFT_POSITION = -10;
const DRAG_THRESHOLD = -230;

const ExhibitEntrance: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {
    exhibitId,
    exhibitColors,
    exhibitThemes,
    bgType,
    hits,
    createAt,
    name,
    heartCount,
  } = route.params || {}; // 전시 ID 가져오기
  const {
    data: exhibitData,
    isLoading,
    isError,
  } = useExhibitionDetails(exhibitId);

  const { fontData } = useSelector((state: RootState) => state.exhibit);

  // exhibitData.font에 매칭되는 fontFamily 찾기
  const fontFamily =
    fontData.find((font) => font.value === exhibitData?.font)?.fontFamily ||
    'PretendardRegular';

  useEffect(() => {
    if (!isLoading && exhibitData?.name && fontFamily) {
      dispatch(setExhibitTitle(exhibitData.name));
      dispatch(setFont(fontFamily));
    }
  }, [fontFamily, exhibitData, isLoading, dispatch]);

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#fff',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  const [showGuide, setShowGuide] = useState(true);
  const guideOpacity = useRef(new Animated.Value(1)).current; // 서서히 사라지는 효과를 위한 투명도 설정

  // 캐릭터 위치, 바운스 효과, 크기, 테두리 너비, 위치에 대한 애니메이션 값
  const characterPosition = useRef(new Animated.Value(0)).current;
  const characterScale = useRef(new Animated.Value(1)).current; // 바운스 효과를 위한 초기 크기
  const exhibitOpacityWidth = useRef(new Animated.Value(INITIAL_WIDTH)).current; // 초기 너비
  const exhibitOpacityHeight = useRef(
    new Animated.Value(INITIAL_HEIGHT),
  ).current; // 초기 높이

  const borderWidth = useRef(new Animated.Value(INITIAL_BORDER_WIDTH)).current; // 초기 테두리 너비
  const borderTopLeftRadius = useRef(
    new Animated.Value(INITIAL_TOP_LEFT_RADIUS),
  ).current; // 초기 테두리 반경
  const leftPosition = useRef(
    new Animated.Value(INITIAL_LEFT_POSITION),
  ).current; // 초기 왼쪽 위치

  // 최대 확장점에 도달했는지 여부를 추적하는 상태
  const [expanded, setExpanded] = useState(false);

  // 화면 진입 시 상태 초기화
  useFocusEffect(() => {
    // 상태 초기화
    setExpanded(false); // 드래그 가능 상태로 초기화
    characterPosition.setValue(0); // 캐릭터 위치 초기화
    characterScale.setValue(1); // 스케일 초기화
    exhibitOpacityWidth.setValue(INITIAL_WIDTH); // 초기 너비
    exhibitOpacityHeight.setValue(INITIAL_HEIGHT); // 초기 높이
    borderWidth.setValue(INITIAL_BORDER_WIDTH); // 테두리 초기화
    borderTopLeftRadius.setValue(INITIAL_TOP_LEFT_RADIUS); // 반경 초기화
    leftPosition.setValue(INITIAL_LEFT_POSITION); // 왼쪽 위치 초기화
  });

  // 캐릭터 드래그를 처리하기 위한 PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (showGuide) setShowGuide(false);
        if (!expanded) {
          // 가로 움직임에 대해서만 캐릭터 위치 업데이트
          characterPosition.setValue(gestureState.dx);

          // 디버깅을 위한 로그
          console.log(
            `Direction: ${gestureState.dx < 0 ? 'Left' : 'Right'}, dx: ${gestureState.dx}`,
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        // 새로운 크기가 540에 도달했을 때만 바운스 및 확장 적용
        if (gestureState.dx <= DRAG_THRESHOLD) {
          // 캐릭터를 드래그 위치에 고정
          characterPosition.setValue(gestureState.dx);
          // 캐릭터에 부드러운 바운스 애니메이션 적용
          Animated.sequence([
            Animated.spring(characterScale, {
              toValue: CHARACTER_SCALE_UP, // 약간 확대
              friction: 2,
              tension: 140,
              useNativeDriver: false,
            }),
            Animated.spring(characterScale, {
              toValue: 1, // 원래 크기로 축소
              friction: 2,
              tension: 140,
              useNativeDriver: false,
            }),
          ]).start(() => {
            setExpanded(true);
          });

          setTimeout(() => {
            // 최종 너비와 높이로 `exhibitOpacity` 확장
            Animated.parallel([
              Animated.timing(exhibitOpacityWidth, {
                toValue: MAX_EXPANDED_WIDTH, // 최종 확장 너비
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
              }),
              Animated.timing(exhibitOpacityHeight, {
                toValue: MAX_EXPANDED_HEIGHT, // 최종 확장 높이
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
              }),
              Animated.timing(leftPosition, {
                toValue: FINAL_LEFT_POSITION, // 왼쪽으로 10 이동
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
              }),
              Animated.timing(borderTopLeftRadius, {
                toValue: 0, // 상단 왼쪽 반경을 0으로 설정
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
              }),
              Animated.timing(borderWidth, {
                toValue: 0, // 테두리 너비를 0으로 애니메이션
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
              }),
            ]).start();

            // 지연 후 캐릭터를 화면 왼쪽으로 이동
            Animated.timing(characterPosition, {
              toValue: -width, // 캐릭터를 화면 왼쪽으로 이동
              duration: ANIMATION_DURATION,
              useNativeDriver: false,
            }).start(() => {
              navigation.navigate('ExhibitLoading', {
                exhibitId: exhibitId,
                exhibitColors: exhibitColors,
                bgType: bgType,
                name: name,
              }); // ExhibitLoading 화면으로 이동
            });
          }, 1000); // 확장 및 화면 밖으로 이동하기 전에 1초 지연
        } else {
          // 임계값에 도달하지 않으면 원래 위치와 크기로 재설정
          Animated.spring(characterPosition, {
            toValue: 0,
            useNativeDriver: false,
          }).start();

          Animated.spring(exhibitOpacityWidth, {
            toValue: INITIAL_WIDTH, // 초기 너비로 재설정
            useNativeDriver: false,
          }).start();

          Animated.spring(exhibitOpacityHeight, {
            toValue: INITIAL_HEIGHT, // 초기 높이로 재설정
            useNativeDriver: false,
          }).start();

          Animated.spring(borderWidth, {
            toValue: INITIAL_BORDER_WIDTH, // 테두리 너비 초기값으로 재설정
            useNativeDriver: false,
          }).start();

          Animated.spring(borderTopLeftRadius, {
            toValue: INITIAL_TOP_LEFT_RADIUS, // 테두리 반경 초기값으로 재설정
            useNativeDriver: false,
          }).start();

          Animated.spring(leftPosition, {
            toValue: INITIAL_LEFT_POSITION, // 초기 왼쪽 위치로 재설정
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  // Gradient 설정
  const gradientConfig = getGradientConfig(bgType);
  console.log(name);

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [newHeartCount, setHeartCount] = useState(heartCount); // 초기 좋아요 수를 hits로 설정

  const { mutate: addHeart } = useAddExhibitHeart();
  const { mutate: removeHeart } = useRemoveExhibitHeart();

  const handleLikePress = () => {
    if (isLiked) {
      removeHeart(exhibitId, {
        onSuccess: (newHeartCount: number) => {
          setIsLiked(false);
          setHeartCount(newHeartCount);
        },
      });
    } else {
      addHeart(exhibitId, {
        onSuccess: (newHeartCount: number) => {
          setIsLiked(true);
          setHeartCount(newHeartCount);
        },
      });
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <GradientBackground
      colors={exhibitColors}
      start={gradientConfig.start}
      end={gradientConfig.end}
    >
      <ContentContainer>
        <HeaderContainer>
          <NameWrapper>
            <ArtistImage image={exhibitData?.userRes.profileImgUrl} size={42} />
            <Subtitle1 style={{ color: 'white', marginLeft: 6 }}>
              {exhibitData?.userRes.name || '닉네임'}
            </Subtitle1>
            <Body1 style={{ color: 'white' }}>님의 컬렉션 전시</Body1>
          </NameWrapper>
          <TouchableOpacity onPress={handleLikePress}>
            <LikeWrapper>
              <HeartIcon
                fill={isLiked ? '#E52C32' : 'none'}
                stroke={isLiked ? 'none' : '#fff'}
              />
              <H6 style={{ color: 'white' }}>{newHeartCount}</H6>
            </LikeWrapper>
          </TouchableOpacity>
        </HeaderContainer>
        <TitleContainer>
          <ExhibitTitle style={{ fontFamily }}>{name}</ExhibitTitle>
          <ExhibitDate>전시 등록일 {createAt}</ExhibitDate>
          <TagsContainer>
            {exhibitThemes.map((theme, idx) => (
              <Tag key={idx}># {theme}</Tag>
            ))}
          </TagsContainer>
        </TitleContainer>
      </ContentContainer>
      <ExhibitOpacity
        style={{
          width: exhibitOpacityWidth, // 별도 너비 사용
          height: exhibitOpacityHeight, // 별도 높이 사용
          left: leftPosition, // 왼쪽 위치 오프셋 적용
          borderWidth: borderWidth, // 애니메이션된 테두리 너비 적용
          borderTopLeftRadius: borderTopLeftRadius, // 애니메이션 반경 적용
          borderColor: '#fff',
        }}
      />
      <AnimatedCharacterImage
        source={require('src/assets/images/Character/ticket.png')}
        style={{
          transform: [
            { translateX: characterPosition },
            { scale: characterScale }, // 바운스 스케일 애니메이션 적용
          ],
        }}
        {...(!expanded ? panResponder.panHandlers : {})} // 확장 시 pan 핸들러 비활성화
      />
      {showGuide && (
        <Animated.View style={{ opacity: guideOpacity }}>
          <DragGuideHorizontal
            style={{ position: 'absolute', bottom: 180, left: 160, zIndex: 1 }}
          />
        </Animated.View>
      )}
    </GradientBackground>
  );
};

export default ExhibitEntrance;

const GradientBackground = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

const Background = styled(ImageBackground)`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 0 16px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 20px;
`;

const NameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LikeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View`
  flex-direction: column;
`;

const ExhibitTitle = styled.Text`
  font-size: 44px;
  margin-bottom: 16px;
  color: #fff;
`;

const ExhibitDate = styled(Caption)`
  color: #fff;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Tag = styled(Caption)`
  background-color: rgba(255, 255, 255, 0.7);
  color: ${({ theme }) => theme.colors.redBlack};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 12px;
`;

const AnimatedCharacterImage = styled(Animated.Image)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 220px;
  height: 320px;
`;

const ExhibitOpacity = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  border-top-right-radius: 300px;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha80};
  overflow: hidden;
`;
