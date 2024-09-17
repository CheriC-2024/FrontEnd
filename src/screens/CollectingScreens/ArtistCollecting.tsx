import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  ArtistImage,
  ArtworkItem,
} from '../../components/_index'; // 작품 아이템 컴포넌트
import { artistAndArtworkData } from '../data'; // 더미 데이터
import { Container } from 'src/styles/layout';
import { Caption, H5 } from 'src/styles/typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';

const ArtistCollecting: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: '아트 컬렉팅',
      }),
    );
  }, [navigation]);
  // 각 아티스트와 작품을 렌더링하는 함수
  const renderArtistWithArtworks = ({ item }: { item: any }) => (
    <ArtistWithArtworksWrapper>
      {/* 아티스트 정보 */}
      <ArtistInfo>
        <ArtistImage image={item.artist.image} size={84} />
        <View style={{ flexDirection: 'column' }}>
          <ArtistName>{item.artist.name}</ArtistName>
          <ArtistCategory>{item.artist.category}</ArtistCategory>
        </View>
      </ArtistInfo>
      {/* 작품 리스트 */}
      <FlatList
        data={item.artworks}
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
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    </ArtistWithArtworksWrapper>
  );

  return (
    <Container>
      <View style={{ marginTop: 8, marginBottom: 32 }}>
        <ArtCategoryHeader
          categoryTitle={categoryTitle}
          categoryType='artist'
        />
      </View>
      <FlatList
        data={artistAndArtworkData}
        keyExtractor={(item) => item.artist.id.toString()}
        renderItem={renderArtistWithArtworks}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    </Container>
  );
};

const ArtistWithArtworksWrapper = styled.View`
  margin-bottom: 24px;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 16px;
`;

const ArtistName = styled(H5)`
  margin-left: 12px;
`;

const ArtistCategory = styled(Caption)`
  margin-left: 12px;
`;

export default ArtistCollecting;
