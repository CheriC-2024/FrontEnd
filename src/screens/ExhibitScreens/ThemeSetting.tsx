import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import ProgressBarComponent from '../../components/ProgressBar';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import GradientBackground from 'src/styles/GradientBackground';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Body2, Subtitle1, Subtitle2 } from 'src/styles/typography';
import ToastMessage from 'src/components/ToastMessage';
import TagButton from 'src/components/TagButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import { addTheme, removeTheme, resetThemeState } from 'src/slices/themeSlice';
import { Container } from 'src/styles/layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useToastMessage } from 'src/hooks/_index';
import { Btn, BtnText } from 'src/components/Button';

const ThemeSetting: React.FC<{}> = ({}) => {
  const route = useRoute();
  const editMode = route.params?.editMode ?? false;
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { selectedThemes, selectedAiThemes } = useSelector(
    (state: RootState) => state.theme,
  );
  const { toastVisible, toastMessage, showToast } = useToastMessage();
  const [inputText, setInputText] = useState('');

  // 화면에 처음 진입 시 초기화
  useEffect(() => {
    dispatch(resetThemeState()); // 테마 상태 초기화
  }, []);

  // 헤더의 "다음" 버튼을 설정
  useEffect(() => {
    const isNextEnabled = selectedThemes.length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        editMode: true,
        leftButtonType: editMode ? 'icon' : 'text',
        headerRightText: editMode ? undefined : '다음',
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

  const handleSave = () => {
    navigation.replace('FinishSetting');
    navigation.goBack();
  };

  return (
    <Container>
      <GradientBackground />
      {!editMode && <ProgressBarComponent totalSteps={7} currentStep={3} />}
      <TitleSubtitle
        titleLarge={editMode ? '전시 테마 수정하기' : '전시 테마 정하기'}
        subtitle={
          editMode
            ? '수정하신 후에 꼭 저장해주세요:)'
            : '어떤 전시인지 테마로 설명해주세요'
        }
        imageSource={
          editMode
            ? undefined
            : require('src/assets/images/Character/character_smile.png')
        }
      />
      <AIButtonContainer>
        <AIRecommendBtn source='ThemeSetting' />
      </AIButtonContainer>
      <ThemeInputContainer>
        <Hash>#</Hash>
        <ThemeInput
          placeholder='테마를 추가해주세요 (최대 3개)'
          placeholderTextColor={`${({ theme }) => theme.colors.grey_6}`}
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
        <Body2>
          {selectedThemes.length}{' '}
          <Text style={{ color: theme.colors.grey_6 }}>/ 3</Text>
        </Body2>
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
      {editMode && (
        <Btn style={{ marginHorizontal: 16 }} onPress={handleSave}>
          <BtnText>수정한 내용 저장하기</BtnText>
        </Btn>
      )}
      <ToastMessage message={toastMessage} visible={toastVisible} />
    </Container>
  );
};

const AIButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 8px;
`;

const Hash = styled(Subtitle1)`
  margin-left: ${({ theme }) => theme.margin.m};
  padding-right: ${({ theme }) => theme.padding.xs};
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
