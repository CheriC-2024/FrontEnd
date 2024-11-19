import React from 'react';
import { Caption, H5 } from 'src/styles/typography';
import styled from 'styled-components/native';
import FollowButton from '../profile/FollowButton';
import { ForwardIcon } from 'src/assets/icons/_index';

interface ExhibitEndCardProps {
  artistId: number;
  artistName: string;
  artistImage: string;
  infoText: string;
  category: string[];
  comment: string;
}
// TODO: props로 artistId만 받도록
const ExhibitEndCard: React.FC<ExhibitEndCardProps> = ({
  artistId,
  artistName,
  artistImage,
  infoText,
  category,
  comment,
}) => {
  return (
    <CardContainer>
      <Header>
        <ArtistImage source={{ uri: artistImage }} />
        <ArtistInfo>
          <ArtistButton>
            {/**profile로 이동 */}
            <ArtistName>{artistName}</ArtistName>
            <ForwardIcon />
          </ArtistButton>
          <Categories>
            <Caption style={{ color: '#413333', marginRight: 4 }}>
              선호 분야
            </Caption>
            {category.map((cat, index) => (
              <Category key={index}>{cat}</Category>
            ))}
          </Categories>
        </ArtistInfo>
        <FollowButton userId={artistId} />
      </Header>
      <InfoText>{infoText}</InfoText>
      <CommentContainer>
        <Comment>{`"${comment}"`}</Comment>
        <CommentAuthor>- {artistName} -</CommentAuthor>
      </CommentContainer>
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
`;

const Category = styled(Caption)`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.grey_8};
  padding: 4px 8px;
  border-radius: 16px;
  margin-right: 4px;
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

export default ExhibitEndCard;
