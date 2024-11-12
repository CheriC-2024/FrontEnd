import React from 'react';
import { Caption, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import ArtistImage from './ArtistImage';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HomeStack', {
      screen: 'CollectorProfile', // TODO: 이거 작가인지, 컬렉터인지 판단하고 ArtistProfile 혹은 CollectorProfile로 가게 로직 수정해야 함
      params: { artistId },
    });
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

export default ArtistCard;
