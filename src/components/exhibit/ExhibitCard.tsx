import React from 'react';
import { View } from 'react-native';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { HeartIcon, ViewsIcon } from 'src/assets/icons/_index';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface ExhibitCardProps {
  imageSource: string;
  title: string;
  collectorName: string;
  profileImage: string;
  likes: number;
  favorites: number;
  tags: string[];
  index: number;
  isCurrent: boolean; // 현재 카드 여부
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({
  imageSource,
  title,
  collectorName,
  profileImage,
  likes,
  favorites,
  tags,
  isCurrent,
}) => {
  // 텍스트 애니메이션 스타일
  const textStyle = useAnimatedStyle(() => {
    const opacity = withTiming(isCurrent ? 1 : 0, { duration: 400 });
    return { opacity };
  });

  return (
    <CardWrapper>
      <CardContainer>
        <BackgroundContainer source={{ uri: imageSource }}>
          <Animated.View style={textStyle}>
            <TitleContainer>
              <Title>{title}</Title>
            </TitleContainer>
            <TagsContainer>
              {tags.map((tag, idx) => (
                <Tag key={idx}># {tag}</Tag>
              ))}
            </TagsContainer>
          </Animated.View>
        </BackgroundContainer>
      </CardContainer>
      <Animated.View style={textStyle}>
        <InfoContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ProfileImage source={{ uri: profileImage }} />
            <CollectorName>{collectorName}</CollectorName>
          </View>
          <StatsContainer>
            <ViewsIcon />
            <StatText>{likes}</StatText>
            <View style={{ width: 4 }} />
            <HeartIcon fill={'#413333'} stroke={''} width={16} height={16} />
            <StatText>{favorites}</StatText>
          </StatsContainer>
        </InfoContainer>
      </Animated.View>
    </CardWrapper>
  );
};

export default ExhibitCard;

// 스타일 정의
const CardWrapper = styled.View`
  width: 240px;
`;

const CardContainer = styled.View`
  width: 100%;
  height: 270px;
  justify-content: space-between;
  border-top-left-radius: 160px;
  border-top-right-radius: 160px;
  border-bottom-left-radius: ${({ theme }) => theme.radius.m};
  border-bottom-right-radius: ${({ theme }) => theme.radius.m};
  background-color: #f5f5f5;
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
  padding: 80px 16px 32px 16px;
`;

const Title = styled(H4)`
  height: 96px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 12px;
`;

const Tag = styled(Caption)`
  background-color: rgba(255, 255, 255, 0.7);
  color: ${({ theme }) => theme.colors.redBlack};
  padding: 2px 8px;
  margin: 2px;
  border-radius: 12px;
  font-size: 10px;
`;

const InfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  padding-right: 4px;
`;

const ProfileImage = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 4px;
`;

const CollectorName = styled(ButtonText)``;

const StatsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatText = styled(Caption)`
  margin-left: 4px;
`;
