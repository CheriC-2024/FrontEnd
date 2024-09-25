import React from 'react';
import { Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import ArtistImage from './ArtistImage';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ArtistCardProps {
  image: string;
  size?: number;
  name: string;
  artistId: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  image,
  size,
  name,
  artistId, // artistId를 prop으로 받아옴
}) => {
  const navigation = useNavigation();

  // onPress 시 ArtistProfile로 이동하며 artistId를 전달
  const handlePress = () => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile', // CollectingStack 안의 ArtistProfile 화면으로 이동
      params: { artistId }, // artistId를 전달
    });
  };

  return (
    <ArtistCardButton onPress={handlePress}>
      <ArtistImageWrapper>
        <ArtistImage image={image} size={size} />
        <ArtistName>{name}</ArtistName>
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

const ArtistName = styled(Subtitle2)`
  margin-top: ${({ theme }) => theme.margin.xs};
`;

export default ArtistCard;
