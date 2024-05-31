import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ThemeSetting: { selectedThemes: string[] };
};

type ThemeSettingRouteProp = RouteProp<RootStackParamList, 'ThemeSetting'>;

type ThemeSettingProps = {
  selectedThemes: string[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<string[]>>;
  goToNext: () => void;
};

const ThemeSetting: React.FC<ThemeSettingProps> = ({
  selectedThemes,
  setSelectedThemes,
  goToNext,
}) => {
  const route = useRoute<ThemeSettingRouteProp>();
  const [themes, setThemes] = useState<string[]>(selectedThemes || []);
  const [inputText, setInputText] = useState('');
  const { step, setStep } = useProgressBar();

  useEffect(() => {
    setStep(2); // Set progress bar to step 3 (index 2)
  }, [setStep]);

  useEffect(() => {
    if (route.params?.selectedThemes) {
      setThemes(route.params.selectedThemes);
    } else {
      setThemes(selectedThemes);
    }
  }, [route.params?.selectedThemes, selectedThemes]);

  const handleAddTheme = () => {
    if (inputText.trim() && themes.length < 3) {
      setThemes([...themes, inputText.trim()]);
      setSelectedThemes([...themes, inputText.trim()]);
      setInputText('');
    }
  };

  const handleRemoveTheme = (theme: string) => {
    const updatedThemes = themes.filter((t) => t !== theme);
    setThemes(updatedThemes);
    setSelectedThemes(updatedThemes);
  };

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <Title>전시의 테마를 알려주세요</Title>
      <SubTitle>이번 전시회의 테마로 설명해주세요</SubTitle>
      <AIButtonContainer>
        <AIRecommendBtn />
      </AIButtonContainer>
      <InputContainer>
        <Hash>#</Hash>
        <ThemeInput
          placeholder="테마를 추가해주세요 (최대 3개)"
          value={inputText}
          onChangeText={setInputText}
        />
        <AddButton
          onPress={handleAddTheme}
          disabled={!inputText.trim() || themes.length >= 3}
        >
          <AddButtonText disabled={!inputText.trim() || themes.length >= 3}>
            추가
          </AddButtonText>
        </AddButton>
      </InputContainer>
      <SelectedThemesContainer>
        <SelectedThemesHeader>
          <SelectedThemesTitle>설정한 테마</SelectedThemesTitle>
          <ThemeCount>{themes.length} / 3</ThemeCount>
        </SelectedThemesHeader>
        <SelectedThemes>
          {themes.map((theme, index) => (
            <ThemeTag key={index}>
              <ThemeTagText>#{theme}</ThemeTagText>
              <RemoveButton onPress={() => handleRemoveTheme(theme)}>
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

const AIButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Hash = styled.Text`
  font-size: 16px;
  padding: 8px;
  color: #000;
`;

const ThemeInput = styled.TextInput`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
`;

const AddButton = styled.TouchableOpacity<{ disabled: boolean }>`
  padding: 8px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#ff0000')};
  border-radius: 8px;
  margin-top: 8px;
`;

const AddButtonText = styled.Text<{ disabled: boolean }>`
  color: #fff;
  font-size: 14px;
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

export default ThemeSetting;
