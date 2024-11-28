import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  ArtworkItem,
  ProfileRow,
} from '../../components/_index';
import { artistAndArtworkData } from '../data';
import { Container } from 'src/styles/layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';

const ArtistCollecting: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;

  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: '아트 컬렉팅',
      }),
    );
  }, [navigation]);

  const handleArtistPress = (artistId: number) => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile',
      params: { artistId: 30 },
    });
  };

  // TODO:
  // const handleArtworkPress = (artistId: number) => {
  //   navigation.navigate('ArtworkInfo', {
  //     artworkId: artwork.id.toString(),
  //   });
  // };

  // TODO: 작가 정보 리스트 조회 API
  const renderArtistWithArtworks = ({ item }: { item: any }) => (
    <ArtistWithArtworksWrapper>
      <ProfileRow
        image={item.artist.image}
        name={item.artist.name}
        category={item.artist.category}
        size={84}
        userId={item.artist.id}
        onPress={() => handleArtistPress(item.artist.id)}
      />
      <View style={{ height: 16 }} />
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
              console.log('[현재 작품 ID] : ', artwork.id);
            }}
          />
        )}
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

export default ArtistCollecting;
