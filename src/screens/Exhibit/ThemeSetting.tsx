import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import { useGlobalState } from '../../contexts/GlobalStateContext';

const ThemeSetting: React.FC<{}> = ({}) => {
  const { selectedThemes, setSelectedThemes, aiThemes } = useGlobalState();
  const [themes, setThemes] = useState<string[]>(selectedThemes || []);
  const [inputText, setInputText] = useState('');
  const { step, setStep } = useProgressBar();

  useEffect(() => {
    setStep(2); // Set progress bar to step 3 (index 2)
  }, [step]);

  useEffect(() => {
    setThemes(selectedThemes);
  }, [selectedThemes]);

  const handleAddTheme = () => {
    if (
      inputText.trim() &&
      themes.length < 3 &&
      !themes.includes(inputText.trim())
    ) {
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
      <TitleContainer>
        <TitleIcon source={require('../../assets/images/character.png')} />
        <TitleText>
          <Title>전시의 테마를 알려주세요</Title>
          <Subtitle>어떤 전시인지 테마로 설명해주세요</Subtitle>
        </TitleText>
      </TitleContainer>
      <AIButtonContainer>
        <AIRecommendBtn source="ThemeSetting" />
      </AIButtonContainer>
      <InputContainer>
        <ThemeInputContainer>
          <Hash>#</Hash>
          <ThemeInput
            placeholder="테마를 추가해주세요 (최대 3개)"
            placeholderTextColor="#B0ABAB"
            value={inputText}
            onChangeText={setInputText}
          />
          <AddButton
            onPress={handleAddTheme}
            disabled={
              !inputText.trim() ||
              themes.length >= 3 ||
              themes.includes(inputText.trim())
            }
          >
            <AddButtonText
              disabled={
                !inputText.trim() ||
                themes.length >= 3 ||
                themes.includes(inputText.trim())
              }
            >
              추가
            </AddButtonText>
          </AddButton>
        </ThemeInputContainer>
      </InputContainer>
      <SelectedThemesHeader>
        <SelectedThemesTitle>설정한 테마</SelectedThemesTitle>
        <ThemeCount>
          <RedBlack>{themes.length}</RedBlack> / 3
        </ThemeCount>
      </SelectedThemesHeader>
      <SelectedThemes>
        {themes.map((theme, index) => (
          <ThemeTag key={index} isAITheme={aiThemes.includes(theme)}>
            <ThemeTagText># {theme}</ThemeTagText>
            <RemoveButton onPress={() => handleRemoveTheme(theme)}>
              <RemoveButtonText>✕</RemoveButtonText>
            </RemoveButton>
          </ThemeTag>
        ))}
      </SelectedThemes>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const TitleIcon = styled.Image`
  width: 45px;
  height: 75px;
  margin-right: 10px;
`;

const TitleText = styled.View`
  flex-direction: column;
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

const AIButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 94px;
`;

const Hash = styled.Text`
  margin-left: 15px;
  padding-right: 4px;
  font-family: 'Regular';
  font-size: 16px;
  color: #120000;
`;

const ThemeInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  background-color: #f7f5f5;
`;

const ThemeInput = styled.TextInput`
  flex: 1;
  padding: 8px;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const AddButton = styled.TouchableOpacity<{ disabled: boolean }>`
  margin-right: 2px;
  padding: 10px 12px;
  border-radius: 50px;
  background-color: ${({ disabled }) => (disabled ? '#B0ABAB' : '#120000')};
`;

const AddButtonText = styled.Text<{ disabled: boolean }>`
  color: #fff;
  font-size: 14px;
  font-family: 'Bold';
`;

const SelectedThemesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SelectedThemesTitle = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  letter-spacing: 0.5px;
`;

const ThemeCount = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #b0abab;
`;

const RedBlack = styled.Text`
  color: #120000;
`;

const SelectedThemes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ThemeTag = styled.View<{ isAITheme: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ isAITheme }) => (isAITheme ? '#e52c32' : '#413333')};
  padding: 4px 8px;
  border-radius: 30px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const ThemeTagText = styled.Text`
  margin-right: 3px;
  font-family: 'Regular';
  font-size: 14px;
  letter-spacing: 0.5px;
  color: #fff;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 0px;
`;

const RemoveButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  color: #fff;
`;

export default ThemeSetting;
