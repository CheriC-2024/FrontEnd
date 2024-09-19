import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import InfoBlock from 'src/components/InfoBlock';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Container } from 'src/styles/layout';
import { Subtitle1, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const RequestArtwork: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [artworkName, setArtworkName] = useState('');
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const { artistId } = route.params;

  // 버튼 활성화 상태를 확인하는 변수
  const isButtonEnabled = artworkName.trim() !== '' && message.trim() !== '';

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: `작품 등록 요청하기`,
      }),
    );
  }, [navigation]);

  const handleSubmit = () => {
    // navigate로 ArtistProfile로 돌아가면서 artistId와 요청 성공 알림을 전달
    navigation.navigate('ArtistProfile', {
      artistId: artistId, // 다시 artistId 전달
      requestSuccess: true, // 요청 성공 여부 전달
    });
  };

  return (
    <Container>
      <TitleSubtitle
        titleLarge={'작가님께 작품 등록 요청하기'}
        subtitle={'아직 작가님의 작품이 체리시에 없다면 요청을 드려봐요!'}
        style={{ marginTop: 20 }}
      />
      <Content>
        <InfoBlock
          label={'요청드릴 작품의 이름'}
          placeholder={'요청드리고 싶은 작품의 이름을 입력해주세요'}
          maxLength={50}
          value={artworkName}
          onChangeText={setArtworkName}
          required
          style={{ marginBottom: 24 }}
        />
        <InfoBlock
          label={'작가님께 전달하고 싶은 말'}
          placeholder={'작가님께 전하고 싶은 말을 입력해주세요'}
          maxLength={300}
          value={message}
          onChangeText={setMessage}
          required
          style={{ marginBottom: 24 }}
        />
        <SectionTitle>해당 작품이 업로드된 사이트</SectionTitle>
        <InputWrapper>
          <StyledTextInput
            placeholder='요청드리고 싶은 작품이 업로드된 사이트의 URL을 입력해주세요'
            value={url}
            onChangeText={setUrl}
            multiline
          />
        </InputWrapper>
        <SubmitButton isEnabled={isButtonEnabled} onPress={handleSubmit}>
          <ButtonText>작가님께 작품 요청 보내기</ButtonText>
        </SubmitButton>
      </Content>
    </Container>
  );
};

export default RequestArtwork;

const Content = styled(ScrollView)`
  margin-top: 32px;
`;

const SectionTitle = styled(Subtitle2)`
  margin-bottom: ${({ theme }) => theme.margin.xs};
`;

const InputWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.m};
  padding: 0 16px;
  margin-bottom: 20px;
`;

const StyledTextInput = styled.TextInput`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey_6};
  height: 80px;
`;

const SubmitButton = styled.TouchableOpacity<{ isEnabled: boolean }>`
  background-color: ${({ isEnabled, theme }) =>
    isEnabled ? theme.colors.redBlack : theme.colors.grey_6};
  border-radius: ${({ theme }) => theme.radius.l};
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ButtonText = styled(Subtitle1)`
  color: white;
`;
