import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { artistAndArtworkData } from '../data'; // 아티스트 및 작품 데이터 불러오기
import { Container } from 'src/styles/layout';
import { Caption, H4, H5, H6, Subtitle2 } from 'src/styles/typography';
import { ForwardIcon, HeartIcon } from 'src/assets/icons/_index.js';
import {
  ArtistImage,
  ArtworkItem,
  ExhibitListCard,
  Table,
} from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { homeExhibitData } from '../data';

const PrivateArtworkInfo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const artworkId = 101;
  //const { artworkId = 101 } = route.params || {}; //101 임시 id

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        rightButtonType: 'collectorOnly',
        marginRight: 8,
      }),
    );
  }, [navigation]);

  // artworkId에 맞는 작품과 아티스트 데이터를 필터링
  const artworkData = artistAndArtworkData
    .flatMap((item) => item.artworks)
    .find((artwork) => artwork.id === artworkId);

  const artistData = artistAndArtworkData.find((artist) =>
    artist.artworks.some((artwork) => artwork.id === artworkId),
  );

  if (!artworkData) {
    return (
      <Container>
        <ErrorMessage>해당 작품의 정보를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  const handlePress = (artistId: number) => {
    navigation.navigate('HomeStack', {
      screen: 'ArtistProfile',
      params: { artistId },
    }); // TODO:  컬렉터인지, 작가인지 구별하고 이동?
  };

  return (
    <Container>
      <FlatList
        data={homeExhibitData.slice(0, 3)} // 전시 부분 첫 3개만 가져옴
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* 작품 이미지 및 좋아요 수 */}
            <ArtworkImage source={{ uri: artworkData.fileName }} />
            <ArtworkCategoryWrapper>
              <TagsWrapper>
                <CategoryTag>유화</CategoryTag>
                <CategoryTag>회화</CategoryTag>
              </TagsWrapper>
              <TagsWrapper>
                <TouchableOpacity onPress={toggleLike}>
                  <HeartIcon
                    fill={liked ? '#E52C32' : 'none'}
                    stroke={liked ? null : '#120000'}
                  />
                </TouchableOpacity>
                <LikeText>{artworkData.cherryNum + 100}</LikeText>
              </TagsWrapper>
            </ArtworkCategoryWrapper>
            <ArtworkTitle>{artworkData.name}</ArtworkTitle>
            <TouchableOpacity // TODO: 앱 내에 등록된 작가가 아닐때도 처리
              onPress={() => handlePress(artistData.artist.id)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <ArtistName>{artistData.artist.name}</ArtistName>
              <Icon
                name='chevron-forward'
                size={22}
                color='#969292'
                style={{ paddingTop: 4 }}
              />
            </TouchableOpacity>
            <ArtworkInfoCard>
              <ArtistInfo>
                <ArtistImage
                  image={artistData.artist.image}
                  size={68}
                  style={{ marginRight: 4 }}
                />
                <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                  <Caption>{artistData.artist.category}</Caption>
                  <TouchableOpacity
                    onPress={() => handlePress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <H5>{artistData.artist.name}</H5>
                    <ForwardIcon width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </ArtistInfo>
              <ArtworkBio>
                안녕하세요 저는 현재 10년 경력의 작가 네번째 작가라고 합니다.
                이번 작품은 제 어릴적 좋아하던 동화책에서 영감을 받아 작업한
                작품이에요. 여러분도 어릴적 좋아하던 동화의 주인공이 있지
                않은가요? 제가 좋아하는 주인공인 피터팬을 모티브로 세상을
                자유롭게 여행하는 한 아이의 이야기를 담았습니다.
              </ArtworkBio>
            </ArtworkInfoCard>
            <SectionTitle>작품 기본 정보</SectionTitle>
            <Table items={tableItems} />
            <SectionContainer>
              {/* 작품 이용 유의사항 섹션 */}
              <SectionTitle>작품 이용 유의사항</SectionTitle>
              <InfoItem label='공개 여부' content='유료 (전시 1회당 2체리)' />
              <InfoItem label='저작자' content='작가 네번째작가' />
              <InfoItem
                label='유의사항'
                content='전시에 해당 작품을 유료로 활용할 수 있습니다. 저작권자인 작가가 설정한 금액(체리)은 전시 시 지급하시면, 전시회에 활용할 수 있습니다. 작품은 상업적 목적으로 금지하고 있으며, 캡처, 다운로드 등을 허용하지 않습니다. 위반 시 법적 문제가 될 수 있습니다.'
              />
            </SectionContainer>
            <View style={{ marginBottom: 28 }} />
            {/* 작가님의 다른 작품들 */}
            <TouchableOpacity
              onPress={() => handlePress(artistData.artist.id)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <H6>이 작가님의 다른 작품들</H6>
              <Icon
                name='chevron-forward'
                size={22}
                color='#120000'
                style={{ paddingBottom: 2 }}
              />
            </TouchableOpacity>
            <OtherArtworksWrapper>
              <FlatList
                data={artistData.artworks}
                keyExtractor={(artwork) => artwork.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: artwork }) => (
                  <ArtworkItem
                    artwork={artwork}
                    selected={false}
                    selectedIndex={0}
                    onSelect={() => {}}
                  />
                )}
                // 각 아이템 사이의 간격 설정
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              />
            </OtherArtworksWrapper>
            <TouchableOpacity
              onPress={() => handlePress(artistData.artist.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <H6>이 작품이 게시된 컬렉션 전시</H6>
              <Icon
                name='chevron-forward'
                size={22}
                color='#120000'
                style={{ paddingBottom: 2 }}
              />
            </TouchableOpacity>
          </>
        }
        renderItem={({ item }) => (
          <ExhibitListCard
            imageSource={item.imageSource}
            title={item.title}
            collectorName={item.collectorName}
            profileImage={item.profileImage}
            likes={item.likes}
            favorites={item.favorites}
            tags={item.tags}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => <View style={{ height: 40 }} />}
      />
    </Container>
  );
};

const tableItems = [
  { label: '작가', content: '네번째작가' },
  { label: '시리즈', content: '아몬드 나무' },
  { label: '작품 크기', content: '740mm * 920mm' },
  { label: '재질(사용재료)', content: '캔버스에 유화' },
  { label: '제작시기', content: '1890년' },
  { label: '작품 분야', content: '회화, 서양화' },
];

const ArtworkImage = styled.Image`
  width: 100%;
  height: 260px;
  border-radius: ${({ theme }) => theme.radius.s};
`;

const ArtworkCategoryWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const TagsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryTag = styled(Subtitle2)`
  background-color: #fcebeb;
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.radius.s};
  color: ${({ theme }) => theme.colors.cherryRed_10};
  margin-right: ${({ theme }) => theme.margin.xs};
`;

const LikeText = styled(H6)`
  margin-left: auto;
`;

const ArtworkTitle = styled(H4)`
  font-size: 28px;
  margin-top: ${({ theme }) => theme.margin.s};
  letter-spacing: 1px;
`;

const ArtistName = styled(H6)`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #969292;
`;

const ArtworkInfoCard = styled.View`
  margin: 0 2px;
  margin-top: 32px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.l};
  elevation: 4;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.padding.s};
`;

const ArtworkBio = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  line-height: 25px;
`;

const SectionContainer = styled.View`
  margin: ${({ theme }) => theme.margin.m} 0;
`;

const SectionTitle = styled(Subtitle2)`
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const InfoItem: React.FC<{
  label: string;
  content: string;
}> = ({ label, content }) => (
  <InfoRow>
    <InfoLabel>{label}</InfoLabel>
    <InfoText>{content}</InfoText>
  </InfoRow>
);

const InfoRow = styled.View`
  flex-direction: row;
  margin-top: 12px;
  align-items: flex-start; /* 라벨과 텍스트가 위쪽에 정렬되도록 설정 */
`;

const InfoLabel = styled(Caption)`
  font-family: ${({ theme }) => theme.fonts.bold};
  width: 70px;
`;

const InfoText = styled(Caption)`
  flex: 1;
  line-height: 18px;
`;

const OtherArtworksWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
  padding-bottom: 28px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

export default PrivateArtworkInfo;
