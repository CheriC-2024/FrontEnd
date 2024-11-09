import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  setArtistId,
  setInitialFollowers,
  toggleFollow,
  unFollow,
} from 'src/slices/profileSlice';
import {
  AnimatedHeaderOverlay,
  ArtistImage,
  ArtistRecord,
  ArtworkItem,
  RequestArtworkSheet,
  TabButtons,
} from 'src/components/_index';
import CustomModal from 'src/components/Modal';
import { Container } from 'src/styles/layout';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { useArtistData } from 'src/api/hooks/useArtistQueries';

const tabs = ['미술 작품', '작가 이력', '컬렉션 전시', '소장 작품'];

const ArtistProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [isRequestSheetVisible, setRequestSheetVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const { artistId: routeArtistId } = route.params;

  const artistId = useSelector((state: RootState) => state.profile.artistId);
  const followers = useSelector((state: RootState) => state.profile.followers);

  console.log('Route params:', artistId);
  const { artist, artworks, isLoading, error } = useArtistData(artistId!);
  console.log('Fetched artworks:', artworks);
  console.log('Fetched artist:', artist);

  // 팔로우 상태 관리
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCloseRequestSheet = () => {
    setRequestSheetVisible(false);
  };

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        rightButtonType: 'icon',
        iconColor: '#fff',
        headerTransparent: true,
        onHeaderRightPress: () => setRequestSheetVisible(true),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    // route의 artistId가 변경되면 Redux의 artistId를 업데이트
    if (routeArtistId && routeArtistId !== artistId) {
      dispatch(setArtistId(routeArtistId));
    }
    if (artist) {
      dispatch(setInitialFollowers(artist.followers));
    }
  }, [routeArtistId, artistId, artist, dispatch]);

  useEffect(() => {
    if (route.params?.requestSuccess) {
      setModalVisible(true);
      navigation.setParams({ requestSuccess: false });
    }
    // No else block or return statement here
  }, [route.params?.requestSuccess]);

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

  const renderTabButtons = () => (
    <TabButtons
      tabs={tabs}
      activeTab={activeTab}
      onTabPress={handleTabPress}
      animationValue={animationValue}
    />
  );

  const renderTabContent = () => {
    if (activeTab === 0) {
      return artworks;
    } else if (activeTab === 1) {
      return [{ key: 'artistRecord' }]; // placeholder 아이템
    }
    return [];
  };

  if (isLoading) {
    return <Container></Container>;
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

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      dispatch(unFollow());
    } else {
      dispatch(toggleFollow());
    }
  };

  const handleConfirm = () => {
    setModalVisible(false);
    //navigation.navigate('SomeOtherScreen');
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    if (activeTab === 0) {
      return (
        <View style={{ marginTop: 16, marginRight: 10 }}>
          <ArtworkItem
            artwork={item}
            selected={false} // 선택 상태 설정 필요 시
            selectedIndex={0} // 선택 인덱스 설정 필요 시
            onSelect={() =>
              navigation.navigate('ArtworkInfo', {
                artworkId: item.id,
              })
            }
          />
        </View>
      );
    }
    if (activeTab === 1) {
      return <ArtistRecord artistHistory={artistHistory} />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
      <AnimatedHeaderOverlay
        artistName={artist.name}
        artworkCount={artworks.length}
        backgroundImage='https://i.ibb.co/1vmZ82r/3.png'
        scrollY={scrollY}
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
        <ArtistImage image={artist.image} size={88} />
      </ProfileImageContainer>
      <Animated.View
        style={{
          position: 'absolute',
          top: scrollY.interpolate({
            inputRange: [0, 230], // 스크롤 범위
            outputRange: [150, -120], // 스크롤에 따라 위로 이동
            extrapolate: 'clamp',
          }),
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
              <FollowNumber>{followers}</FollowNumber>
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
        data={renderTabContent()}
        extraData={activeTab}
        key={activeTab === 0 ? '3-columns' : '1-column'}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={activeTab === 0 ? 3 : 1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        ListHeaderComponent={renderTabButtons}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ marginTop: 110, paddingTop: 280, zIndex: 2 }}
        columnWrapperStyle={
          activeTab === 0
            ? {
                alignSelf: 'flex-start',
                paddingLeft: 16,
              }
            : null
        }
        ListFooterComponent={
          <View
            style={{
              height:
                artworks.length <= 3 ? 620 : artworks.length <= 6 ? 400 : 200,
            }}
          />
        }
        scrollEventThrottle={16}
      />
      {isRequestSheetVisible && (
        <RequestArtworkSheet
          onClose={handleCloseRequestSheet}
          artistId={artistId}
        />
      )}
      <CustomModal
        visible={isModalVisible}
        onClose={handleConfirm}
        title={`컬렉터님의 작품 요청을${'\n'}작가님께 전달드렸어요!`}
        body='보내신 작품 요청은 마이체리시 > 내가 보낸 작품 요청에서 확인하실 수 있습니다.'
        confirmButtonText='알겠습니다'
        cancelButtonText='확인하러 가기'
        onConfirm={handleModalClose}
      />
    </View>
  );
};

// 작가 이력 로컬 데이터 TODO: API 연결
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

export default ArtistProfile;
