import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useDispatch } from 'react-redux';
import { addComment } from 'src/slices/commentSlice';

const BACKGROUND_IMAGE = { uri: 'https://i.ibb.co/yhqhcZ8/2-image-0.png' };

const ExhibitCommentsWrite: React.FC = () => {
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: undefined,
        iconColor: '#120000',
        rightButtonType: 'text',
        headerRightText: '완료하기',
        onHeaderRightPress: handleComplete,
        headerTransparent: true,
      }),
    );
  }, [navigation, comment]);

  const handleComplete = () => {
    if (comment) {
      dispatch(addComment(comment.trim()));
      navigation.goBack();
    } else {
      console.log('Empty comment, no action taken.');
    }
  };

  return (
    <Container>
      <BackgroundCover source={BACKGROUND_IMAGE} resizeMode='cover' />
      <Overlay />
      <Content>
        <CommentInputContainer>
          <CommentInput
            placeholder='댓글을 작성해주세요.'
            placeholderTextColor='#888'
            multiline
            value={comment}
            onChangeText={(text) => {
              console.log('Input value:', text);
              setComment(text);
            }}
            maxLength={150}
          />
        </CommentInputContainer>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const BackgroundCover = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(252, 252, 252, 0.6);
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  padding: 60px 40px;
  margin-top: 70px;
`;

const CommentInputContainer = styled.View`
  justify-content: center;
  width: 100%;
  height: 350px;
  max-width: 350px;
  background-color: #fff;
  padding: 28px 20px;
  elevation: 5;
`;

const CommentInput = styled.TextInput`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.redBlack};
  text-align: center;
  line-height: 30px;
`;

export default ExhibitCommentsWrite;
