import { useEffect } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setCollectingExperience, setIsArtist } from 'src/slices/userSlice';
import { Body2, Subtitle2, Caption } from '../../styles/typography';
import TitleSubtitle from '../../components/TitleSubtitle';
import { Btn, BtnText } from '../../components/Button';
import ToastMessage from '../../components/ToastMessage';
import { useToastMessage } from 'src/hooks/_index';
import { useNavigation } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { ProgressBar } from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { OIcon, XIcon } from 'src/assets/icons/_index';

const SignupScreen3: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { collectingExperience, isArtist } = useSelector(
    (state: RootState) => state.user,
  );
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        marginLeft: 0,
      }),
    );
  }, [navigation]);

  useEffect(() => {
    console.log('collectingExperience:', collectingExperience);
    console.log('isArtist:', isArtist);
  }, [collectingExperience, isArtist]);

  // 모든 필수 입력이 완료되었는지 확인하는 함수
  const isFormValid = () => {
    return collectingExperience !== null && isArtist !== null;
  };

  // onPress 핸들러 함수
  const handlePress = () => {
    if (!isFormValid()) {
      showToast('필수 정보를 입력하세요.');
    } else {
      navigation.navigate('Tabs');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProgressBar currentStep={3} totalSteps={3} />
        <TitleSubtitle
          titleLarge='CheriC에 처음 오셨군요!'
          subtitle={<Caption>해당하시는 내용을 눌러주세요</Caption>}
          style={{ marginBottom: 24 }}
        />
        {/* 아트 컬렉팅 경험 */}
        <InputLabel>
          아트 컬렉팅 경험이 있으신가요? <Red>*</Red>
        </InputLabel>
        <OptionSection>
          <OptionButton
            selected={collectingExperience === true}
            onPress={() => dispatch(setCollectingExperience(true))}
          >
            <OIcon
              fill={
                collectingExperience === true
                  ? theme.colors.cherryRed_10
                  : theme.colors.grey_6
              }
            />
            <OptionText selected={collectingExperience === true}>
              경험이 있어요!
            </OptionText>
          </OptionButton>
          <OptionButton
            selected={collectingExperience === false}
            onPress={() => dispatch(setCollectingExperience(false))}
          >
            <XIcon
              fill={
                collectingExperience === false
                  ? theme.colors.cherryRed_10
                  : theme.colors.grey_6
              }
            />
            <OptionText
              selected={collectingExperience === false}
              style={{ marginTop: 4 }}
            >
              아직 경험이 없어요!
            </OptionText>
          </OptionButton>
        </OptionSection>
        {/* 미술 작가 여부 */}
        <InputLabel>
          미술 작가이신가요? <Red>*</Red>
        </InputLabel>
        <OptionSection>
          <OptionButton
            selected={isArtist === true}
            onPress={() => dispatch(setIsArtist(true))}
          >
            <OIcon
              fill={
                isArtist === true
                  ? theme.colors.cherryRed_10
                  : theme.colors.grey_6
              }
            />
            <OptionText selected={isArtist === true}>네, 맞아요!</OptionText>
          </OptionButton>
          <OptionButton
            selected={isArtist === false}
            onPress={() => dispatch(setIsArtist(false))}
          >
            <XIcon
              fill={
                isArtist === false
                  ? theme.colors.cherryRed_10
                  : theme.colors.grey_6
              }
            />
            <OptionText selected={isArtist === false} style={{ marginTop: 4 }}>
              아니에요!
            </OptionText>
          </OptionButton>
        </OptionSection>
        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
      <Btn
        onPress={handlePress}
        style={{
          backgroundColor: isFormValid()
            ? theme.colors.redBlack
            : theme.colors.grey_6,
          marginHorizontal: 16,
          marginBottom: 60,
        }}
      >
        <BtnText>
          {isFormValid() ? '회원가입 완료하기' : '필수 정보를 선택하세요'}
        </BtnText>
      </Btn>
    </SafeAreaView>
  );
};

const InputLabel = styled(Subtitle2)`
  margin-left: ${({ theme }) => theme.spacing.s1};
  margin-bottom: ${({ theme }) => theme.spacing.s2};
  color: ${({ theme }) => theme.colors.redBlack};
`;

const OptionSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 180px;
  height: 180px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.l};
  border: ${({ selected, theme }) =>
    selected ? `1.4px dashed ${theme.colors.cherryRed_10}` : 'none'};
  background-color: ${({ theme }) => theme.colors.white};
  elevation: 5;
`;

const OptionText = styled(Body2)<{ selected: boolean }>`
  padding-top: ${({ theme }) => theme.spacing.s3};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.cherryRed_10 : theme.colors.grey_8};
`;

const Red = styled.Text`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

export default SignupScreen3;
