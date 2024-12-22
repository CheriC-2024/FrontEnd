import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import ArtistCard from './ArtistCard'; // 작가 카드 컴포넌트
import ArtworkItem from '../ArtworkItem'; // 작품 아이템 컴포넌트
import { useNavigation } from '@react-navigation/native';

// ArtistWithArtworksProps 타입 정의
interface ArtistWithArtworksProps {
  artist: {
    id: number;
    name: string;
    image: string;
  };
  artworks: {
    id: number;
    fileName: string;
    name: string;
    cherryNum: number;
    register: 'ARTIST';
  }[];
}

const ArtistWithArtworks: React.FC<ArtistWithArtworksProps> = ({
  artist,
  artworks,
}) => {
  const navigation = useNavigation();
  return (
    <ArtistWithArtworkWrapper>
      <ArtistCard
        image={artist.image}
        name={artist.name}
        size={84}
        artistId={artist.id}
        fontType='H6'
      />
      <ArtworkListWrapper>
        {artworks.map((artwork, index) => (
          <ArtworkItemWrapper
            key={artwork.id}
            lastItem={index === artworks.length - 1}
          >
            <ArtworkItem
              artwork={artwork}
              selected={false}
              selectedIndex={0}
              onSelect={() =>
                navigation.navigate('CollectingStack', {
                  screen: 'ArtworkInfo', // Specify the screen within the stack
                  params: { artworkId: artwork.id }, // Pass artId as a parameter
                })
              }
            />
          </ArtworkItemWrapper>
        ))}
      </ArtworkListWrapper>
    </ArtistWithArtworkWrapper>
  );
};

const ArtistWithArtworkWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ArtworkListWrapper = styled.View`
  flex-direction: row;
  margin-left: 16px;
`;

const ArtworkItemWrapper = styled.View<{ lastItem: boolean }>`
  margin-right: ${({ lastItem }) => (lastItem ? '0px' : '8px')};
`;

export default ArtistWithArtworks;
