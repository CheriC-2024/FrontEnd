import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native'; // Navigation 사용
import ArtistImage from './ArtistImage';
import { Caption, H5 } from 'src/styles/typography';

interface ArtistBioItemProps {
  image: string;
  name: string;
  category: string;
  bio: string;
  artistId: number; // artistId 추가
}

const ArtistBioItem: React.FC<ArtistBioItemProps> = ({
  image,
  name,
  category,
  bio,
  artistId, // artistId 받아옴
}) => {
  const navigation = useNavigation(); // Navigation 사용 설정

  // 아티스트 프로필 화면으로 이동하는 함수
  const handlePress = () => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile', // CollectingStack 내에서 ArtistProfile로 이동
      params: { artistId }, // artistId를 넘기며 이동
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ArtistWrapper>
        <ArtistImage image={image} size={72} />
        <ArtistInfo>
          <ArtistName>{name}</ArtistName>
          <ArtistCategory>{category}</ArtistCategory>
        </ArtistInfo>
        <ArtistBio>
          <BioText numberOfLines={3} ellipsizeMode='tail'>
            {bio}
          </BioText>
        </ArtistBio>
      </ArtistWrapper>
    </TouchableOpacity>
  );
};

const ArtistWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 4px 0 4px;
  padding: 12px 8px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: white;
  elevation: 5;
`;

const ArtistInfo = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: ${({ theme }) => theme.margin.s};
`;

const ArtistName = styled(H5)``;

const ArtistCategory = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

const ArtistBio = styled.View`
  flex: 1.5;
  padding: ${({ theme }) => theme.spacing.s3};
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.grey_4};
`;

const BioText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

export default ArtistBioItem;
