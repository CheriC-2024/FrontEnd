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
import {
  useRecommendUsers,
  useUserInfoById,
} from 'src/api/hooks/useUserQueries';
import { mapArtTypesReverse } from 'src/utils/artTypeMapper';

const ArtistCollecting: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryTitle } = route.params;
  const type = mapArtTypesReverse([categoryTitle]);
  const {
    data: artData,
    isLoading,
    isError,
  } = useRecommendUsers({
    artType: type[0].toString(),
    order: 'LATEST',
    size: 10,
  });
  const { data: userData, isLoading: isUserLoading } = useUserInfoById(
    artData?.id,
  );

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
      params: { artistId },
    });
  };

  if (isLoading || isUserLoading) {
    return;
  }

  const renderArtistWithArtworks = ({
    userData,
    artData,
  }: {
    userData: any;
    artData: any;
  }) => (
    <ArtistWithArtworksWrapper>
      <View style={{ paddingRight: 16 }}>
        <ProfileRow
          image={artData.profileImgUrl}
          name={artData.name}
          category={categoryTitle}
          size={84}
          userId={artData.id}
          onPress={() => handleArtistPress(artData.id)}
        />
      </View>
      <View style={{ height: 16 }} />
      <FlatList
        data={artData.artBriefRess}
        keyExtractor={(artwork) => artwork.artId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: artwork }) => (
          <ArtworkItem
            artwork={artwork}
            selected={false}
            selectedIndex={0}
            onSelect={() => {
              navigation.navigate('ArtworkInfo', {
                artworkId: artwork.artId.toString(),
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
        data={artData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          renderArtistWithArtworks({ userData: userData, artData: item })
        }
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
