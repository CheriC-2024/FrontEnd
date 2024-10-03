import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface ArtistImageProps {
  image: string;
  size?: number;
  style?: ViewStyle;
}

const ArtistImage: React.FC<ArtistImageProps> = ({
  image,
  size = 84,
  style,
}) => {
  return (
    <ImageWrapper size={size} style={style}>
      <StyledArtistImage
        source={{ uri: image }}
        size={size}
        resizeMode='contain'
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.View<{ size: number }>`
  justify-content: center;
  align-items: center;
  /* 그림자 효과를 위해 필요함 */
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  elevation: 2;
`;

const StyledArtistImage = styled.Image<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: #fff;
`;

export default ArtistImage;
