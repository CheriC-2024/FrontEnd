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
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { RootStackParamList } from '../../navigations/AppNavigator';

const AIRecommendTheme: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedThemes, setSelectedThemes, aiThemes } = useGlobalState();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
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
        acc[theme] = new Animated.Value(12); // initial font size
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
      if (selectedThemes.length < 3) {
        setSelectedThemes([...selectedThemes, selectedTheme]);
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
        <TitleContainer>
          <Title>AI가 전시 테마를 만들었어요!</Title>
          <Subtitle>원하는 전시 테마를 선택해주세요</Subtitle>
        </TitleContainer>
        <ThemeScrollViewContainer>
          <ThemeScrollView horizontal showsHorizontalScrollIndicator={false}>
            {aiThemes.map((theme, index) => (
              <AnimatedThemeCircle
                key={index}
                onPress={() => handleThemeSelect(theme)}
                selected={
                  selectedThemes.includes(theme) || selectedTheme === theme
                }
                style={{ width: animations[theme], height: animations[theme] }}
              >
                {selectedTheme === theme ? (
                  <GradientCircle
                    colors={['#fff', '#ffd8d8']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  >
                    <AnimatedThemeText style={{ fontSize: 16 }}>
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
            source={require('../../assets/images/character_ai.png')}
          />
          {selectedTheme ? (
            <ReasonTextContainer>
              <ReasonTitle>추천 이유</ReasonTitle>
              <ReasonText multiline>
                {`${selectedTheme} AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다.`}
              </ReasonText>
              <ReasonButton onPress={handleAddTheme}>
                <ReasonButtonText>추가하기</ReasonButtonText>
              </ReasonButton>
            </ReasonTextContainer>
          ) : (
            <InitialReasonContainer>
              <ReasonTitle>
                테마를 클릭하면 추천 이유를 볼 수 있어요!
              </ReasonTitle>
              <InitialSubText>
                컬렉터님이 설정한 작품들로 테마를 만들었습니다:)
              </InitialSubText>
            </InitialReasonContainer>
          )}
        </ReasonContainer>
        <SelectedThemesContainer>
          <SelectedThemesHeader>
            <SelectedThemesTitle>설정한 테마</SelectedThemesTitle>
            <ThemeCount>
              <RedBlack>{selectedThemes.length}</RedBlack> / 3
            </ThemeCount>
          </SelectedThemesHeader>
          <SelectedThemes>
            {selectedThemes.map((theme, index) => (
              <ThemeTag key={index} isAITheme={aiThemes.includes(theme)}>
                <ThemeTagText>#{theme}</ThemeTagText>
                <RemoveButton
                  onPress={() =>
                    setSelectedThemes(selectedThemes.filter((t) => t !== theme))
                  }
                >
                  <RemoveButtonText>✕</RemoveButtonText>
                </RemoveButton>
              </ThemeTag>
            ))}
          </SelectedThemes>
        </SelectedThemesContainer>
      </Container>
      <ButtonContainer>
        <CompleteButton onPress={handleComplete}>
          <CompleteButtonText>완료하기</CompleteButtonText>
        </CompleteButton>
      </ButtonContainer>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const TitleContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 40px;
`;

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 18px;
  color: #120000;
`;

const Subtitle = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const ThemeScrollViewContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  height: 140px; /* Adjust based on the maximum height of the enlarged circles */
`;

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
`;

const ThemeCircle = styled.TouchableOpacity<{ selected: boolean }>`
  border-radius: 70px; /* Half of the larger size to ensure it remains circular */
  background-color: ${({ selected }) => (selected ? '#F7F5F5' : '#fff')};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  elevation: 5;
`;

const AnimatedThemeCircle = Animated.createAnimatedComponent(ThemeCircle);

const GradientCircle = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 70px; /* Half of the larger size to ensure it remains circular */
  justify-content: center;
  align-items: center;
`;

const ThemeText = styled.Text`
  text-align: center;
  font-family: 'Bold';
  color: #120000;
`;

const AnimatedThemeText = Animated.createAnimatedComponent(ThemeText);

const ReasonContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 63px;
  margin-bottom: 20px;
`;

const ReasonIcon = styled.Image`
  width: 65px;
  height: 120px;
  margin-right: 10px;
`;

const ReasonTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: 25px;
`;

const ReasonTitle = styled.Text`
  margin-bottom: 10px;
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const ReasonText = styled.Text`
  margin-bottom: 10px;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const InitialReasonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const InitialSubText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
  letter-spacing: 0.5px;
`;

const ReasonButton = styled.TouchableOpacity`
  align-items: flex-end;
  margin-left: auto;
  border-radius: 25px;
  background-color: #f7f5f5;
`;

const ReasonButtonText = styled.Text`
  padding: 4px 16px;
  font-family: 'Bold';
  font-size: 12px;
  color: #413333;
`;

const SelectedThemesContainer = styled.View`
  margin-top: 16px;
`;

const SelectedThemesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const SelectedThemesTitle = styled.Text`
  font-family: 'Bold';
  font-size: 16px;
  color: #120000;
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const ThemeTag = styled.View<{ isAITheme: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ isAITheme }) => (isAITheme ? '#e52c32' : '#413333')};
  padding: 4px 8px;
  border-radius: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const ThemeTagText = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  margin-right: 6px;
  color: #fff;
  letter-spacing: 0.5px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 0px;
`;

const RemoveButtonText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const ThemeCount = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #b0abab;
`;

const RedBlack = styled.Text`
  color: #120000;
`;

const ButtonContainer = styled.View`
  background-color: #fff;
`;

const CompleteButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: #120000;
  border-radius: 30px;
  align-items: center;
  margin: 16px;
`;

const CompleteButtonText = styled.Text`
  font-family: 'Bold';
  font-size: 16px;
  color: #fff;
`;

export default AIRecommendTheme;
