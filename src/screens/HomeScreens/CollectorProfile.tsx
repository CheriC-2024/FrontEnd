import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AnimatedHeaderOverlay,
  ArtistImage,
  ArtworkItem,
  ExhibitListCard,
  FollowButton,
  TabButtons,
} from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { useArtistData } from 'src/api/hooks/useArtistQueries';
import { homeExhibitData } from '../data';
import { useExhibitions } from 'src/api/hooks/useExhibitQueries';
import { useFetchArtTypesFilter } from 'src/api/hooks/useArtworkQueries';

const tabs = ['컬렉션 전시', '소장 작품'];

const CollectorProfile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const { collectorId } = route.params;
  console.log('Route params:', collectorId);
  const { user, isLoading, error } = useArtistData(collectorId);
  const [isFollowing, setIsFollowing] = useState(false); // 초기값 false

  const {
    data: homeExhibitData = [],
    isLoading: isCarouselLoading,
    isError: isCarouselError,
  } = useExhibitions({
    userId: collectorId,
    order: 'HITS',
    page: 0,
    size: 10,
  });

  const {
    data: ownArtData = [],
    isLoading: ownArtLoading,
    error: ownArtError,
  } = useFetchArtTypesFilter({ userId: collectorId, isCollectorsArt: 'true' });

  useEffect(() => {
    if (!isLoading && user) {
      // 로딩이 끝난 후 데이터가 있을 때만 상태 설정
      setIsFollowing(user.isFollowing || false);
    }
  }, [isLoading, user]);

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

  // useEffect(() => {
  //   // route의 artistId가 변경되면 Redux의 artistId를 업데이트
  //   if (routeArtistId && routeArtistId !== artistId) {
  //     dispatch(setArtistId(routeArtistId));
  //   }
  //   if (artist) {
  //     dispatch(setInitialFollowers(artist.followers));
  //   }
  // }, [routeArtistId, artistId, artist, dispatch]);

  // useEffect(() => {
  //   if (routeArtistId !== null) {
  //     dispatch(setCurrentProfileId(routeArtistId));
  //   }
  //   if (artist) {
  //     dispatch(
  //       setInitialFollowers({
  //         userId: routeArtistId,
  //         followers: artist.followers,
  //       }),
  //     );
  //   }
  // }, [routeArtistId, artist, dispatch]);

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

  const handleFollowChange = (newFollowState: boolean) => {
    setIsFollowing(newFollowState);
  };

  const renderTabButtons = () => (
    <TabButtons
      tabs={tabs}
      activeTab={activeTab}
      onTabPress={handleTabPress}
      animationValue={animationValue}
    />
  );

  if (isLoading || !user || isCarouselLoading || ownArtLoading) {
    return;
  }

  if (error) {
    return (
      <Container>
        <Text>데이터를 가져오는 중 오류가 발생했습니다.</Text>
      </Container>
    );
  }

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const profileImageTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item }) => {
    if (activeTab === 0) {
      return (
        <View style={{ marginVertical: 6, marginHorizontal: 16 }}>
          <ExhibitListCard
            imageSource={item.coverImgUrl}
            colors={item.colors}
            title={item.name}
            collectorName={item.userRes.name}
            profileImage={item.userRes.profileImgUrl}
            heartCount={item.heartCount}
            hits={item.hits}
            tags={item.themes}
            font={item.font}
            bgType={item.exhibitionBackgroundType}
          />
        </View>
      );
    }
    if (activeTab === 1) {
      return (
        <View style={{ marginTop: 16, marginRight: 10 }}>
          <ArtworkItem
            artwork={item}
            selected={false} // 선택 상태 설정 필요 시
            selectedIndex={0} // 선택 인덱스 설정 필요 시
            onSelect={() =>
              navigation.navigate('PrivateArtworkInfo', {
                artworkId: item.id,
              })
            }
          />
        </View>
      );
    }
    return null;
  };

  // activeTab에 따라 데이터를 필터링
  const filteredData = activeTab === 0 ? homeExhibitData : ownArtData;

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
      <AnimatedHeaderOverlay
        artistName={user.name}
        artworkCount={homeExhibitData?.length || 0} // TODO: 작품 개수 리스트 조회 API 연결시
        backgroundImage={user.backgroundImgUrl}
        scrollY={scrollY}
        exhibit={true}
      />
      <ProfileImageContainer
        style={{
          transform: [
            // { scale: profileImageScale },
            { translateY: profileImageTranslateY },
          ],
          opacity: backgroundOpacity,
          position: 'absolute',
          top: 120,
          left: 16,
          zIndex: 3,
        }}
      >
        <ArtistImage image={user.profileImgUrl} size={88} />
      </ProfileImageContainer>
      <Animated.View
        style={{
          position: 'absolute',
          top: scrollY.interpolate({
            inputRange: [0, 230], // 스크롤 범위
            outputRange: [150, -140], // 스크롤에 따라 위로 이동
            extrapolate: 'clamp',
          }),
          zIndex: 1,
        }}
      >
        <ProfileWrapper>
          <ArtistName>{user.name}</ArtistName>
          <ArtistInfo>선호 분야 {user?.artTypes.join(' • ')}</ArtistInfo>
          <ArtistBio numberOfLines={3}>{user.description}</ArtistBio>
        </ProfileWrapper>
        <FollowSection>
          <View style={{ flexDirection: 'row' }}>
            <FollowCountItem>
              <FollowLabel>팔로워</FollowLabel>
              <FollowNumber>{user.followerAmount}</FollowNumber>
            </FollowCountItem>
            <FollowCountItem>
              <FollowLabel>팔로잉</FollowLabel>
              <FollowNumber>{user.followingAmount}</FollowNumber>
            </FollowCountItem>
          </View>
          <FollowButton
            userId={collectorId}
            isFollowing={isFollowing}
            onFollowChange={handleFollowChange}
          />
        </FollowSection>
      </Animated.View>
      <FlatList
        data={filteredData}
        extraData={activeTab}
        key={activeTab === 1 ? '3-columns' : '1-column'}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={activeTab === 1 ? 3 : 1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        ListHeaderComponent={renderTabButtons}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ marginTop: 110, paddingTop: 280, zIndex: 2 }}
        columnWrapperStyle={
          activeTab === 1
            ? {
                alignSelf: 'flex-start',
                paddingLeft: 16,
              }
            : null
        }
        ListFooterComponent={
          <>
            <View style={{ height: 360 }} />
          </>
          // TODO: 작품 리스트 조회 API
          // <View
          //   style={{
          //     height:
          //       artworks.length <= 3 ? 620 : artworks.length <= 6 ? 400 : 200,
          //   }}
          // />
        }
        scrollEventThrottle={16}
      />
    </View>
  );
};

const ProfileImageContainer = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 70px;
  z-index: 1;
`);

const ProfileWrapper = styled.View`
  align-items: flex-start;
  padding-top: 56px;
  padding-left: 24px;
  z-index: -1;
  background-color: ${({ theme }) => theme.colors.bg};
  flex-direction: column;
  flex-wrap: wrap;
`;

const ArtistName = styled(H4)`
  margin-top: ${({ theme }) => theme.spacing.s3};
`;

const ArtistInfo = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

const ArtistBio = styled(Caption)`
  margin-top: ${({ theme }) => theme.margin.xs};
  padding-right: 8px;
  color: #7d7979;
`;

const FollowSection = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.margin.m};
  padding-left: 24px;
  padding-right: 16px;
  padding-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.bg};
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

export default CollectorProfile;
