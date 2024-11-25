import React from 'react';
import styled from 'styled-components/native';
import { ButtonText } from 'src/styles/typography';
import {
  useFollowUser,
  useUnfollowUser,
} from 'src/api/hooks/useFollowMutation';

interface FollowButtonProps {
  userId: number;
  isFollowing: boolean;
  onFollowChange: (isFollowing: boolean) => void; // 상태 변경 콜백
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowing,
  onFollowChange,
}) => {
  // React Query 훅
  const { mutate: follow } = useFollowUser();
  const { mutate: unfollow } = useUnfollowUser();

  const handleFollowPress = () => {
    if (isFollowing) {
      unfollow(userId, {
        onSuccess: () => onFollowChange(false), // 언팔로우 성공 시 상태 변경
      });
    } else {
      follow(userId, {
        onSuccess: () => onFollowChange(true), // 팔로우 성공 시 상태 변경
      });
    }
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
