import styled from 'styled-components/native';
import ArtworkPriceInfo from './ArtworkPriceInfo';
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
  return (
    <ArtworkItemWrapper selected={selected} onPress={onSelect}>
      <ArtworkImageWrapper selected={selected}>
        <ArtworkImage
          source={{ uri: artwork?.imgUrl || artwork?.fileName }}
          selected={selected}
        />
        {selected && (
          <SelectedIndexWrapper>
            <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
          </SelectedIndexWrapper>
        )}
      </ArtworkImageWrapper>
      <ArtworkInfoContainer>
        <ArtworkName>{artwork.name}</ArtworkName>
        <ArtworkPriceInfo
          cherryPrice={artwork.cherryPrice || artwork.cherryNum}
          collectorsArt={artwork.collectorsArt}
        />
      </ArtworkInfoContainer>
    </ArtworkItemWrapper>
  );
};
const ITEM_WIDTH = '120px';

const ArtworkItemWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  width: ${ITEM_WIDTH};
`;

const ArtworkImageWrapper = styled.View<{ selected: boolean }>`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 142px;
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
  margin-top: ${({ theme }) => theme.margin.xs};
`;

const ArtworkName = styled(Subtitle2).attrs({
  numberOfLines: 1, // 한 줄로 제한
  ellipsizeMode: 'tail', // 길 경우 끝에 '...' 처리
})`
  width: 100%;
`;

export default ArtworkItem;
