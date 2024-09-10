import React from 'react';
import styled from 'styled-components/native';
import ArtworkPriceInfo from './ArtworkPriceInfo';
import { imageAssets } from 'src/assets/DB/imageAssets';
import { Subtitle2 } from 'src/styles/typography';
import { Artwork } from 'src/interfaces/collection';

interface ArtworkItemProps {
  artwork: Artwork;
  selected: boolean;
  selectedIndex: number;
  onSelect: () => void;
}

const ArtworkItem: React.FC<ArtworkItemProps> = ({
  artwork,
  selected,
  selectedIndex,
  onSelect,
}) => {
  const artworkImage = imageAssets[artwork.fileName];

  return (
    <ArtworkItemWrapper selected={selected} onPress={onSelect}>
      <ArtworkImageWrapper selected={selected}>
        <ArtworkImage source={artworkImage} selected={selected} />
        {selected && (
          <SelectedIndexWrapper>
            <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
          </SelectedIndexWrapper>
        )}
      </ArtworkImageWrapper>
      <ArtworkInfoContainer>
        <ArtworkName>{artwork.name}</ArtworkName>
        <ArtworkPriceInfo
          cherryNum={artwork.cherryNum}
          register={artwork.register}
        />
      </ArtworkInfoContainer>
    </ArtworkItemWrapper>
  );
};
const ITEM_WIDTH = '120px';

const ArtworkItemWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  width: 33%;
  align-self: flex-start;
`;

const ArtworkImageWrapper = styled.View<{ selected: boolean }>`
  overflow: hidden;
  position: relative;
  width: ${ITEM_WIDTH};
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background-color: ${({ selected }) =>
    selected ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};
`;

const ArtworkImage = styled.Image<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.selected ? 0.5 : 1)};
`;

const SelectedIndexWrapper = styled.View`
  position: absolute;
  top: 4px;
  right: 5px;
  padding: 3px 9px;
  border-radius: 30px;
  background-color: #100012;
`;

const SelectedIndex = styled.Text`
  color: #fff;
`;

const ArtworkInfoContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: ${ITEM_WIDTH};
  margin-top: ${({ theme }) => theme.margin.xs};
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const ArtworkName = styled(Subtitle2)``;

export default ArtworkItem;
