import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigations/AppNavigator';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { addTheme, removeTheme } from '../../slices/themeSlice';
import { RootState } from 'src/store';
import TagButton from 'src/components/TagButton';
import { Caption, Subtitle2 } from 'src/styles/typography';
import { theme } from 'src/styles/theme';
import ToastMessage from 'src/components/ToastMessage';
import { Btn, BtnText } from 'src/components/Button';
import RefreshIcon from '../../assets/icons/refresh';

const AIRecommendTheme: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const selectedThemes = useSelector(
    (state: RootState) => state.theme.selectedThemes,
  );
  const selectedAiThemes = useSelector(
    (state: RootState) => state.theme.selectedAiThemes,
  );
  const aiThemes = useSelector(
    (state: RootState) => state.aiRecommend.aiThemes,
  );
  const aiThemeReason = useSelector(
    (state: RootState) => state.aiRecommend.aiThemeReason,
  );

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

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

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

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
        <TitleSubtitle
          title="AI가 전시 테마를 만들었어요!"
          subtitle="원하는 전시 테마를 선택해주세요"
        />
        <RefreshIcon />
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
              <ReasonTitle>
                테마를 클릭하면 추천 이유를 볼 수 있어요!
              </ReasonTitle>
              <ReasonText>
                컬렉터님이 설정한 작품들로 테마를 만들었습니다:)
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
              textColor="#fff"
            />
          ))}
        </SelectedThemes>
        <Btn onPress={handleComplete}>
          <BtnText>완료하기</BtnText>
        </Btn>
      </Container>

      <ToastMessage message={toastMessage} visible={toastVisible} />
    </>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const ThemeScrollViewContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
