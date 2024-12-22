import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { HeartIcon, ViewsIcon } from 'src/assets/icons/_index';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Exhibition } from 'src/interfaces/collection';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { LinearGradient } from 'expo-linear-gradient';
import { getGradientConfig } from 'src/utils/gradientBgUtils';
import { getFontFamilyByValue } from 'src/utils/fontUtils';

interface ExhibitCardProps extends Exhibition {
  isCurrent: boolean; // To highlight the currently focused card
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({
  exhibitionId,
  name,
  coverImgUrl,
  themes,
  heartCount,
  hits,
  font,
  colors,
  exhibitionBackgroundType,
  userRes,
  isCurrent,
  createAt,
}) => {
  const navigation = useNavigation();
  const { profileImgUrl } = userRes;

  // Find the matching fontFamily for the provided font identifier
  const fontFamily = getFontFamilyByValue(font);

  const useGradientBackground = !coverImgUrl || coverImgUrl.trim() === '';
  const gradientColors = colors.length >= 2 ? colors : [...colors, colors[0]];
  const gradientConfig = getGradientConfig(exhibitionBackgroundType);

  // 텍스트 애니메이션 스타일
  const textStyle = useAnimatedStyle(() => {
    const opacity = withTiming(isCurrent ? 1 : 0, { duration: 400 });
    return { opacity };
  });

  console.log('ExhibitCard의 폰트 param', font);
  console.log('ExhibitCard의 폰트 변환환', fontFamily);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // 전시 아이디를 params로 넘겨서 ExhibitEntrance 화면으로 이동
        navigation.navigate('HomeStack', {
          screen: 'ExhibitEntrance',
          params: {
            exhibitId: exhibitionId,
            exhibitColors: gradientColors,
            exhibitThemes: themes,
            bgType: exhibitionBackgroundType,
            heartCount: heartCount,
            name: name,
            coverImgUrl: coverImgUrl,
            createAt: createAt ? createAt.slice(0, 10) : '2024.11.28',
            font: fontFamily,
          },
        });
      }}
    >
      <CardWrapper>
        <CardContainer>
          {useGradientBackground ? (
            <GradientBackground
              colors={gradientColors}
              start={gradientConfig.start}
              end={gradientConfig.end}
            >
              <Animated.View style={textStyle}>
                <TitleContainer>
                  <Title style={{ fontFamily }}>{name}</Title>
                </TitleContainer>
                <TagsContainer>
                  {themes.map((theme, idx) => (
                    <Tag key={idx}># {theme}</Tag>
                  ))}
                </TagsContainer>
              </Animated.View>
            </GradientBackground>
          ) : (
            <BackgroundContainer source={{ uri: coverImgUrl }}>
              <Animated.View style={textStyle}>
                <TitleContainer>
                  <Title style={{ fontFamily }}>{name}</Title>
                </TitleContainer>
                <TagsContainer>
                  {themes.map((theme, idx) => (
                    <Tag key={idx}># {theme}</Tag>
                  ))}
                </TagsContainer>
              </Animated.View>
            </BackgroundContainer>
          )}
        </CardContainer>
        <Animated.View style={textStyle}>
          <InfoContainer>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ProfileImage source={{ uri: userRes.profileImgUrl }} />
              <CollectorName>{userRes.name}</CollectorName>
            </View>
            <StatsContainer>
              <ViewsIcon />
              <StatText>{hits}</StatText>
              <View style={{ width: 4 }} />
              <HeartIcon fill={'#413333'} stroke={''} width={16} height={16} />
              <StatText>{heartCount}</StatText>
            </StatsContainer>
          </InfoContainer>
        </Animated.View>
      </CardWrapper>
    </TouchableWithoutFeedback>
  );
};

export default ExhibitCard;

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

const GradientBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 80px 16px 32px 16px;
`;

const Title = styled.Text`
  height: 96px;
  font-size: 24px;
  color: #fff;
  text-align: center;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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

const CollectorName = styled(ButtonText)`
  color: #120000;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatText = styled(Caption)`
  margin-left: 4px;
`;
