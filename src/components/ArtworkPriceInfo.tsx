import React from 'react';
import styled from 'styled-components/native';
import { CherryIcon } from '../assets/icons/_index.js';
import { Caption } from 'src/styles/typography';
import { Artwork } from 'src/interfaces/collection';

// 필요한 속성만 사용하여 전달
const ArtworkPriceInfo: React.FC<Pick<Artwork, 'cherryNum' | 'register'>> = ({
  cherryNum,
  register,
}) => {
  return (
    <InfoContainer>
      {cherryNum === null ? ( // TODO: api 구조 확정시 register 사용하여 수정 예정
        <CollectorOnlyImage
          source={require('../assets/images/collectorOnlyText.png')}
        />
      ) : register === 'ARTIST' || cherryNum > 0 ? (
        <PriceRow>
          <Icon />
          <PriceText>
            {` `}
            {cherryNum}
          </PriceText>
        </PriceRow>
      ) : (
        <PriceText>무료</PriceText>
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
