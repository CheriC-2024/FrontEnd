import { useState } from 'react';
import {
  Text,
  Animated,
  LayoutRectangle,
  TouchableOpacity,
  View,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from 'src/navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTheme, removeTheme } from '../../slices/themeSlice';
import { useToastMessage } from 'src/hooks/_index';
import { TitleSubtitle, TagButton, ToastMessage } from 'src/components/_index';
import { Btn, BtnText } from 'src/components/Button';
import { Container } from 'src/styles/layout';
import { RefreshIcon } from '../../assets/icons/_index.js';
import { Body2, Caption, Subtitle1, Subtitle2 } from 'src/styles/typography';

const AIRecommendTheme: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { selectedAiThemes, selectedThemes } = useSelector(
    (state: RootState) => state.theme,
  );
  const { aiThemes, aiThemeReason } = useSelector(
    (state: RootState) => state.aiRecommend,
  );
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const { toastVisible, toastMessage, showToast } = useToastMessage();
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [animations, setAnimations] = useState<{
    [key: string]: Animated.Value;
  }>(
    aiThemes.reduce(
      (acc, theme) => {
        acc[theme] = new Animated.Value(100);
        return acc;
      },
      {} as { [key: string]: Animated.Value },
    ),
  );
  const [textAnimations, setTextAnimations] = useState<{
    [key: string]: Animated.Value;
  }>(
    aiThemes.reduce(
      (acc, theme) => {
        acc[theme] = new Animated.Value(14); // initial font size
        return acc;
      },
      {} as { [key: string]: Animated.Value },
    ),
  );

  const handleThemeSelect = (theme: string, layout: LayoutRectangle | null) => {
    if (selectedTheme !== theme) {
      if (selectedTheme) {
        animateCircle(selectedTheme, 100, 12); // reset to original size
      }
      setSelectedTheme(theme);
      animateCircle(theme, 140, 16); // enlarge circle and text
    }
    if (layout) {
      // Calculate button position based on circle position
      setButtonPosition({
        x: layout.x + layout.width / 2, // Center horizontally
        y: layout.y + layout.height, // Position below the circle
      });
    }
  };

  const handleComplete = () => {
    navigation.navigate('Exhibit', { step: 2, selectedThemes });
  };

  const handleAddTheme = () => {
    if (selectedTheme && !selectedThemes.includes(selectedTheme)) {
      if (selectedThemes.length >= 3) {
        showToast('테마는 최대 3개까지 추가할 수 있습니다');
      } else {
        dispatch(addTheme({ name: selectedTheme, isAI: true }));
      }
    }
  };

  const animateCircle = (theme: string, toValue: number, fontSize: number) => {
    Animated.timing(animations[theme], {
      toValue: toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(textAnimations[theme], {
      toValue: fontSize,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  // 추천 이유 텍스트
  const reasonText = selectedTheme
    ? aiThemeReason[aiThemes.indexOf(selectedTheme)] ||
      '테마 추천 이유가 없습니다.'
    : '컬렉터님이 선택한 작품들로 테마를 만들었어요!';

  const reasonTitleText = selectedTheme
    ? '추천 이유'
    : '테마를 클릭하고 추천 이유 보기';

  return (
    <>
      <Container removePadding>
        <HeaderText>전시 테마 AI 추천</HeaderText>
        <TitleSubtitle
          titleLarge='AI가 만든 전시 테마'
          subtitle='원하는 전시 테마를 선택해 주세요'
          style={{ marginBottom: 12, paddingHorizontal: 16 }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          <RefreshIcon size={30} />
        </View>
        <ThemeScrollViewContainer>
          <ThemeScrollView horizontal showsHorizontalScrollIndicator={false}>
            {aiThemes.map((theme, index) => (
              <AnimatedThemeContainer key={index}>
                <AnimatedThemeCircle
                  selected={selectedTheme === theme} // 현재 선택된 테마
                  added={selectedThemes.includes(theme)} // 추가된 테마인지 확인
                  style={{
                    width: animations[theme], // 애니메이션된 원 크기
                    height: animations[theme],
                  }}
                  onLayout={(event) => {
                    if (selectedTheme === theme) {
                      const layout = event.nativeEvent.layout;
                      setButtonPosition({
                        x: layout.x + layout.width / 2, // Center horizontally
                        y: layout.y + layout.height, // Position below the circle
                      });
                    }
                  }}
                  onPress={(event) =>
                    handleThemeSelect(theme, event.nativeEvent.layout)
                  }
                >
                  {selectedTheme === theme ? (
                    <GradientCircle colors={['#fff', '#FDEEEF']}>
                      <AnimatedThemeText
                        style={{
                          fontSize: textAnimations[theme], // 애니메이션된 폰트 크기
                        }}
                      >
                        {`#${theme}`}
                      </AnimatedThemeText>
                    </GradientCircle>
                  ) : (
                    <ThemeText>{`#${theme}`}</ThemeText>
                  )}
                </AnimatedThemeCircle>
                {/* 원 바로 아래 버튼 */}
                {selectedTheme === theme && (
                  <AnimatedButton
                    style={{
                      marginTop: 8, // 원 바로 아래에 위치
                    }}
                    onPress={handleAddTheme}
                  >
                    <ReasonButtonText>추가하기</ReasonButtonText>
                  </AnimatedButton>
                )}
              </AnimatedThemeContainer>
            ))}
          </ThemeScrollView>
        </ThemeScrollViewContainer>
        <ReasonContainer>
          <ReasonIcon
            source={require('src/assets/images/Character/character_ai.png')}
          />
          <ReasonTextContainer>
            <ReasonTitle>{reasonTitleText}</ReasonTitle>
            <ReasonText>{reasonText}</ReasonText>
          </ReasonTextContainer>
        </ReasonContainer>
        <SelectedThemesHeader>
          <Subtitle2>설정한 테마</Subtitle2>
          <Body2>
            {selectedThemes.length}{' '}
            <Body2 style={{ color: theme.colors.grey_6 }}>/ 3</Body2>
          </Body2>
        </SelectedThemesHeader>
        <SelectedThemes>
          {selectedThemes.map((theme, index) => (
            <TagButton
              key={index}
              text={theme}
              onRemove={() => dispatch(removeTheme(theme))}
              backgroundColor={
                selectedAiThemes.includes(theme) ? '#e52c32' : '#413333'
              }
              textColor='#fff'
            />
          ))}
        </SelectedThemes>
        <Btn onPress={handleComplete} style={{ marginHorizontal: 16 }}>
          <BtnText>설정 완료하기</BtnText>
        </Btn>
      </Container>

      <ToastMessage message={toastMessage} visible={toastVisible} />
    </>
  );
};

const HeaderText = styled(Subtitle1)`
  margin: 16px 0;
  padding: 0 16px;
`;

const AnimatedThemeContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 8px; /* 원 사이 간격 */
  padding-bottom: 20px;
`;

const ThemeScrollViewContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 200px;
`;

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
`;

const ThemeCircle = styled.TouchableOpacity<{
  selected: boolean;
  added: boolean;
}>`
  border-radius: 70px;
  background-color: ${({ selected, added }) =>
    selected ? '#fff' : added ? '#dfdfdf' : '#fff'};
  justify-content: center;
  align-items: center;
  align-self: center;
  elevation: 5;
  overflow: visible;
`;

const AnimatedThemeCircle = Animated.createAnimatedComponent(ThemeCircle);

const GradientCircle = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 70px;
  justify-content: center;
  align-items: center;
`;

const ThemeText = styled(Caption)`
  text-align: center;
`;

const AnimatedThemeText = Animated.createAnimatedComponent(ThemeText);

const ReasonContainer = styled.View`
  height: 180px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: #fcfbfb;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 16px;
  padding-top: ${({ theme }) => theme.padding.l};
  padding-bottom: ${({ theme }) => theme.padding.l};
  margin-bottom: ${({ theme }) => theme.spacing.s9};
`;

const ReasonIcon = styled.Image`
  width: 70px;
  height: 105px;
  margin-right: 10px;
`;

const ReasonTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  padding-right: ${({ theme }) => theme.padding.l};
`;

const ReasonTitle = styled(Subtitle2)`
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const ReasonText = styled(Caption)`
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = styled(AnimatedTouchableOpacity)`
  background-color: #fff;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  elevation: 5;
`;

const ReasonButtonText = styled(Body2)`
  padding: 4px 10px;
  color: ${({ theme }) => theme.colors.grey_8};
`;

const SelectedThemesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  padding-bottom: ${({ theme }) => theme.spacing.s3};
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 16px;
`;

export default AIRecommendTheme;
