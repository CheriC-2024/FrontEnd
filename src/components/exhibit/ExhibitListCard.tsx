import React from 'react';
import { View } from 'react-native';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { HeartIcon, ViewsIcon } from 'src/assets/icons/_index';
import styled from 'styled-components/native';

export interface ExhibitCardProps {
  imageSource: string;
  title: string;
  collectorName: string;
  profileImage: string;
  likes: number;
  favorites: number;
  tags: string[];
}

const ExhibitListCard: React.FC<ExhibitCardProps> = ({
  imageSource,
  title,
  collectorName,
  profileImage,
  likes,
  favorites,
  tags,
}) => {
  return (
    <CardWrapper>
      <CardContainer>
        <BackgroundContainer source={{ uri: imageSource }} resizeMode='cover'>
          <View
            style={{
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              paddingVertical: 20,
              paddingHorizontal: 24,
            }}
          >
            <TitleContainer>
              <Title numberOfLines={2}>{title}</Title>
            </TitleContainer>
            <TagsContainer>
              {tags.map((tag, idx) => (
                <Tag key={idx}># {tag}</Tag>
              ))}
            </TagsContainer>
          </View>
        </BackgroundContainer>
      </CardContainer>
      <InfoContainer>
        <ProfileSection>
          <ProfileImage source={{ uri: profileImage }} />
          <CollectorName>{collectorName}</CollectorName>
        </ProfileSection>
        <StatsContainer>
          <ViewsIcon />
          <StatText>{likes}</StatText>
          <View style={{ width: 4 }} />
          <HeartIcon fill={'#413333'} stroke={''} width={16} height={16} />
          <StatText>{favorites}</StatText>
        </StatsContainer>
      </InfoContainer>
    </CardWrapper>
  );
};

export default ExhibitListCard;

const CardWrapper = styled.View`
  width: 100%;
  margin-bottom: 12px;
`;

const CardContainer = styled.View`
  width: 100%;
  height: 170px;
  border-radius: 20px;
  overflow: hidden;
  elevation: 3;
`;

const BackgroundContainer = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled(H4)`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tag = styled(Caption)`
  background-color: rgba(255, 255, 255, 0.7);
  color: ${({ theme }) => theme.colors.redBlack};
  padding: 4px 8px;
  margin: 2px;
  border-radius: 12px;
  font-size: 10px;
`;

const InfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #fff;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

const CollectorName = styled(ButtonText)`
  font-size: 12px;
  color: #413333;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatText = styled(Caption)`
  margin-left: 4px;
  font-size: 12px;
`;
