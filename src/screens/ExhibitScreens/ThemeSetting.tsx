import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import GradientBackground from 'src/styles/GradientBackground';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Subtitle1, Subtitle2 } from 'src/styles/typography';
import ToastMessage from 'src/components/ToastMessage';
import TagButton from 'src/components/TagButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import { addTheme, removeTheme } from 'src/slices/themeSlice';
import { Container } from 'src/styles/layout';
import { useNavigation } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useToastMessage } from 'src/hooks/_index';

const ThemeSetting: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { selectedThemes, selectedAiThemes } = useSelector(
    (state: RootState) => state.theme,
  );
  const { toastVisible, toastMessage, showToast } = useToastMessage();
  const [inputText, setInputText] = useState('');

  // 헤더의 "다음" 버튼을 설정
  useEffect(() => {
    const isNextEnabled = selectedThemes.length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        nextScreenName: 'ArtworkInfoSetting',
        headerRightDisabled: !isNextEnabled,
      }),
    );
  }, [navigation, selectedThemes]);

  const handleAddTheme = () => {
    if (selectedThemes.includes(inputText.trim())) {
      showToast('이미 등록된 테마입니다');
    } else if (selectedThemes.length >= 3) {
      showToast('테마는 최대 3개까지 추가할 수 있습니다');
    } else {
      dispatch(addTheme({ name: inputText.trim(), isAI: false }));
      setInputText('');
    }
  };

  return (
    <Container>
      <GradientBackground />
      <ProgressBarComponent totalSteps={7} currentStep={3} />
      <TitleSubtitle
        title='전시의 테마를 알려주세요'
        subtitle='어떤 전시인지 테마로 설명해주세요'
        imageSource={require('src/assets/images/Character/character_smile.png')}
      />
      <AIButtonContainer>
        <AIRecommendBtn source='ThemeSetting' />
      </AIButtonContainer>
      <ThemeInputContainer>
        <Hash>#</Hash>
        <ThemeInput
          placeholder='테마를 추가해주세요 (최대 3개)'
          placeholderTextColor={`${({ theme }) => theme.colors.grey_8}`}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddTheme}
          returnKeyType='done'
          autoFocus={true}
          showSoftInputOnFocus={true}
        />
      </ThemeInputContainer>
      <SelectedThemesHeader>
        <Subtitle2>설정한 테마</Subtitle2>
        <Subtitle2>
          {selectedThemes.length}{' '}
          <Text style={{ color: theme.colors.grey_6 }}>/ 3</Text>
        </Subtitle2>
      </SelectedThemesHeader>
      <SelectedThemes>
        {selectedThemes.map((themeName, index) => (
          <TagButton
            key={index}
            text={themeName}
            onRemove={() => dispatch(removeTheme(themeName))}
            backgroundColor={
              selectedAiThemes.includes(themeName)
                ? theme.colors.cherryRed_10
                : theme.colors.grey_8
            }
            textColor='#fff'
          />
        ))}
      </SelectedThemes>
      <ToastMessage message={toastMessage} visible={toastVisible} />
    </Container>
  );
};

const AIButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.s9};
  margin-bottom: ${({ theme }) => theme.margin.xs};
`;

const Hash = styled(Subtitle1)`
  margin-left: ${({ theme }) => theme.margin.m};
  padding-right: ${({ theme }) => theme.padding.s};
`;

const ThemeInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.xxl};
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: #f7f5f5;
`;

const ThemeInput = styled.TextInput`
  flex: 1;
  padding: ${({ theme }) => theme.padding.s};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.button};
  color: ${({ theme }) => theme.colors.redBlack};
  letter-spacing: 1px;
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

export default ThemeSetting;
