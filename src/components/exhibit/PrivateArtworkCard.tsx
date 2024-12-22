import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { ButtonText } from 'src/styles/typography';
import { CollectorOnlyCircle } from 'src/assets/icons/_index';

interface PrivateArtworkCardProps {
  image: string; // URI 형식의 이미지 URL
  collectorName: string;
  collectorImage: string; // URI 형식의 컬렉터 프로필 이미지 URL
}

const PrivateArtworkCard: React.FC<PrivateArtworkCardProps> = ({
  image,
  collectorName,
  collectorImage,
}) => {
  return (
    <CardContainer>
      <BackgroundImageWrapper>
        <BackgroundImage source={{ uri: image }} blurRadius={3} />
        <Overlay />
        <IconWrapper>
          <CollectorOnlyCircle />
        </IconWrapper>
      </BackgroundImageWrapper>
      <ArtworkImageWrapper>
        <ArtworkImage source={{ uri: image }} resizeMode='contain' />
      </ArtworkImageWrapper>
      <CollectorInfo>
        <CollectorImage source={{ uri: collectorImage }} />
        <CollectorName>{collectorName}</CollectorName>
      </CollectorInfo>
    </CardContainer>
  );
};

export default PrivateArtworkCard;

const CardContainer = styled.View`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.s};
  border-bottom-left-radius: ${({ theme }) => theme.radius.xs};
  border-bottom-right-radius: ${({ theme }) => theme.radius.xs};
  background-color: #ffffff;
  overflow: hidden;
  elevation: 4;
  position: relative;
`;

const BackgroundImageWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  overflow: hidden;
`;

const BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const IconWrapper = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
`;

const ArtworkImageWrapper = styled.View`
  width: 100%;
  height: 160px;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  z-index: 1;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CollectorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fcf2f1;
  padding: 8px;
  height: 40px;
`;

const CollectorImage = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

const CollectorName = styled(ButtonText)`
  color: #120000;
`;
