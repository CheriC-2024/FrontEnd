import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProgressBar } from '../../components/ProgressBarContext';
import ProgressBarComponent from '../../components/ProgressBar';

const AIRecommend: React.FC = () => {
  const { step, setStep } = useProgressBar();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    setStep(1); // Set progress bar to step 2 (index 1)
  }, [setStep]);

  const handleSelectTheme = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else if (selectedThemes.length < 3) {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const themes = ['AI추천테마1', 'AI추천테마2', 'AI추천테마3', 'AI추천테마4'];

  const handleShowDetail = (theme: string) => {
    setSelectedTheme(theme);
  };

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <Title>AI가 전시 테마를 만들었어요!</Title>
      <SubTitle>원하는 전시 테마를 선택해주세요</SubTitle>
      <Instruction>테마를 클릭하면 추천 이유를 볼 수 있어요!</Instruction>
      <ThemeScrollView horizontal>
        {themes.map((theme, index) => (
          <ThemeCircle key={index} onPress={() => handleShowDetail(theme)}>
            <ThemeText>{`#${theme}`}</ThemeText>
          </ThemeCircle>
        ))}
      </ThemeScrollView>
      {selectedTheme && (
        <ThemeDetailContainer>
          <ThemeReasonTitle>{selectedTheme} 추천 이유</ThemeReasonTitle>
          <ThemeReasonText>
            많은 분들이 이 테마에 대해 긍정적인 반응을 보였어요. 이 테마는 여러
            작품과 잘 어울리며, 전시의 주제를 잘 표현할 수 있습니다.
          </ThemeReasonText>
        </ThemeDetailContainer>
      )}
      <SelectedThemesContainer>
        <SelectedThemesHeader>
          <SelectedThemesTitle>선택한 테마</SelectedThemesTitle>
          <SelectedCount>{selectedThemes.length} / 3</SelectedCount>
        </SelectedThemesHeader>
        <SelectedThemes>
          {selectedThemes.map((theme, index) => (
            <ThemeTag key={index}>
              <ThemeTagText>{`#${theme}`}</ThemeTagText>
              <RemoveButton onPress={() => handleSelectTheme(theme)}>
                <RemoveButtonText>X</RemoveButtonText>
              </RemoveButton>
            </ThemeTag>
          ))}
        </SelectedThemes>
      </SelectedThemesContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
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

const ThemeScrollView = styled(ScrollView)`
  flex-grow: 0;
  margin-bottom: 16px;
`;

const ThemeCircle = styled(TouchableOpacity)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #d3d3d3;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ThemeText = styled(Text)`
  text-align: center;
  color: #000;
  font-size: 12px;
`;

const ThemeDetailContainer = styled(View)`
  margin-bottom: 16px;
`;

const ThemeReasonTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ThemeReasonText = styled(Text)`
  font-size: 14px;
  color: #777;
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

const SelectedCount = styled.Text`
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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

const RemoveButton = styled(TouchableOpacity)`
  padding: 4px;
`;

const RemoveButtonText = styled.Text`
  font-size: 14px;
  color: #ff0000;
`;

export default AIRecommend;
