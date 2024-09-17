import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import ArtistCard from './ArtistCard'; // 작가 카드 컴포넌트
import ArtworkItem from '../ArtworkItem'; // 작품 아이템 컴포넌트

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
  return (
    <ArtistWithArtworkWrapper>
      <ArtistCard
        image={artist.image}
        name={artist.name}
        size={84}
        artistId={artist.id}
      />
      <ArtworkListWrapper>
        {artworks.map((artwork) => (
          <ArtworkItem
            key={artwork.id}
            artwork={artwork}
            selected={false}
            selectedIndex={0}
            onSelect={() => {}}
          />
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

export default ArtistWithArtworks;
