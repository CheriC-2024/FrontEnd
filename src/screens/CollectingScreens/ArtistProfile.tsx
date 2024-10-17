import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { BackIcon, MenuIcon } from 'src/assets/icons/_index';
import { useArtistData } from 'src/api/hooks/useArtistQueries';

const tabs = ['미술 작품', '작가 이력', '컬렉션 전시', '소장 작품'];

const ArtistProfile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data, isLoading, isError } = useArtistData(1);

  const [activeTab, setActiveTab] = useState(0);
  const AnimatedContainer = Animated.createAnimatedComponent(Container);
  const animationValue = useRef(new Animated.Value(0)).current;

  // 팔로우 상태 관리
  const [isFollowing, setIsFollowing] = useState(false);

  const { artist, artworks } = data;
  const { artistId = 1 } = route.params || {};
  //const artist = artistAndArtworkData.find((artist) => artist.id === 1);
  if (!artist) {
    return (
      <Container>
        <ErrorMessage>해당 작품의 정보를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }
  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        rightButtonType: 'icon',
        iconColor: '#e100ff',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.requestSuccess) {
        Alert.alert('성공', '작가님께 작품 요청이 성공적으로 전달되었습니다!');
        navigation.setParams({ requestSuccess: false }); // 직접 수정 대신 setParams 사용
      }
    }, [route.params]),
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundHeight = scrollY.interpolate({
    inputRange: [0, 100], // 스크롤 범위
    outputRange: [170, 110], // 높이가 170에서 110으로 줄어듦
    extrapolate: 'clamp',
  });
  const backgroundLayerOpacity = scrollY.interpolate({
    inputRange: [80, 110],
    outputRange: [0, 1], // 스크롤이 진행되면서 0에서 1로 투명도 변화
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [70, 140], // 스크롤 범위
    outputRange: [70, 0], // 50px 아래에서 시작해 0으로 이동
    extrapolate: 'clamp', // 범위를 넘어가면 고정
  });

  const backgroundTranslateY = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTextOpacity = scrollY.interpolate({
    inputRange: [130, 170], // 스크롤 범위
    outputRange: [0, 1], // 0에서 1로 투명도가 변화
    extrapolate: 'clamp', // 범위를 넘어가면 고정
  });

  const profileImageTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });
  // 상태 관리와 애니메이션 값을 연결하기 위해 useEffect 사용
  useEffect(() => {
    // activeTab 상태가 변경되었을 때 애니메이션 실행
    Animated.timing(animationValue, {
      toValue: activeTab * (100 / tabs.length), // 각 탭의 위치로 애니메이션 이동
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: true, // width와 관련된 애니메이션에는 false 사용
    }).start();
  }, [activeTab]);

  const handleTabPress = (index: number) => {
    setActiveTab(index); // 상태 업데이트와 애니메이션 동시 실행을 위해 useEffect로 처리
  };

  const renderTabButtons = useCallback(() => {
    return (
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
            transform: [
              {
                translateX: animationValue.interpolate({
                  inputRange: [0, tabs.length - 1],
                  outputRange: [0, 100 * (tabs.length - 1)],
                }),
              },
            ],
          }}
        />
      </TabWrapper>
    );
  }, [activeTab, animationValue]);

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

  // 훅을 조건문 밖에서 호출
  const renderTabContent = useMemo(() => {
    if (activeTab === 0) {
      return artworks;
    } else if (activeTab === 1) {
      return [{ type: 'artistHistory' }];
    } else {
      return [];
    }
  }, [activeTab]);

  const renderItem = ({ item }) => {
    if (activeTab === 0) {
      return (
        <View style={{ paddingHorizontal: 16 }}>
          <ArtworkGrid
            artworks={[item]}
            selectedArtworks={[]}
            onSelect={() =>
              navigation.navigate('ArtworkInfo', { artworkId: artwork.id })
            }
          />
        </View>
      );
    } else if (activeTab === 1) {
      return renderArtistRecord();
    } else {
      return null;
    }
  };

  const renderArtistRecord = () => {
    return (
      <>
        <SocialMediaContainer>
          <SocialMediaButton>
            <Image source={require('src/assets/instagram-logo.png')} />
          </SocialMediaButton>
          <SocialMediaButton>
            <Image source={require('src/assets/blog-logo.png')} />
          </SocialMediaButton>
          <SocialMediaButton onPress={navigateToRequestArtwork}>
            <Image source={require('src/assets/dm-logo.png')} />
          </SocialMediaButton>
        </SocialMediaContainer>
        <HistoryContainer>
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
      </>
    );
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <AnimatedBackgroundImage
        source={{ uri: 'https://i.ibb.co/1vmZ82r/3.png' }}
        resizeMode='cover'
        style={{
          transform: [{ translateY: backgroundTranslateY }],
          height: 170,
          position: 'absolute', // 배경 이미지를 고정하여 스크롤 위에 있도록 설정
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 170,
          transform: [{ translateY: backgroundTranslateY }], // 동일하게 backgroundTranslateY 적용
          zIndex: 3,
        }}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} // 위는 어둡고 아래로 갈수록 투명해짐
          style={{
            height: '100%',
            width: '100%',
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>
      {/* 배경 위의 검은색 반투명 레이어 */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 110,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // 검은색 반투명 레이어
          opacity: backgroundLayerOpacity, // 스크롤에 따라 투명도 변경
          zIndex: 2,
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: 42,
          left: 40,
          right: 0,
          height: 60,
          opacity: headerTextOpacity, // 스크롤에 따라 투명도 변경
          transform: [{ translateY: headerTranslateY }],
          zIndex: 3,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>{artist.name}</Text>
        <Text style={{ color: 'white', fontSize: 12 }}>미술작품 9개</Text>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: 44,
          left: 16, // 좌측 아이콘 위치
          right: 20, // 우측 아이콘 위치
          flexDirection: 'row',
          justifyContent: 'space-between', // 좌우 아이콘 위치
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <BackIcon width={22} height={22} fill={'white'} />
        <MenuIcon width={26} height={26} fill={'white'} />

        <ProfileImageContainer
          style={{
            transform: [
              // { scale: profileImageScale },
              { translateY: profileImageTranslateY },
            ],
            opacity: backgroundOpacity,
          }}
        >
          <ArtistImage image={artist.image} size={88} />
        </ProfileImageContainer>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: scrollY.interpolate({
            inputRange: [0, 220], // 스크롤 범위
            outputRange: [150, -110], // 스크롤에 따라 위로 이동
            extrapolate: 'clamp',
          }),
          left: 16,
          zIndex: 1,
        }}
      >
        <ProfileWrapper>
          <ArtistName>{artist.name}</ArtistName>
          <ArtistInfo>{artist.category}</ArtistInfo>
          <ArtistBio>{artist.bio}</ArtistBio>
        </ProfileWrapper>
        <FollowSection>
          <View style={{ flexDirection: 'row' }}>
            <FollowCountItem>
              <FollowLabel>팔로워</FollowLabel>
              <FollowNumber>{artist.followers}</FollowNumber>
            </FollowCountItem>
            <FollowCountItem>
              <FollowLabel>팔로잉</FollowLabel>
              <FollowNumber>{artist.followers}</FollowNumber>
            </FollowCountItem>
          </View>
          <FollowButton isFollowing={isFollowing} onPress={handleFollowPress}>
            <FollowButtonText isFollowing={isFollowing}>
              {isFollowing ? '팔로우중' : '팔로우하기'}
            </FollowButtonText>
          </FollowButton>
        </FollowSection>
      </Animated.View>

      <FlatList
        data={renderTabContent}
        keyExtractor={(item, index) => `${item.id || index}`}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        ListHeaderComponent={renderTabButtons}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ marginTop: 110, paddingTop: 250, zIndex: 0 }}
        ListFooterComponent={<View style={{ height: 620 }} />}
        scrollEventThrottle={16}
      />
    </View>
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

const AnimatedBackgroundImage = styled(
  Animated.createAnimatedComponent(styled.Image`
    position: relative;
    width: 100%;
    height: 170px;
    overflow: hidden;
  `),
)``;

const HeaderOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(18, 0, 0, 0.5)', 'rgba(18, 0, 0, 0)'],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
})`
  position: absolute;
  width: 100%;
  height: 0%;
  top: 0;
  right: 0;
`;

const ProfileImageContainer = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 70px;
  z-index: 1;
`);

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.redBlack};
`;

const ProfileWrapper = styled.View`
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.margin.xl};
  z-index: -1;
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
  width: 96%;
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
  padding: 8px;
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
  background-color: #f7f5f5;
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

const ArtworkItemWrapper = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 150px;
  margin-top: 8px;
  border-radius: 8px;
`;

export default ArtistProfile;
