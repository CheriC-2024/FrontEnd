import React from 'react';
import { View } from 'react-native';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { HeartIcon, ViewsIcon } from 'src/assets/icons/_index';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export interface ExhibitCardProps {
  imageSource: string | null;
  colors?: string[]; // New optional colors prop for gradient
  title: string;
  collectorName: string;
  profileImage: string;
  likes: number;
  favorites: number;
  tags: string[];
  font: string;
}

const ExhibitListCard: React.FC<ExhibitCardProps> = ({
  imageSource,
  colors = ['#1F2C35', '#49A0BE', '#95BFC4', '#E2DFCA'], // Default gradient colors
  title,
  collectorName,
  profileImage,
  likes,
  favorites,
  tags,
  font,
}) => {
  const { fontData } = useSelector((state: RootState) => state.exhibit);
  console.log('ExhibitListCard', imageSource);

  // Redux에서 fontFamily 찾기
  const fontFamily =
    fontData.find((fontItem) => fontItem.value === font)?.fontFamily ||
    'PretendardRegular';
  const useGradientBackground = !imageSource || imageSource.trim() === ''; // Check for null or empty string
  const gradientColors =
    colors.length >= 2
      ? colors
      : [...colors, ...Array(2 - colors.length).fill(colors[0] || '#000')];
  return (
    <CardWrapper>
      <CardContainer>
        {useGradientBackground ? (
          <GradientBackground colors={gradientColors}>
            <OverlayContent>
              <TitleContainer>
                <Title style={{ fontFamily }} numberOfLines={2}>
                  {title}
                </Title>
              </TitleContainer>
              <TagsContainer>
                {tags.map((tag, idx) => (
                  <Tag key={idx}># {tag}</Tag>
                ))}
              </TagsContainer>
            </OverlayContent>
          </GradientBackground>
        ) : (
          <BackgroundContainer source={{ uri: imageSource }} resizeMode='cover'>
            <OverlayContent>
              <TitleContainer>
                <Title numberOfLines={2}>{title}</Title>
              </TitleContainer>
              <TagsContainer>
                {tags.map((tag, idx) => (
                  <Tag key={idx}># {tag}</Tag>
                ))}
              </TagsContainer>
            </OverlayContent>
          </BackgroundContainer>
        )}
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

const GradientBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;

const OverlayContent = styled.View`
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px;
`;

const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
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
