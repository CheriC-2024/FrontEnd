import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TextInput, View } from 'react-native';
import { H1, Subtitle2, Body1 } from '../components/Typography';
import InfoBlock from '../components/InfoBlock';
import { Button, ButtonText } from '../components/Button';
import ToastMessage from '../components/ToastMessage';
import { useToastMessage } from '../hooks/useToastMessage';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.s6};
`;

const Title = styled(H1)`
  color: ${(props) => props.theme.colors.redBlack};
  margin-bottom: ${(props) => props.theme.spacing.s2};
`;

const SubtitleText = styled(Subtitle2)`
  color: ${(props) => props.theme.colors.grey_8};
  margin-bottom: ${(props) => props.theme.spacing.s4};
`;

const InputLabel = styled(Subtitle2)`
  color: ${(props) => props.theme.colors.redBlack};
  margin-bottom: ${(props) => props.theme.spacing.s2};
`;

const InputField = styled(TextInput)`
  border: 1px solid ${(props) => props.theme.colors.grey_6};
  border-radius: ${(props) => props.theme.radius.s};
  padding: ${(props) => props.theme.spacing.s2};
  margin-bottom: ${(props) => props.theme.spacing.s4};
  font-family: ${(props) => props.theme.fonts.regular};
`;

const InterestSection = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.s6};
`;

const InterestButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 80px;
  height: 80px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.cherryRed_10 : '#CCCCCC'};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.theme.spacing.s1};
`;

const InterestText = styled(Body1)<{ selected: boolean }>`
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.redBlack};
  font-family: ${(props) =>
    props.selected ? props.theme.fonts.bold : props.theme.fonts.regular};
  text-align: center;
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

const SignupScreen: React.FC = () => {
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
    '뉴미디어',
    '동화책',
    '드로잉',
    '디자인',
    '수채화',
    '유화',
    '판화',
    '회화',
  ];

  return (
    <ScrollView>
      <Container>
        <Title>CheriC에 처음 오셨군요!</Title>
        <SubtitleText>
          컬렉터님을 알아갈 수 있게 정보를 입력해주세요
        </SubtitleText>

        <InputLabel>닉네임 *</InputLabel>
        <InputField placeholder="컬렉터님의 닉네임을 작성해 주세요" />

        <InfoBlock
          label="전시 설명"
          placeholder="컬렉터님의 자기 소개를 작성해 주세요"
          maxLength={100}
        />

        <InputLabel>관심 분야(최대 2개) *</InputLabel>
        <InterestSection>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {interestOptions.map((interest) => (
              <InterestButton
                key={interest}
                selected={interests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              >
                <InterestText selected={interests.includes(interest)}>
                  {interest}
                </InterestText>
              </InterestButton>
            ))}
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

        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
    </ScrollView>
  );
};

export default SignupScreen;
