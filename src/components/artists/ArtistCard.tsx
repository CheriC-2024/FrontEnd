import React from 'react';
import { Caption, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import ArtistImage from './ArtistImage';
import { TouchableOpacity } from 'react-native';
import useNavToProfile from 'src/hooks/useNavToProfile';

interface ArtistCardProps {
  image: string;
  size?: number;
  name: string;
  artistId: number;
  fontType?: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  image,
  size,
  name,
  artistId, // artistId를 prop으로 받아옴
  fontType = 'Caption',
}) => {
  const { navigateToProfile, loadingUserId } = useNavToProfile();

  const handlePress = () => {
    navigateToProfile(artistId); // navigateToProfile 함수 호출
  };

  return (
    <ArtistCardButton onPress={handlePress}>
      <ArtistImageWrapper>
        <ArtistImage image={image} size={size} />
        <ArtistName fontType={fontType}>{name}</ArtistName>
      </ArtistImageWrapper>
    </ArtistCardButton>
  );
};

const ArtistCardButton = styled(TouchableOpacity)`
  align-items: center;
`;

const ArtistImageWrapper = styled.View`
  align-items: center;
`;

const ArtistName = styled.Text<{ fontType: string }>`
  margin-top: ${({ theme }) => theme.margin.xs};
  ${({ fontType }) =>
    fontType === 'H6'
      ? `
    font-size: 18px;
    font-family: PretendardBold;
  `
      : `
    font-size: 12px;
    font-family: PretendardRegular;
  `}
`;

const LoadingText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  margin-top: ${({ theme }) => theme.margin.xs};
`;

export default ArtistCard;
