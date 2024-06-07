import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import AIRecommendBtn from '../../components/AIRecommendBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { useGlobalState } from '../../contexts/GlobalStateContext';

interface DescriptionSettingProps {
  onFieldsFilled: (filled: boolean) => void;
}

const DescriptionSetting: React.FC<DescriptionSettingProps> = ({
  onFieldsFilled,
}) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    selectedFont,
    setSelectedFont,
  } = useGlobalState();
  const { step, setStep } = useProgressBar();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Exhibit'>>();

  useEffect(() => {
    setStep(4); // Set progress bar to step 4
  }, [setStep]);

  useEffect(() => {
    const allFieldsFilled = title.trim() !== '' && description.trim() !== '';
    onFieldsFilled(allFieldsFilled);
  }, [title, description]);

  const handleGoToArtworkList = () => {
    navigation.navigate('ArtworkList');
  };

  const data = [
    { label: '기본 시스템 폰트', value: '기본 시스템 폰트' },
    { label: 'Pretendard', value: 'Pretendard' },
    { label: 'Arial', value: 'Arial' },
  ];

  return (
    <Container>
      <ProgressBarComponent totalSteps={7} />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TitleContainer>
          <TitleIcon source={require('../../assets/images/character.png')} />
          <TitleText>
            <Title>전시 이름과 설명을 작성해주세요</Title>
            <Subtitle>거의 다 왔어요! 조금만 더 힘내요</Subtitle>
          </TitleText>
        </TitleContainer>
        <InputContainer>
          <AIButtonContainer>
            <InputLabel>
              전시 이름 <Red>*</Red>
            </InputLabel>
            <AIRecommendBtn source="DescriptionSetting" />
          </AIButtonContainer>
          <Input
            placeholder="ex) 항해: 김아무개전"
            placeholderTextColor="#b0abab"
            maxLength={30}
            value={title}
            onChangeText={setTitle}
            returnKeyType="done"
            onSubmitEditing={() => {}}
          />
          <CharacterCount>
            <Black>{title.length}</Black> / 30
          </CharacterCount>
        </InputContainer>
        <View style={{ zIndex: 1000 }}>
          <InputContainer>
            <InputLabel>
              폰트 설정 <Red>*</Red>
            </InputLabel>
            <DropDownContainer>
              <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="폰트를 선택하세요"
                value={selectedFont}
                onChange={(item) => {
                  setSelectedFont(item.value);
                }}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 15,
                  backgroundColor: '#f7f5f5',
                  borderRadius: 20,
                }}
                placeholderStyle={{
                  fontFamily: 'Regular',
                  fontSize: 12,
                  color: '#120000',
                }}
                selectedTextStyle={{
                  fontFamily: 'Regular',
                  fontSize: 12,
                  color: '#120000',
                }}
              />
            </DropDownContainer>
          </InputContainer>
        </View>
        <InputContainer>
          <InputLabel>
            전시 설명 <Red>*</Red>
          </InputLabel>
          <Input
            placeholder="컬렉터님만의 작품 감상평을 알려주세요"
            placeholderTextColor="#b0abab"
            multiline
            maxLength={500}
            value={description}
            onChangeText={setDescription}
            style={{ height: 150 }}
            returnKeyType="done"
            blurOnSubmit={true}
          />
          <CharacterCount>
            <Black>{description.length}</Black> / 500
          </CharacterCount>
        </InputContainer>
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

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #fff;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
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
  justify-content: space-between;
`;

const InputContainer = styled.View`
  margin-top: 30px;
  position: relative;
  z-index: 1;
`;

const InputLabel = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  margin-bottom: 5px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const Red = styled.Text`
  color: #e52c32;
`;

const Black = styled.Text`
  color: #120000;
`;

const Input = styled(RNTextInput)`
  padding: 12px 15px;
  font-family: 'Regular';
  font-size: 12px;
  border-radius: 20px;
  background-color: #f7f5f5;
  color: #120000;
  letter-spacing: 0.5px;
  text-align-vertical: top;
  padding-bottom: 30px; /* Adjust padding to make space for character count */
`;

const CharacterCount = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
  position: absolute;
  right: 15px;
  bottom: 10px;
`;

const DropDownContainer = styled.View`
  z-index: 1000; /* Ensure dropdown is above other elements */
`;

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

const ButtonText = styled.Text`
  padding: 12px 15px;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const ButtonIcon = styled(Icon)`
  margin-right: 15px;
`;

export default DescriptionSetting;
