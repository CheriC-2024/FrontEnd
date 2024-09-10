import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import {
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { H5, Subtitle2, Body1, ButtonText, Body2 } from '../styles/typography';
import InfoBlock from '../components/InfoBlock';
import TitleSubtitle from '../components/TitleSubtitle';
import { Btn, BtnText } from '../components/Button';
import ToastMessage from '../components/ToastMessage';
import { useToastMessage } from '../hooks/useToastMessage';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from 'src/styles/GradientBackground';

const SignupScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [collectingExperience, setCollectingExperience] = useState<
    string | null
  >(null);
  const [isArtist, setIsArtist] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const { toastVisible, toastMessage, showToast } = useToastMessage();
  const [interests, setInterests] = useState<string[]>([]);

  // 모든 필수 입력이 완료되었는지 확인하는 함수
  const isFormValid = () => {
    return (
      nickname !== '' &&
      collectingExperience !== null &&
      isArtist !== null &&
      interests.length > 0
    );
  };

  const handleNicknameConfirm = () => {
    if (nickname === '') {
      showToast('닉네임을 입력해주세요.');
    } else {
      // 닉네임 확인 로직
      showToast('닉네임이 확인되었습니다.');
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else if (interests.length < 2) {
      setInterests([...interests, interest]);
    } else {
      showToast('관심 분야는 최대 2개까지 선택 가능합니다.');
    }
  };

  const interestOptions = [
    {
      label: '뉴미디어',
      image: require('../assets/images/SignUpPage/interest1.png'),
    },
    {
      label: '동양화',
      image: require('../assets/images/SignUpPage/interest2.png'),
    },
    {
      label: '드로잉',
      image: require('../assets/images/SignUpPage/interest3.png'),
    },
    {
      label: '디자인',
      image: require('../assets/images/SignUpPage/interest4.png'),
    },
    {
      label: '수채화',
      image: require('../assets/images/SignUpPage/interest5.png'),
    },
    {
      label: '유화',
      image: require('../assets/images/SignUpPage/interest6.png'),
    },
    {
      label: '판화',
      image: require('../assets/images/SignUpPage/interest7.png'),
    },
    {
      label: '회화',
      image: require('../assets/images/SignUpPage/interest8.png'),
    },
  ];

  // 유효성 검사 결과와 그에 따른 메시지 반환 함수
  const validateForm = () => {
    if (nickname === '') {
      return '닉네임을 입력해주세요.';
    }
    if (interests.length === 0) {
      return '관심 분야를 선택해주세요.';
    }
    if (collectingExperience === null) {
      return '아트 컬렉팅 경험을 선택해주세요.';
    }
    if (isArtist === null) {
      return '미술 작가 여부를 선택해주세요.';
    }
    return null; // 유효할 때는 null 반환
  };

  // onPress 핸들러 함수
  const handlePress = () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      showToast(validationMessage); // 유효하지 않을 때 토스트 메시지 표시
    } else {
      handleFormSubmit(); // 유효할 때 폼 제출 로직 실행
    }
  };

  const handleFormSubmit = () => {
    // 모든 폼 필드가 유효할 때 메인으로 네비게이트
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <GradientBackground />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <TitleSubtitle
            title={<H5>CheriC에 처음 오셨군요!</H5>}
            subtitle={
              <ButtonText>
                컬렉터님을 알아갈 수 있게 정보를 입력해주세요
              </ButtonText>
            }
          />

          <InputLabel>
            닉네임 <Red>*</Red>
          </InputLabel>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <InputField
              placeholder="컬렉터님의 닉네임을 작성해 주세요"
              value={nickname}
              onChangeText={setNickname} // 상태 업데이트
            />
            <ConfirmButton onPress={handleNicknameConfirm}>
              <ConfirmButtonText>확인</ConfirmButtonText>
            </ConfirmButton>
          </View>
          <InfoBlock
            label="자기소개"
            placeholder="컬렉터님의 자기 소개를 작성해 주세요"
            maxLength={100}
          />

          <InputLabel>
            관심 분야(최대 2개) <Red>*</Red>
          </InputLabel>
          <InterestSection>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {interestOptions.map((interest, index) => {
                const overlayColor =
                  index < 4
                    ? theme.colors.redBlack_alpha20
                    : theme.colors.redBlack_alpha40;

                return (
                  <InterestButton
                    key={interest.label}
                    selected={interests.includes(interest.label)}
                    onPress={() => toggleInterest(interest.label)}
                  >
                    <InterestButtonImage source={interest.image}>
                      <Overlay
                        overlayColor={overlayColor}
                        selected={interests.includes(interest.label)}
                      />
                      <InterestText
                        selected={interests.includes(interest.label)}
                      >
                        {interest.label}
                      </InterestText>
                    </InterestButtonImage>
                  </InterestButton>
                );
              })}
            </View>
          </InterestSection>

          <InputLabel>
            아트 컬렉팅 경험 <Red>*</Red>
          </InputLabel>
          <RadioSection>
            <RadioButton
              selected={collectingExperience === 'yes'}
              onPress={() => setCollectingExperience('yes')}
            >
              <RadioButtonCircle selected={collectingExperience === 'yes'}>
                <RadioButtonInnerCircle
                  selected={collectingExperience === 'yes'}
                />
              </RadioButtonCircle>
              <RadioLabel selected={collectingExperience === 'yes'}>
                경험이 있어요!
              </RadioLabel>
            </RadioButton>
            <RadioButton
              selected={collectingExperience === 'no'}
              onPress={() => setCollectingExperience('no')}
            >
              <RadioButtonCircle selected={collectingExperience === 'no'}>
                <RadioButtonInnerCircle
                  selected={collectingExperience === 'no'}
                />
              </RadioButtonCircle>
              <RadioLabel selected={collectingExperience === 'no'}>
                아직 경험이 없어요!
              </RadioLabel>
            </RadioButton>
          </RadioSection>

          <InputLabel>
            미술 작가이신가요? <Red>*</Red>
          </InputLabel>
          <RadioSection>
            <RadioButton
              selected={isArtist === 'yes'}
              onPress={() => setIsArtist('yes')}
            >
              <RadioButtonCircle selected={isArtist === 'yes'}>
                <RadioButtonInnerCircle selected={isArtist === 'yes'} />
              </RadioButtonCircle>
              <RadioLabel selected={isArtist === 'yes'}>
                네, 미술 작가 입니다
              </RadioLabel>
            </RadioButton>
            <RadioButton
              selected={isArtist === 'no'}
              onPress={() => setIsArtist('no')}
            >
              <RadioButtonCircle selected={isArtist === 'no'}>
                <RadioButtonInnerCircle selected={isArtist === 'no'} />
              </RadioButtonCircle>
              <RadioLabel selected={isArtist === 'no'}>아니에요!</RadioLabel>
            </RadioButton>
          </RadioSection>
          <View style={{ marginBottom: 20 }} />
          <Btn
            onPress={handlePress}
            style={{
              backgroundColor: isFormValid()
                ? theme.colors.redBlack
                : theme.colors.grey_6,
            }}
          >
            <BtnText>
              {isFormValid() ? '회원가입 완료하기' : '필수 정보를 입력하세요'}
            </BtnText>
          </Btn>
          <View style={{ marginBottom: 20 }} />
        </ScrollView>
        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0 ${(props) => props.theme.spacing.s4};
  padding-top: 60px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #4e3b3b;
  padding: 10px 20px;
  border-radius: 24px;
  margin-left: 8px;
  margin-bottom: ${(props) => props.theme.spacing.s7};
  align-items: center;
  justify-content: center;
`;

const ConfirmButtonText = styled(Body2)`
  color: #fff;
`;

const InputLabel = styled(Subtitle2)`
  color: ${(props) => props.theme.colors.redBlack};
  margin-top: ${(props) => props.theme.spacing.s7};
  margin-left: ${(props) => props.theme.spacing.s1};
  margin-bottom: ${(props) => props.theme.spacing.s1};
`;

const InputField = styled(TextInput)`
  flex: 1;
  border-radius: ${(props) => props.theme.radius.m};
  padding-left: ${(props) => props.theme.spacing.s4};
  padding-top: ${(props) => props.theme.spacing.s2};
  padding-bottom: ${(props) => props.theme.spacing.s2};
  margin-bottom: ${(props) => props.theme.spacing.s7};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.body2};
  background-color: ${(props) => props.theme.colors.grey_4};
`;

const InterestSection = styled.View`
  margin-top: ${(props) => props.theme.spacing.s2};
`;

const InterestButton = styled.TouchableOpacity<{ selected: boolean }>`
  display: flex;
  width: 77px;
  height: 77px;
  border-radius: 39px;
  overflow: hidden;
  margin: 6px;
  align-items: center;
  justify-content: center;
`;

const InterestButtonImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.View<{ overlayColor: string; selected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.cherryRed_alpha80 : props.overlayColor};
  z-index: 1;
`;

const InterestText = styled(Body1)<{ selected: boolean }>`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.bold};
  text-align: center;
  z-index: 2;
`;

const RadioSection = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.m};
`;

const RadioButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.s2};
`;

const RadioButtonCircle = styled.View<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.grey_4};
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing.s2};
`;

const RadioButtonInnerCircle = styled.View<{ selected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.cherryRed_10 : 'transparent'};
`;

const RadioLabel = styled(Body2)<{ selected: boolean }>`
  color: ${(props) => props.theme.colors.redBlack};
  font-family: ${(props) =>
    props.selected ? props.theme.fonts.bold : props.theme.fonts.regular};
`;

const Red = styled.Text`
  color: ${(props) => props.theme.colors.cherryRed_10};
`;

export default SignupScreen;
