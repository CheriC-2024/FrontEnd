import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setInterests } from 'src/slices/userSlice';
import {
  TitleSubtitle,
  ToastMessage,
  ProgressBar,
} from 'src/components/_index';
import { useToastMessage } from 'src/hooks/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Container } from 'src/styles/layout';
import { H4, Caption } from '../../styles/typography';

const SignupScreen2: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const interests = useSelector((state: RootState) => state.user.interests);
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        headerRightDisabled: interests.length < 1,
        onHeaderRightPress: handleNext,
        marginLeft: 0,
        marginRight: 0,
      }),
    );
  }, [navigation, interests]);

  const handleNext = () => {
    navigation.navigate('Signup3');
  };

  const toggleInterest = (label: string) => {
    const interest = interestOptions.find((option) => option.label === label);

    if (!interest) return;

    const interestValue = interest.value;
    let updatedInterests;

    if (interests.includes(interestValue)) {
      updatedInterests = interests.filter((item) => item !== interestValue);
    } else if (interests.length < 2) {
      updatedInterests = [...interests, interestValue];
    } else {
      showToast('관심 분야는 최대 2개까지 선택 가능합니다.');
      return;
    }

    dispatch(setInterests(updatedInterests));
    console.log('Updated interests:', updatedInterests);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProgressBar currentStep={2} totalSteps={3} />
        <TitleSubtitle
          titleLarge='CheriC에 처음 오셨군요!'
          subtitle={<Caption>관심 분야를 설정해주세요 *최대 2개</Caption>}
          style={{ marginBottom: 24 }}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <InterestSection>
            {interestOptions
              .reduce((acc, interest, index) => {
                if (index % 2 === 0) {
                  // 새로운 행을 만듦
                  acc.push([interest]);
                } else {
                  // 기존 행에 아이템 추가
                  acc[acc.length - 1].push(interest);
                }
                return acc;
              }, [] as any[][])
              .map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {row.map((interest, interestIndex) => {
                    const overlayColor =
                      interestIndex < 4
                        ? theme.colors.redBlack_alpha40
                        : theme.colors.redBlack_alpha60;
                    return (
                      <InterestButton
                        key={interest.label}
                        selected={interests.includes(interest.value)}
                        onPress={() => toggleInterest(interest.label)}
                      >
                        <InterestButtonImage source={interest.image}>
                          <Overlay
                            overlayColor={overlayColor}
                            selected={interests.includes(interest.value)}
                          />
                          <InterestText>{interest.label}</InterestText>
                        </InterestButtonImage>
                      </InterestButton>
                    );
                  })}
                </Row>
              ))}
          </InterestSection>
        </ScrollView>
        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
    </SafeAreaView>
  );
};

// TODO: 관심 분야 픽스되고 서버 재배포시에 수정할 예정
const interestOptions = [
  {
    label: '뉴미디어',
    image: require('src/assets/images/SignUpPage/interest1.png'),
    value: 'MODIFY1',
  },
  {
    label: '동양화',
    image: require('src/assets/images/SignUpPage/interest2.png'),
    value: 'MODIFY2',
  },
  {
    label: '드로잉',
    image: require('src/assets/images/SignUpPage/interest3.png'),
    value: 'MODIFY3',
  },
  {
    label: '디자인',
    image: require('src/assets/images/SignUpPage/interest4.png'),
    value: 'MODIFY4',
  },
  {
    label: '수채화',
    image: require('src/assets/images/SignUpPage/interest5.png'),
    value: 'WATER_PAINTING',
  },
  {
    label: '유화',
    image: require('src/assets/images/SignUpPage/interest6.png'),
    value: 'OIL_PAINTING',
  },
  {
    label: '판화',
    image: require('src/assets/images/SignUpPage/interest7.png'),
    value: 'MODIFY5',
  },
  {
    label: '회화',
    image: require('src/assets/images/SignUpPage/interest8.png'),
    value: 'MODIFY6',
  },
];

const InterestSection = styled.View`
  margin-top: ${({ theme }) => theme.spacing.s2};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
`;

const InterestButton = styled.TouchableOpacity<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  border-radius: 100px;
  overflow: hidden;
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
  background-color: ${({ overlayColor, selected, theme }) =>
    selected ? theme.colors.cherryRed_alpha80 : overlayColor};
  z-index: 1;
`;

const InterestText = styled(H4)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  z-index: 2;
`;

export default SignupScreen2;
