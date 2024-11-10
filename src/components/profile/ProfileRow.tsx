import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { H5, Caption } from 'src/styles/typography';
import FollowButton from './FollowButton';
import ArtistImage from '../artists/ArtistImage';

interface ProfileRowProps {
  image: string;
  name: string;
  category: string;
  size: number;
  userId: number;
  onPress: () => void;
}

const ProfileRow: React.FC<ProfileRowProps> = ({
  image,
  name,
  category,
  size,
  userId,
  onPress,
}) => {
  return (
    <RowContainer>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <ArtistInfo>
          <ArtistImage image={image} size={size} />
          <InfoWrapper>
            <ArtistName>{name}</ArtistName>
            <ArtistCategory>{category}</ArtistCategory>
          </InfoWrapper>
        </ArtistInfo>
      </TouchableOpacity>
      <View style={{ marginRight: 16 }}>
        <FollowButton userId={userId} />
      </View>
    </RowContainer>
  );
};

export default ProfileRow;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const InfoWrapper = styled.View`
  flex-direction: column;
  padding-bottom: 14px;
  margin-left: 8px;
`;

const ArtistName = styled(H5)``;

const ArtistCategory = styled(Caption)``;
