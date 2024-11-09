import React, { useState } from 'react';
import { Text, Animated } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from 'src/navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTheme, removeTheme } from '../../slices/themeSlice';
import { useToastMessage } from 'src/hooks/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { TitleSubtitle, TagButton, ToastMessage } from 'src/components/_index';
import { Btn, BtnText } from 'src/components/Button';
import { Container } from 'src/styles/layout';
import { RefreshIcon } from '../../assets/icons/_index.js';
import { Caption, Subtitle1, Subtitle2 } from 'src/styles/typography';

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

  // navigation.setOptions(
  //   headerOptions(navigation, {
  //     leftButtonType: null,
  //     headerTitle: '전시 테마 AI 추천',
  //     headerTitleAlign: 'left',
  //   }),
  // );

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

  const handleThemeSelect = (theme: string) => {
    if (selectedTheme !== theme) {
      if (selectedTheme) {
        animateCircle(selectedTheme, 100, 12); // reset to original size
      }
      setSelectedTheme(theme);
      animateCircle(theme, 140, 16); // enlarge circle and text
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

  return (
    <>
      <Container>
        <HeaderText>전시 테마 AI 추천</HeaderText>
        <TitleSubtitle
          titleLarge='AI가 만든 전시 테마'
          subtitle='원하는 전시 테마를 선택해 주세요'
          style={{ marginBottom: 12 }}
        />
        <RefreshIcon size={30} />
        <ThemeScrollViewContainer>
          <ThemeScrollView horizontal showsHorizontalScrollIndicator={false}>
            {aiThemes.map((theme, index) => (
              <AnimatedThemeCircle
                key={index}
                onPress={() => handleThemeSelect(theme)}
                selected={
                  selectedThemes.includes(theme) || selectedTheme === theme
                }
                style={{
                  width: animations[theme],
                  height: animations[theme],
                  alignSelf: 'center', // 여기서 중앙 정렬 유지
                }}
              >
                {selectedTheme === theme ? (
                  <GradientCircle colors={['#fff', '#FDEDED']}>
                    <AnimatedThemeText
                      style={{ fontSize: 16, fontFamily: 'PretendardBold' }}
                    >
                      {`#${theme}`}
                    </AnimatedThemeText>
                  </GradientCircle>
                ) : (
                  <AnimatedThemeText
                    style={{ fontSize: textAnimations[theme] }}
                  >
                    {`#${theme}`}
                  </AnimatedThemeText>
                )}
              </AnimatedThemeCircle>
            ))}
          </ThemeScrollView>
        </ThemeScrollViewContainer>

        <ReasonContainer>
          <ReasonIcon
            source={require('src/assets/images/Character/character_ai.png')}
          />
          {selectedTheme ? (
            <ReasonTextContainer>
              <ReasonTitle>추천 이유</ReasonTitle>
              <ReasonText>
                {aiThemeReason[aiThemes.indexOf(selectedTheme)]}
              </ReasonText>
              <ReasonButton onPress={handleAddTheme}>
                <ReasonButtonText>추가하기</ReasonButtonText>
              </ReasonButton>
            </ReasonTextContainer>
          ) : (
            <ReasonTextContainer>
              <ReasonTitle>테마를 클릭하고 추천 이유 보기</ReasonTitle>
              <ReasonText>
                컬렉터님이 선택한 작품들로 테마를 만들었어요!
              </ReasonText>
            </ReasonTextContainer>
          )}
        </ReasonContainer>
        <SelectedThemesHeader>
          <Subtitle2>설정한 테마</Subtitle2>
          <Subtitle2>
            {selectedThemes.length}{' '}
            <Text style={{ color: theme.colors.grey_6 }}>/ 3</Text>
          </Subtitle2>
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
`;

const ThemeScrollViewContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 150px;
`;

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
`;

const ThemeCircle = styled.TouchableOpacity<{ selected: boolean }>`
  border-radius: 70px;
  background-color: ${({ selected }) => (selected ? '#F7F5F5' : '#fff')};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 5px 10px 5px 5px; /*그림자 잘리는 것 방지 */
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
  padding-top: ${({ theme }) => theme.padding.l};
  padding-bottom: ${({ theme }) => theme.padding.l};
  margin-top: ${({ theme }) => theme.spacing.s11};
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

const ReasonButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-self: flex-end;
  margin-top: ${({ theme }) => theme.margin.xl};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: #f7f5f5;
`;

const ReasonButtonText = styled(Caption)`
  padding: 4px 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.grey_8};
`;

const SelectedThemesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.s3};
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default AIRecommendTheme;
