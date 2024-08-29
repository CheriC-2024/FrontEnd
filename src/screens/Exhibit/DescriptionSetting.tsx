import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator';
import GradientBackground from 'src/styles/GradientBackground';
import { Container } from 'src/styles/layout';
import TitleSubtitle from 'src/components/TitleSubtitle';
import InfoBlock from 'src/components/InfoBlock';
import { theme } from 'src/styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  setExhibitTitle,
  setExhibitDescription,
  setSelectedFont,
} from 'src/slices/exhibitSlice';
import { Caption, Subtitle2 } from 'src/styles/typography';
import { ScrollView } from 'react-native-gesture-handler';

interface DescriptionSettingProps {
  onFieldsFilled: (filled: boolean) => void;
}

const DescriptionSetting: React.FC<DescriptionSettingProps> = ({
  onFieldsFilled,
}) => {
  const dispatch = useDispatch();
  const { exhibitTitle, exhibitDescription, selectedFont, fontData } =
    useSelector((state: RootState) => state.exhibit);
  const { step, setStep } = useProgressBar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Exhibit'>>();

  useEffect(() => {
    setStep(4); // Set progress bar to step 4
  }, [setStep]);

  useEffect(() => {
    const allFieldsFilled =
      exhibitTitle.trim() !== '' && exhibitDescription.trim() !== '';
    onFieldsFilled(allFieldsFilled);
  }, [exhibitTitle, exhibitDescription]);

  const handleGoToArtworkList = () => {
    navigation.navigate('ArtworkList');
  };

  return (
    <Container>
      <GradientBackground />
      <ProgressBarComponent totalSteps={7} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleSubtitle
          title="전시 이름과 설명을 작성해주세요"
          subtitle="거의 다 왔어요! 조금만 더 힘내요"
          imageSource={require('src/assets/images/Character/character_happy.png')}
        />
        <InputContainer>
          <InfoBlock
            label="전시 이름"
            placeholder="ex) 항해 : 김아무개전"
            maxLength={30}
            required
            value={exhibitTitle}
            onChangeText={(text) => dispatch(setExhibitTitle(text))}
            style={{ paddingBottom: parseInt(theme.padding.l) }}
          />
          <AIButtonContainer>
            <AIRecommendBtn source="DescriptionSetting" />
          </AIButtonContainer>
        </InputContainer>
        <DropdownContainer>
          <DropdownLabel>
            폰트 설정<Red>*</Red>
          </DropdownLabel>
          <DropdownWrapper>
            <Dropdown
              data={fontData}
              labelField="label"
              valueField="value"
              placeholder="폰트를 선택하세요"
              value={selectedFont}
              onChange={(item) => {
                dispatch(setSelectedFont(item.value));
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setIsDropdownOpen(false)}
              style={dropdownStyle}
              placeholderStyle={placeholderStyle}
              selectedTextStyle={selectedTextStyle}
              renderRightIcon={() => (
                <Icon
                  name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={theme.colors.redBlack}
                />
              )}
              renderItem={(item) => (
                <DropdownItem>
                  <DropdownItemLabel>{item.label}</DropdownItemLabel>
                  <DropdownItemText style={{ fontFamily: item.fontFamily }}>
                    {exhibitTitle || '여기에 전시 제목이 뜹니다'}
                  </DropdownItemText>
                </DropdownItem>
              )}
            />
          </DropdownWrapper>
        </DropdownContainer>
        <InfoBlock
          label="전시 설명"
          placeholder="컬렉터님만의 감상을 담아 전시를 소개해주세요"
          maxLength={500}
          required
          value={exhibitDescription}
          onChangeText={(text) => dispatch(setExhibitDescription(text))}
          style={{ paddingBottom: parseInt(theme.padding.l) }}
        />
        <Button onPress={handleGoToArtworkList}>
          <ButtonContent>
            <ButtonText>전시로 올려진 작품 보러가기</ButtonText>
            <ButtonIcon name="chevron-forward" size={16} color="#120000" />
          </ButtonContent>
        </Button>
      </ScrollView>
    </Container>
  );
};

const AIButtonContainer = styled.View`
  position: absolute;
  right: 0px;
`;

const InputContainer = styled.View`
  margin-top: 30px;
  position: relative;
  z-index: 1;
`;

const Red = styled.Text`
  color: ${theme.colors.cherryRed_10};
`;

const DropdownContainer = styled.View`
  z-index: 1000;
`;

const DropdownLabel = styled(Subtitle2)`
  margin-left: ${theme.margin.xs};
  margin-bottom: ${theme.margin.xs};
  color: ${theme.colors.redBlack};
  letter-spacing: 0.5px;
`;

const DropdownWrapper = styled.View`
  background-color: ${theme.colors.grey_4};
  border-radius: 20px;
  margin-bottom: ${theme.spacing.s6};
`;

const DropdownItem = styled.View`
  padding: 10px;
`;

const DropdownItemLabel = styled(Caption)`
  margin-bottom: ${theme.margin.xs};
  color: ${theme.colors.grey_6};
`;

const DropdownItemText = styled.Text`
  font-size: ${theme.fontSizes.body1};
`;

const dropdownStyle = {
  paddingVertical: 4,
  paddingHorizontal: 16,
  backgroundColor: theme.colors.grey_4,
  borderRadius: 24,
};

const placeholderStyle = {
  fontFamily: 'PretendardRegular',
  fontSize: 12,
  color: theme.colors.grey_6,
};

const selectedTextStyle = {
  fontFamily: 'PretendardRegular',
  fontSize: 12,
  color: theme.colors.redBlack,
};

const Button = styled.TouchableOpacity`
  margin: 10px 0 20px 0;
  border-radius: 20px;
  border: 1px solid #f7f5f5;
  background-color: white;
  justify-content: center;
  z-index: 1; /* Ensure button is above other elements */
`;

const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled(Caption)`
  padding: 12px 16px;
  letter-spacing: 0.5px;
`;

const ButtonIcon = styled(Icon)`
  margin-right: 15px;
`;

export default DescriptionSetting;
