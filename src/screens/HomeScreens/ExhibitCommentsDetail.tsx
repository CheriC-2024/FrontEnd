import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import { addReply } from 'src/slices/commentSlice';
import { RootState } from 'src/store';
import {
  MenuIcon,
  SendIcon,
  ThumbsUpIconFilled,
} from 'src/assets/icons/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useNavigation } from '@react-navigation/native';
import { Caption } from 'src/styles/typography';

const ExhibitCommentsDetail = ({ route }) => {
  const { comment } = route.params;
  const [replyText, setReplyText] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const updatedComment = useSelector((state: RootState) =>
    state.comment.comments.find((c) => c.id === comment.id),
  );

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#120000',
        rightButtonType: 'text',
        headerRightText: '대댓글 쓰기',
        onHeaderRightPress: () => void '',
      }),
    );
  }, [navigation]);

  const handleAddReply = () => {
    if (replyText.trim()) {
      dispatch(
        addReply({
          commentId: comment.id,
          replyText: replyText.trim(),
        }),
      );
      setReplyText('');
    }
  };

  return (
    <Container>
      <CommentContainer>
        <ProfileImage source={{ uri: 'https://via.placeholder.com/50' }} />
        <CommentContent>
          <UserName>닉네임</UserName>
          <CommentText>{updatedComment?.text || comment.text}</CommentText>
          <CommentMeta>2024.05.14</CommentMeta>
        </CommentContent>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 20,
          }}
        >
          <LikeContainer>
            <ThumbsUpIconFilled />
            <LikeCount>2</LikeCount>
          </LikeContainer>
          <MenuIcon />
        </View>
      </CommentContainer>
      <RepliesList
        data={updatedComment?.replies || []}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ReplyContainer>
            <ProfileImage source={{ uri: 'https://via.placeholder.com/50' }} />
            <ReplyContent>
              <UserName>닉네임</UserName>
              <ReplyText>{item.text}</ReplyText>
              <ReplyMeta>2024.05.14</ReplyMeta>
            </ReplyContent>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 20,
              }}
            >
              <LikeContainer>
                <ThumbsUpIconFilled />
                <LikeCount>2</LikeCount>
              </LikeContainer>
              <MenuIcon />
            </View>
          </ReplyContainer>
        )}
      />

      {/* Input for adding a reply */}
      <ReplyInputContainer>
        <InputWrapper>
          <ReplyInput
            placeholder='답글을 작성하세요'
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <AddReplyButton onPress={handleAddReply}>
            <SendIcon />
          </AddReplyButton>
        </InputWrapper>
      </ReplyInputContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fcfcfc;
`;

const CommentContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grey_4};
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 8px;
`;

const CommentContent = styled.View`
  flex: 1;
`;

const UserName = styled(Caption)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

const CommentText = styled(Caption)`
  color: ${({ theme }) => theme.colors.redBlack};
  margin-top: 4px;
`;

const CommentMeta = styled(Caption)`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey_6};
  margin-top: 4px;
`;

const LikeContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const LikeCount = styled(Caption)`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey_6};
`;

const RepliesList = styled(FlatList)`
  flex: 1;
`;

const ReplyContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  margin-left: 20px;
`;

const ReplyContent = styled.View`
  flex: 1;
`;

const ReplyText = styled(CommentText)``;

const ReplyMeta = styled(CommentMeta)``;

const ReplyInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  background-color: #fcfcfc;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 12px 20px;
  background-color: #f7f5f5;
  border-radius: 20px;
`;

const ReplyInput = styled.TextInput`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.redBlack};
  line-height: 20px;
  padding: 0;
`;

const AddReplyButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export default ExhibitCommentsDetail;
