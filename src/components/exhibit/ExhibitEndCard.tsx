import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Caption, H5, Body1, ButtonText } from 'src/styles/typography';
import FollowButton from '../profile/FollowButton';
import { ForwardIcon } from 'src/assets/icons/_index';

interface ExhibitEndCardProps {
  artistId?: number;
  artistName: string;
  artistImage: string;
  infoText: string;
  category: string[];
  comment?: string;
  exhibitionStats: {
    artworks: string; // Example: "유화 8작, 회화 3작"
    exhibitions: number; // Total exhibitions by the collector
    currentExhibition: number; // Current exhibition number
  };
}

const ExhibitEndCard: React.FC<ExhibitEndCardProps> = ({
  artistId,
  artistName,
  artistImage,
  infoText,
  category,
  comment = '',
  exhibitionStats,
}) => {
  // Local state to track if the user is followed
  const [isFollowing, setIsFollowing] = useState(false);

  // Toggle follow state on button press
  const handleFollowPress = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <CardContainer>
      <Header>
        <ArtistImage source={{ uri: artistImage }} />
        <ArtistInfo>
          <ArtistButton>
            <ArtistName>{artistName}</ArtistName>
            <ForwardIcon />
          </ArtistButton>
          <Categories>
            <Caption>선호 분야</Caption>
            <Category>유화</Category>
            <Category>수채화</Category>
            {/* {category.map((cat, index) => (
              <Category key={index}>{cat}</Category>
            ))} */}
          </Categories>
        </ArtistInfo>
        {/* <FollowButton userId={artistId} /> */}
        <StyledButton isFollowing={isFollowing} onPress={handleFollowPress}>
          <FollowButtonText isFollowing={isFollowing}>
            {isFollowing ? '팔로우중' : '팔로우하기'}
          </FollowButtonText>
        </StyledButton>
      </Header>
      <InfoText>
        컬렉터 {artistName}님께서 {exhibitionStats.artworks}을 보유중이며
        지금까지 체리시에 총 {exhibitionStats.exhibitions}개의 컬렉션 전시를
        선보였습니다. 컬렉터 {artistName}님의 이번 전시는 {artistName}{' '}
        컬렉터님의 {exhibitionStats.currentExhibition}번째 컬렉션 전시입니다.
      </InfoText>
      {comment && (
        <CommentContainer>
          <Comment>{`“${comment}”`}</Comment>
          <CommentAuthor>- 해랑 -</CommentAuthor>
        </CommentContainer>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.View`
  background-color: #fcebeb;
  border-radius: 20px;
  padding-top: 26px;
  margin: 0 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 23px;
  margin-bottom: 8px;
`;

const ArtistButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ArtistImage = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 30px;
  margin-right: 4px;
`;

const ArtistInfo = styled.View`
  flex: 1;
`;

const ArtistName = styled(H5)``;

const Categories = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Category = styled(Caption)`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.grey_8};
  padding: 4px 8px;
  border-radius: 16px;
`;

const InfoText = styled(Caption)`
  padding: 0 24px;
  color: ${({ theme }) => theme.colors.grey_8};
  line-height: 18px;
`;

const CommentContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.cherryRed_6};
  margin-top: 20px;
  margin-bottom: 24px;
  padding: 12px 36px 0 36px;
  align-items: center;
`;

const Comment = styled(Caption)`
  text-align: center;
  margin-bottom: 4px;
  color: #fff;
`;

const CommentAuthor = styled(Caption)`
  margin-bottom: 10px;
  font-size: 10px;
  color: #fcf9f9;
`;

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

export default ExhibitEndCard;
