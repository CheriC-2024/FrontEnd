import React from 'react';
import { Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import ArtistImage from './ArtistImage';

interface ArtistCardProps {
  image: string;
  size?: number;
  name: string;
}
const ArtistCard: React.FC<ArtistCardProps> = ({ image, size, name }) => {
  return (
    <ArtistImageWrapper>
      <ArtistImage image={image} size={size} />
      <ArtistName>{name}</ArtistName>
    </ArtistImageWrapper>
  );
};

const ArtistImageWrapper = styled.View`
  align-items: center;
`;

const ArtistName = styled(Subtitle2)`
  margin-top: ${({ theme }) => theme.margin.xs};
`;

export default ArtistCard;
