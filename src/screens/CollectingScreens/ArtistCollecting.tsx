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
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const handlePress = (artistId: number) => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile', // CollectingStack 안의 ArtistProfile 화면으로 이동
      params: { artistId }, // artistId를 전달
    });
  };

  // 각 아티스트와 작품을 렌더링하는 함수
  const renderArtistWithArtworks = ({ item }: { item: any }) => (
    <ArtistWithArtworksWrapper>
      {/* 아티스트 정보 */}
      <TouchableOpacity onPress={() => handlePress(item.artist.id)}>
        <ArtistInfo>
          <ArtistImage image={item.artist.image} size={84} />
          <View
            style={{
              flexDirection: 'column',
              paddingBottom: 14,
              marginLeft: 8,
            }}
          >
            <ArtistName>{item.artist.name}</ArtistName>
            <ArtistCategory>{item.artist.category}</ArtistCategory>
          </View>
        </ArtistInfo>
      </TouchableOpacity>
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
            onSelect={() => {
              navigation.navigate('ArtworkInfo', {
                artworkId: artwork.id.toString(),
              });
              console.log(artwork.id);
            }}
          />
        )}
        // 각 아이템 사이의 간격 설정
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    </ArtistWithArtworksWrapper>
  );

  return (
    <Container removePadding>
      <ArtCategoryHeader
        categoryTitle={categoryTitle}
        categoryType='artist'
        style={{ marginBottom: 16, paddingHorizontal: 16 }}
      />
      <FlatList
        data={artistAndArtworkData}
        keyExtractor={(item) => item.artist.id.toString()}
        renderItem={renderArtistWithArtworks}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
        ItemSeparatorComponent={() => <SeparatorLine />}
      />
    </Container>
  );
};

const SeparatorLine = styled.View`
  height: 1px;
  background-color: #f2f0f0;
  width: 95%;
  align-self: center;
  margin-right: 16px;
  margin-bottom: 16px;
`;

const ArtistWithArtworksWrapper = styled.View`
  margin-bottom: 24px;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 16px;
`;

const ArtistName = styled(H5)``;

const ArtistCategory = styled(Caption)``;

export default ArtistCollecting;
