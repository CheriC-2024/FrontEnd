import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ArtistImage } from 'src/components/_index';
import { artistAndArtworkData } from '../data';
import ArtworkGrid from 'src/components/ArtworkGrid';
import { Container } from 'src/styles/layout';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import {
  Body2,
  ButtonText,
  Caption,
  H4,
  Subtitle1,
  Subtitle2,
} from 'src/styles/typography';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const tabs = ['미술 작품', '작가 이력', '컬렉션 전시', '소장 작품'];

const ArtistProfile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artistId } = route.params;
  const artistData = artistAndArtworkData.find(
    (artist) => artist.artist.id === artistId,
  );

  const [activeTab, setActiveTab] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;

  // 팔로우 상태 관리
  const [isFollowing, setIsFollowing] = useState(false);

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#fff',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      // requestSuccess가 true이면 알림을 띄움
      if (route.params?.requestSuccess) {
        Alert.alert('성공', '작가님께 작품 요청이 성공적으로 전달되었습니다!');
        // 알림 후 params 초기화 (다시 들어왔을 때 알림 뜨지 않도록)
        route.params.requestSuccess = false;
      }
    }, [route.params]),
  );

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Animated.timing(animationValue, {
      toValue: index * (100 / tabs.length), // 각 탭의 위치로 애니메이션 이동
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false,
    }).start();
  };

  if (!artistData) {
    return (
      <Container>
        <ErrorMessage>해당 아티스트의 정보를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const handleSelectArtwork = (artwork: any) => {
    // 선택한 작품의 ID를 ArtworkInfo로 전달하며 이동
    navigation.navigate('ArtworkInfo', { artworkId: artwork.id });
  };

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing); // 팔로우 상태 토글
  };

  const navigateToRequestArtwork = () => {
    navigation.navigate('RequestArtwork', { artistId: artistId }); // RequestArtwork 화면으로 이동
  };

  // 작가 이력 탭 렌더링
  const renderArtistHistory = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <SocialMediaContainer>
          <SocialMediaButton>
            <Image source={require('src/assets/instagram-logo.png')} />
          </SocialMediaButton>

          <SocialMediaButton>
            <Image source={require('src/assets/blog-logo.png')} />
          </SocialMediaButton>

          <SocialMediaButton onPress={navigateToRequestArtwork}>
            <Image
              source={require('src/assets/dm-logo.png')} // 이메일 아이콘 이미지 경로
            />
          </SocialMediaButton>
        </SocialMediaContainer>
        <HistoryContainer showsVerticalScrollIndicator={false}>
          <Section>
            <SectionTitle>학력</SectionTitle>
            {artistHistory.education.map((item, index) => (
              <HistoryText key={index}>- {item}</HistoryText>
            ))}
          </Section>

          <Section>
            <SectionTitle>개인전</SectionTitle>
            {artistHistory.soloExhibitions.map((item, index) => (
              <HistoryText key={index}>
                {item.year} 《{item.title}》, {item.location}
              </HistoryText>
            ))}
          </Section>

          <Section>
            <SectionTitle>단체전</SectionTitle>
            {artistHistory.groupExhibitions.map((item, index) => (
              <HistoryText key={index}>
                {item.year} 《{item.title}》, {item.location}
              </HistoryText>
            ))}
          </Section>

          <Section>
            <SectionTitle>작가의 작품 소장처</SectionTitle>
            {artistHistory.collections.map((item, index) => (
              <HistoryText key={index}>- {item}</HistoryText>
            ))}
          </Section>

          <Section>
            <SectionTitle>수상 및 선정</SectionTitle>
            {artistHistory.awards.map((item, index) => (
              <HistoryText key={index}>
                {item.year} {item.title}
              </HistoryText>
            ))}
          </Section>

          <Section>
            <SectionTitle>레지던시</SectionTitle>
            {artistHistory.residency.map((item, index) => (
              <HistoryText key={index}>
                {item.year} {item.title}
              </HistoryText>
            ))}
          </Section>
        </HistoryContainer>
      </ScrollView>
    );
  };

  return (
    <>
      <BackgroundImage source={{ uri: 'https://i.ibb.co/1vmZ82r/3.png' }} />
      <HeaderOverlay />
      <Container>
        <ProfileImageContainer>
          <ArtistImage image={artistData.artist.image} size={88} />
        </ProfileImageContainer>
        <ProfileWrapper>
          <ArtistName>{artistData.artist.name}</ArtistName>
          <ArtistInfo>{artistData.artist.category}</ArtistInfo>
          <ArtistBio>{artistData.artist.bio}</ArtistBio>
        </ProfileWrapper>
        <FollowSection>
          <View style={{ flexDirection: 'row' }}>
            <FollowCountItem>
              <FollowLabel>팔로워</FollowLabel>
              <FollowNumber>{artistData.artist.followers}</FollowNumber>
            </FollowCountItem>
            <FollowCountItem>
              <FollowLabel>팔로잉</FollowLabel>
              <FollowNumber>{artistData.artist.followers}</FollowNumber>
            </FollowCountItem>
          </View>
          <FollowButton isFollowing={isFollowing} onPress={handleFollowPress}>
            <FollowButtonText isFollowing={isFollowing}>
              {isFollowing ? '팔로우중' : '팔로우하기'}
            </FollowButtonText>
          </FollowButton>
        </FollowSection>

        {/* 탭 버튼 및 애니메이션 */}
        <TabWrapper>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onPress={() => handleTabPress(index)}
            >
              <TabButtonText active={activeTab === index}>{tab}</TabButtonText>
            </TabButton>
          ))}
          <AnimatedUnderline
            style={{
              width: `${100 / tabs.length}%`,
              left: animationValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </TabWrapper>

        {/* 탭에 따른 콘텐츠 렌더링 */}
        {activeTab === 0 && (
          <ArtworkGrid
            artworks={artistData.artworks}
            selectedArtworks={[]}
            onSelect={handleSelectArtwork}
          />
        )}
        {activeTab === 1 && renderArtistHistory()}
        {/* 추가 탭 콘텐츠는 여기서 구현 */}
      </Container>
    </>
  );
};

// 작가 이력 로컬 데이터
const artistHistory = {
  education: [
    '서울여자대학교, 산업디자인전공 학사',
    '서울여자대학교 대학원, 산업디자인전공 석사',
  ],
  soloExhibitions: [
    { year: '2024', title: 'Art OOOO 2024', location: 'OOOO, 서울' },
    { year: '2022', title: '다시보는 World, 2022', location: 'OOOO, 서울' },
  ],
  groupExhibitions: [
    { year: '2024', title: 'Art OOOO 2024', location: 'OOOO, 서울' },
    { year: '2023', title: 'OOOO 2023', location: 'OOOO, 서울' },
    { year: '2023', title: 'OOOO OOOO 2023', location: 'OO, 광주' },
  ],
  collections: [
    '서울여자대학교 미술관',
    'OOOO OOO 미술관',
    'OOOOOOO아트 전시관',
  ],
  awards: [
    { year: '2024', title: '제24회 OOOO OO전 입선' },
    { year: '2021', title: '제12회 OOOO전 대상' },
    { year: '2020', title: '제20회 공모전 수상' },
  ],
  residency: [{ year: '2024', title: '인천아트플랫폼 레지던시' }],
};

const BackgroundImage = styled.Image`
  position: relative;
  width: 100%;
  height: 170px;
  object-fit: cover;
`;

const HeaderOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(18, 0, 0, 0.3)', 'rgba(18, 0, 0, 0)'],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
})`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
`;

const ProfileImageContainer = styled.View`
  position: absolute;
  top: -50px;
  left: 16px;
  z-index: 10;
`;

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.redBlack};
`;

const ProfileWrapper = styled.View`
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.margin.xl};
`;

const ArtistName = styled(H4)`
  margin-top: ${({ theme }) => theme.spacing.s3};
`;

const ArtistInfo = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

const ArtistBio = styled(Caption)`
  margin-top: ${({ theme }) => theme.margin.xs};
  color: #7d7979;
`;

const FollowSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

const FollowCountItem = styled.View`
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

const FollowLabel = styled(Caption)`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.grey_6};
`;

const FollowNumber = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.grey_6};
`;

const FollowButton = styled.TouchableOpacity<{ isFollowing: boolean }>`
  width: 104px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.colors.cherryRed_10 : 'transparent'};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.l};
  border: 1.5px solid ${({ theme }) => theme.colors.cherryRed_10};
`;

const FollowButtonText = styled(ButtonText)<{ isFollowing: boolean }>`
  color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.colors.white : theme.colors.cherryRed_10};
`;

const TabWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${({ theme }) => theme.margin.m};
`;

const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.padding.s};
`;

const TabButtonText = styled(Subtitle2)<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#120000' : '#B0ABAB')};
`;

const SocialMediaButton = styled(TouchableOpacity)`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin: 0 9px;
  elevation: 3;
`;

const SocialMediaContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const HistoryContainer = styled.View`
  padding: 16px;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled(Subtitle2)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.grey_10};
  align-self: flex-start;
  border-bottom-width: 2px;
  border-bottom-color: black;
  padding-bottom: 4px;
`;

const HistoryText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_10};
  margin-bottom: 4px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

export default ArtistProfile;
