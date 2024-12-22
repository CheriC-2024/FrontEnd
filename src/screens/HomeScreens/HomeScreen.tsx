import { useState } from 'react';
import {
  ScrollView,
  ImageBackground,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'src/styles/layout';
import { ForwardIcon, PlusIcon } from 'src/assets/icons/_index';
import {
  ArtistCard,
  CollectorSuggestSheet,
  ExhibitCarousel,
  PrivateArtworkCard,
  SeparatorLine,
} from 'src/components/_index';
import { Caption, H4, H6 } from 'src/styles/typography';
import { useExhibitions } from 'src/api/hooks/useExhibitQueries';
import { useFollowList } from 'src/api/hooks/useFollowMutation';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useFetchArtTypesFilter } from 'src/api/hooks/useArtworkQueries';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const userData = useSelector((state: RootState) => state.getUser);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {
    data: carouselData = [],
    isLoading: isCarouselLoading,
    isError: isCarouselError,
  } = useExhibitions({
    userId: undefined,
    order: 'HITS',
    page: 0,
    size: 3,
  });

  const {
    data: followersData,
    isLoading: isFollowersLoading,
    error: isFollowersError,
  } = useFollowList({
    userId: userData.id,
    sort: 'FOLLOWING',
    order: 'LATEST',
    page: 0,
    size: 20,
  });

  const {
    data: ownArtData,
    isLoading: isOwnArtLoading,
    error,
  } = useFetchArtTypesFilter({
    userId: userData.id,
    isCollectorsArt: 'true',
    order: 'LATEST',
    page: 0,
    size: 3,
  });

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);

  if (isCarouselLoading || isFollowersLoading || isOwnArtLoading) return;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Background source={require('src/assets/home_bg.png')}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStack', { screen: 'ExhibitList' })
          }
          style={{ paddingLeft: 16 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <H4>컬렉션 전시 둘러보기</H4>
            <ForwardIcon width={28} height={28} />
          </View>
          <Caption>전시회에 오신 컬렉터님들을 환영합니다 :)</Caption>
        </TouchableOpacity>
        <CharacterImage
          source={require('src/assets/images/Character/right.png')}
        />
        <View style={{ marginTop: 32 }}>
          <ExhibitCarousel data={carouselData} />
        </View>
      </Background>
      <Container style={{ flex: 1 }} removePadding>
        <SectionWrapper>
          <CategoryTitle>내가 팔로우하는 컬렉터</CategoryTitle>
          <FlatList
            data={followersData}
            keyExtractor={(item) => String(item.id)}
            horizontal
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            contentContainerStyle={{ paddingHorizontal: 2 }}
            renderItem={({ item }) => (
              <ArtistCard
                image={item.profileImgUrl}
                name={item.name}
                artistId={item.id}
                size={74}
              />
            )}
            ListFooterComponent={() => (
              <AddCollector onPress={openBottomSheet}>
                <PlusIcon fill={'#B0ABAB'} width={20} height={20} />
              </AddCollector>
            )}
          />
        </SectionWrapper>
        <SeparatorLine />
        <SectionWrapper>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('HomeStack', { screen: 'PrivateArtworkList' })
            }
          >
            <CategoryTitle>NEW! 소장작품</CategoryTitle>
            <View style={{ paddingTop: 10 }}>
              <ForwardIcon width={24} height={24} />
            </View>
          </TouchableOpacity>
        </SectionWrapper>
        {ownArtData.map((item) => (
          <CardWrapper key={item.artId}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CollectingStack', {
                  screen: 'ArtworkInfo',
                  params: {
                    artworkId: item.artId,
                  },
                });
                console.log('[현재 작품 ID] : ', item.artId);
              }}
            >
              <PrivateArtworkCard
                image={item.imgUrl}
                collectorName={item.userRes.name}
                collectorImage={item.userRes.profileImgUrl}
              />
            </TouchableOpacity>
          </CardWrapper>
        ))}
      </Container>
      {isBottomSheetVisible && (
        <CollectorSuggestSheet onClose={closeBottomSheet} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const Background = styled(ImageBackground)`
  padding-top: 90px;
  padding-bottom: 20px;
`;

const CharacterImage = styled(Image)`
  position: absolute;
  top: 90px;
  right: -1px;
  width: 68px;
  height: 122px;
`;

const SectionWrapper = styled.View`
  padding-left: ${({ theme }) => theme.padding.m};
`;

const CategoryTitle = styled(H6)`
  padding-top: 20px;
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const AddCollector = styled.TouchableOpacity`
  width: 74px;
  height: 74px;
  margin-left: 12px;
  margin-right: 32px;
  background-color: #f1efef;
  border-radius: 37px;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
`;
