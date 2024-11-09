import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import ArtistImage from './ArtistImage';
import { Caption, H5 } from 'src/styles/typography';
import LinearGradient from 'react-native-linear-gradient';

interface ArtistBioItemProps {
  image: string;
  name: string;
  category: string;
  bio: string;
  artistId: number;
  backgroundImage: string;
}

const ArtistBioItem: React.FC<ArtistBioItemProps> = ({
  image,
  name,
  category,
  bio,
  artistId,
  backgroundImage,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile',
      params: { artistId },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <BackgroundImage source={{ uri: backgroundImage }}>
        <Overlay>
          <ProfileWrapper>
            <ArtistImage image={image} size={56} />
            <ArtistInfo>
              <ArtistName>{name}</ArtistName>
              <ArtistCategory>{category}</ArtistCategory>
            </ArtistInfo>
          </ProfileWrapper>
          <ArtistBio>
            <BioText numberOfLines={3} ellipsizeMode='tail'>
              {bio}
            </BioText>
          </ArtistBio>
          <View style={{ paddingBottom: 28 }} />
        </Overlay>
      </BackgroundImage>
    </TouchableOpacity>
  );
};

const BackgroundImage = styled.ImageBackground`
  width: 270px;
  height: 280px;
  border-radius: ${({ theme }) => theme.radius.s};
  overflow: hidden;
  justify-content: flex-end;
`;

const Overlay = styled(LinearGradient).attrs({
  colors: ['rgba(18, 0, 0, 0.6)', 'rgba(18, 0, 0, 0)'],
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ProfileWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const ArtistInfo = styled.View`
  margin-left: 8px;
`;

const ArtistName = styled(H5)`
  color: white;
`;

const ArtistCategory = styled(Caption)`
  color: white;
`;

const ArtistBio = styled.View`
  margin-top: 4px;
  padding: 0 16px;
`;

const BioText = styled(Caption)`
  color: white;
  font-size: 10px;
`;

export default ArtistBioItem;
