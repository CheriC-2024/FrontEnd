import { useEffect, useState } from 'react';
import { TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname, setBio } from 'src/slices/userSlice';
import {
  InfoBlock,
  ProgressBar,
  TitleSubtitle,
  ToastMessage,
} from 'src/components/_index';
import { useToastMessage } from 'src/hooks/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Container } from 'src/styles/layout';
import { Subtitle2, Body2, Caption } from '../../styles/typography';
import { checkNicknameAvailability } from 'src/api/googleLoginApi';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { nickname, bio } = useSelector((state: RootState) => state.user);
  const [nicknameConfirmed, setNicknameConfirmed] = useState<boolean>(false); // 닉네임 확인 상태
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        headerRightDisabled: !nicknameConfirmed, // nickname이 확인되어야 버튼이 활성화됨
        onHeaderRightPress: handleNext,
        marginLeft: 0,
        marginRight: 0,
      }),
    );
  }, [navigation, nicknameConfirmed]);

  useEffect(() => {
    console.log('Redux에 저장된 닉네임, 자기소개:', nickname, bio);
  }, [nickname, bio]);

  // TODO: 닉네임 중복 확인 API
  const handleNicknameConfirm = async () => {
    if (nickname === '') {
      showToast('닉네임을 입력해주세요.');
    } else {
      try {
        const isAvailable = await checkNicknameAvailability(nickname);
        if (isAvailable) {
          dispatch(setNickname(nickname)); // Save nickname in Redux
          setNicknameConfirmed(true);
          showToast('닉네임이 확인되었습니다.');
        } else {
          showToast('이미 사용 중인 닉네임입니다.');
        }
      } catch (error) {
        showToast('닉네임 확인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleNext = () => {
    navigation.navigate('Signup2');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProgressBar currentStep={1} totalSteps={3} />
        <TitleSubtitle
          titleLarge='CheriC에 처음 오셨군요!'
          subtitle={
            <Caption>컬렉터님을 알아갈 수 있게 정보를 입력해주세요</Caption>
          }
        />

        <InputLabel>
          닉네임 <Red>*</Red>
        </InputLabel>
        <NicknameContainer>
          <InputField
            placeholder='컬렉터님의 닉네임을 작성해 주세요'
            value={nickname}
            onChangeText={(text) => dispatch(setNickname(text))}
            editable={!nicknameConfirmed} // 닉네임 확인 후 수정 불가
          />
          <ConfirmButton onPress={handleNicknameConfirm}>
            <ConfirmButtonText>확인</ConfirmButtonText>
          </ConfirmButton>
        </NicknameContainer>
        <InfoBlock
          label='자기소개'
          placeholder='컬렉터님의 자기 소개를 작성해 주세요'
          maxLength={100}
          value={bio}
          onChangeText={(text) => dispatch(setBio(text))}
        />
        <ToastMessage message={toastMessage} visible={toastVisible} />
      </Container>
    </SafeAreaView>
  );
};

const ConfirmButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.margin.xs};
  padding: 8px 24px;
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.grey_8};
`;

const ConfirmButtonText = styled(Body2)`
  color: ${({ theme }) => theme.colors.white};
`;

const NicknameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s7};
`;

const InputLabel = styled(Subtitle2)`
  margin-top: ${({ theme }) => theme.spacing.s7};
  margin-left: ${({ theme }) => theme.spacing.s1};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const InputField = styled(TextInput)`
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing.s2};
  padding-left: ${({ theme }) => theme.spacing.s4};
  padding-bottom: ${({ theme }) => theme.spacing.s2};
  border-radius: ${({ theme }) => theme.radius.m};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.body2};
  background-color: ${({ theme }) => theme.colors.grey_4};
`;

const Red = styled.Text`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

export default SignupScreen;
