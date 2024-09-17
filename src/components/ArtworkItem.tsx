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

// fileName이 URI인지 로컬 이미지인지 판단하는 임시 함수
// TODO api 연결시 다시 맞춰서 수정
const isUri = (fileName: string) => {
  return fileName.startsWith('http://') || fileName.startsWith('https://');
};

const ArtworkItem: React.FC<ArtworkItemProps> = ({
  artwork,
  selected,
  selectedIndex,
  onSelect,
}) => {
  // fileName이 URI인지 아닌지를 판단
  const artworkImage = isUri(artwork.fileName)
    ? { uri: artwork.fileName } // URI일 경우
    : imageAssets[artwork.fileName];

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
const ITEM_WIDTH = '110px';

const ArtworkItemWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  width: ${ITEM_WIDTH};
`;

const ArtworkImageWrapper = styled.View<{ selected: boolean }>`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 130px;
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

const ArtworkName = styled(Subtitle2)`
  width: 100%;
`;

export default ArtworkItem;
