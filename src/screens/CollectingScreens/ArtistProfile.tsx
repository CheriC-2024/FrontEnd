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
        leftButtonType: 'both',
        leftButtonText: `작가 ${artistData.artist.name}님의 공간`,
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

  return (
    <Container>
      <ProfileWrapper>
        <ArtistImage image={artistData.artist.image} size={88} />
        <ArtistName>{artistData.artist.name}</ArtistName>
        <ArtistInfo>{artistData.artist.category}</ArtistInfo>
        <ArtistBio>{artistData.artist.bio}</ArtistBio>
        <FollowSection>
          <FollowersCount>팔로워 {artistData.artist.followers}</FollowersCount>
          <FollowButton isFollowing={isFollowing} onPress={handleFollowPress}>
            <FollowButtonText>
              {isFollowing ? '팔로잉 중' : '팔로우하기'}
            </FollowButtonText>
          </FollowButton>
        </FollowSection>
      </ProfileWrapper>

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

      <ArtworkGrid
        artworks={artistData.artworks}
        selectedArtworks={[]}
        onSelect={handleSelectArtwork}
      />
    </Container>
  );
};

// 애니메이션 선 스타일
const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #4a0d66;
`;

const ProfileWrapper = styled.View`
  align-items: center;
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: 24px;
`;

const ArtistName = styled(H4)`
  margin-top: ${({ theme }) => theme.margin.s};
`;

const ArtistInfo = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

const ArtistBio = styled(Caption)`
  text-align: center;
  margin-top: 4px;
  padding: 0 60px;
  color: ${({ theme }) => theme.colors.grey_8};
`;

const FollowSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 75%;
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: ${({ theme }) => theme.spacing.s10};
`;

const FollowersCount = styled(Subtitle2)``;

const FollowButton = styled.TouchableOpacity<{ isFollowing: boolean }>`
  background-color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.colors.grey_6 : theme.colors.redBlack};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.l};
`;

const FollowButtonText = styled(Subtitle1)`
  color: #fff;
`;

const TabWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;

const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.padding.s};
`;

const TabButtonText = styled(Subtitle2)<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#120000' : '#B0ABAB')};
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

export default ArtistProfile;
