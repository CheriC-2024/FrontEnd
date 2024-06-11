import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { RootStackParamList } from '../../navigations/AppNavigator';

const AIRecommendDescription: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedThemes, setSelectedThemes } = useGlobalState();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

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
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else if (selectedThemes.length < 3) {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const themes = ['AI추천테마1', 'AI추천테마2', 'AI추천테마3', 'AI추천테마4'];

  const handleComplete = () => {
    navigation.navigate('Exhibit', { step: 4, selectedThemes });
  };

  return (
    <Container>
      <Content>
        <Title>AI가 전시명을 만들었어요!</Title>
        <SubTitle>전시명을 선택해주세요</SubTitle>
        <Instruction>전시명을 클릭하면 추천 이유를 볼 수 있어요!</Instruction>
        <ThemeScrollView horizontal>
          {themes.map((theme, index) => (
            <ThemeCircle
              key={index}
              onPress={() => {
                setSelectedTheme(theme);
                handleThemeSelect(theme);
              }}
              selected={selectedThemes.includes(theme)}
            >
              <ThemeText>{`#${theme}`}</ThemeText>
            </ThemeCircle>
          ))}
        </ThemeScrollView>
        {selectedTheme && (
          <RecommendationReason>
            <RecommendationReasonText>
              {`${selectedTheme} 추천 이유: AI가 자동으로 선택한 테마입니다. 이 테마는 ...`}
            </RecommendationReasonText>
          </RecommendationReason>
        )}
        <SelectedThemesContainer>
          <SelectedThemesHeader>
            <SelectedThemesTitle>선택한 테마</SelectedThemesTitle>
            <ThemeCount>{selectedThemes.length} / 3</ThemeCount>
          </SelectedThemesHeader>
          <SelectedThemes>
            {selectedThemes.map((theme, index) => (
              <ThemeTag key={index}>
                <ThemeTagText>#{theme}</ThemeTagText>
                <RemoveButton onPress={() => handleThemeSelect(theme)}>
                  <RemoveButtonText>X</RemoveButtonText>
                </RemoveButton>
              </ThemeTag>
            ))}
          </SelectedThemes>
        </SelectedThemesContainer>
      </Content>
      <CompleteButton onPress={handleComplete}>
        <CompleteButtonText>완료</CompleteButtonText>
      </CompleteButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Instruction = styled.Text`
  font-size: 14px;
  color: #777;
  margin-bottom: 16px;
`;

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
  margin-bottom: 16px;
`;

const ThemeCircle = styled.TouchableOpacity<{ selected: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ selected }) => (selected ? '#d3d3d3' : '#f0f0f0')};
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ThemeText = styled.Text`
  text-align: center;
  color: #000;
  font-size: 12px;
`;

const RecommendationReason = styled.View`
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const RecommendationReasonText = styled.Text`
  font-size: 14px;
  color: #333;
`;

const SelectedThemesContainer = styled.View`
  margin-top: 16px;
`;

const SelectedThemesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedThemesTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const ThemeTag = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 4px;
`;

const ThemeTagText = styled.Text`
  font-size: 14px;
  margin-right: 8px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

const RemoveButtonText = styled.Text`
  font-size: 14px;
  color: #ff0000;
`;

const ThemeCount = styled.Text`
  font-size: 14px;
  color: #777;
`;

const CompleteButton = styled.TouchableOpacity`
  padding: 16px;
  background-color: #000;
  border-radius: 8px;
  align-items: center;
  margin: 16px;
`;

const CompleteButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default AIRecommendDescription;
