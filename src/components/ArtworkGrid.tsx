import React from 'react';
import styled from 'styled-components/native';
import ArtworkItem from './ArtworkItem';

interface ArtworkGridProps {
  artworks: any[];
  selectedArtworks: any[];
  onSelect: (artwork: any) => void;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({
  artworks,
  selectedArtworks,
  onSelect,
}) => {
  // 빈 아이템(플레이스홀더)을 추가해서 3개씩 맞춰주기
  const filledArtworks = [...artworks];
  const remainder = artworks.length % 3;
  if (remainder !== 0) {
    const placeholders = 3 - remainder;
    for (let i = 0; i < placeholders; i++) {
      filledArtworks.push(null); // null로 채워서 빈 공간을 만듦
    }
  }

  return (
    <GridContainer>
      {filledArtworks.map((artwork, index) => {
        if (!artwork) {
          // 빈 공간을 위한 플레이스홀더 렌더링
          return <PlaceholderItem key={`placeholder-${index}`} />;
        }
        const selected = selectedArtworks.some(
          (item) => item.artId === artwork.artId,
        );
        const selectedIndex = selectedArtworks.findIndex(
          (item) => item.artId === artwork.artId,
        );

        return (
          <ArtworkItemWrapper key={artwork.artId}>
            <ArtworkItem
              artwork={artwork}
              selected={selected}
              selectedIndex={selectedIndex}
              onSelect={() => onSelect(artwork)}
            />
          </ArtworkItemWrapper>
        );
      })}
    </GridContainer>
  );
};

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ArtworkItemWrapper = styled.View`
  width: 32%;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const PlaceholderItem = styled.View`
  width: 32%;
`;

export default ArtworkGrid;
