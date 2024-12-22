import styled from 'styled-components/native';
import { CherryIcon } from '../assets/icons/_index.js';
import { Caption } from 'src/styles/typography';
import { Artwork } from 'src/interfaces/collection';

// 필요한 속성만 사용하여 전달
const ArtworkPriceInfo: React.FC<
  Pick<Artwork, 'cherryPrice' | 'collectorsArt' | 'cherryNum'>
> = ({ cherryPrice, collectorsArt, cherryNum }) => {
  return (
    <InfoContainer>
      {cherryPrice == 0 ? (
        <PriceText>무료</PriceText>
      ) : cherryPrice > 0 ? (
        <PriceRow>
          <Icon />
          <PriceText>
            {` `}
            {cherryPrice}
          </PriceText>
        </PriceRow>
      ) : (
        <CollectorOnlyImage
          source={require('../assets/images/collectorOnlyText.png')}
        />
      )}
    </InfoContainer>
  );
};

const InfoContainer = styled.View``;

const CollectorOnlyImage = styled.Image`
  width: 80px;
  height: 15px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(CherryIcon)`
  fill: ${({ theme }) => theme.colors.grey_6};
`;

const PriceText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6};
`;

export default ArtworkPriceInfo;
