import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ScrollView, TextInput, View, ImageBackground } from 'react-native';
import { H1, H5, Subtitle2, Body1, ButtonText } from '../components/Typography';
import InfoBlock from '../components/InfoBlock';
import TitleSubtitle from '../components/TitleSubtitle';
import { Btn, BtnText } from '../components/Button';
import ToastMessage from '../components/ToastMessage';
import { useToastMessage } from '../hooks/useToastMessage';

const SignupScreen: React.FC = () => {
  const theme = useTheme();
  const [collectingExperience, setCollectingExperience] = useState<
    string | null
  >(null);
  const [isArtist, setIsArtist] = useState<string | null>(null);
  const { toastVisible, toastMessage, showToast } = useToastMessage();
  const [interests, setInterests] = useState<string[]>([]);

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
      label: '동화책',
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

  return (
    <ScrollView>
      <Container>
        <TitleSubtitle
          title={<H5>CheriC에 처음 오셨군요!</H5>}
          subtitle={
            <ButtonText>
              컬렉터님을 알아갈 수 있게 정보를 입력해주세요
            </ButtonText>
          }
        />

        <InputLabel>닉네임 *</InputLabel>
        <InputField placeholder="컬렉터님의 닉네임을 작성해 주세요" />

        <InfoBlock
          label="자기소개"
          placeholder="컬렉터님의 자기 소개를 작성해 주세요"
          maxLength={100}
        />

        <InputLabel>관심 분야(최대 2개) *</InputLabel>
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
                    <InterestText selected={interests.includes(interest.label)}>
                      {interest.label}
                    </InterestText>
                  </InterestButtonImage>
                </InterestButton>
              );
            })}
          </View>
        </InterestSection>

        <InputLabel>아트 컬렉팅 경험 *</InputLabel>
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

        <InputLabel>미술 작가이신가요? *</InputLabel>
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
      </ScrollView>
        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.s6};
`;

const InputLabel = styled(Subtitle2)`
  color: ${(props) => props.theme.colors.redBlack};
  margin-top: ${(props) => props.theme.spacing.s7};
  margin-left: ${(props) => props.theme.spacing.s1};
  margin-bottom: ${(props) => props.theme.spacing.s1};
`;

const InputField = styled(TextInput)`
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
  margin-bottom: ${(props) => props.theme.spacing.s6};
`;

const InterestButton = styled.TouchableOpacity<{ selected: boolean }>`
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
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.s6};
`;

const RadioButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.s2};
  border-radius: ${(props) => props.theme.radius.s};
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

const RadioLabel = styled(Body1)<{ selected: boolean }>`
  color: ${(props) => props.theme.colors.redBlack};
  font-family: ${(props) =>
    props.selected ? props.theme.fonts.bold : props.theme.fonts.regular};
`;

export default SignupScreen;
