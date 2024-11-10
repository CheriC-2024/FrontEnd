import React from 'react';
import styled from 'styled-components/native';
import { ButtonText } from 'src/styles/typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { toggleFollow } from 'src/slices/followSlice';

interface FollowButtonProps {
  userId: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const isFollowing = useSelector(
    (state: RootState) => state.follow.isFollowing[userId] || false,
  );

  const handleFollowPress = () => {
    dispatch(toggleFollow(userId));
  };

  return (
    <StyledButton isFollowing={isFollowing} onPress={handleFollowPress}>
      <FollowButtonText isFollowing={isFollowing}>
        {isFollowing ? '팔로우중' : '팔로우하기'}
      </FollowButtonText>
    </StyledButton>
  );
};

export default FollowButton;

const StyledButton = styled.TouchableOpacity<{ isFollowing: boolean }>`
  width: 104px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.colors.cherryRed_10 : 'transparent'};
  padding: 8px;
  border-radius: ${({ theme }) => theme.radius.l};
  border: 1.5px solid ${({ theme }) => theme.colors.cherryRed_10};
`;

const FollowButtonText = styled(ButtonText)<{ isFollowing: boolean }>`
  color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.colors.white : theme.colors.cherryRed_10};
`;
