import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { CherryIcon } from '../../assets/icons/_index.js';
import { useNavigation } from '@react-navigation/native';
import { imageAssets } from '../../assets/DB/imageAssets';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { theme } from 'src/styles/theme';
import { Caption, Subtitle2 } from 'src/styles/typography';
import { headerOptions } from 'src/navigation/UI/headerConfig';

const ArtworkList: React.FC = () => {
  const navigation = useNavigation();
  const { selectedArtworks } = useSelector((state: RootState) => state.artwork);

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        marginLeft: 0,
      }),
    );
  }, [navigation]);

  const handleArtworkPress = (artId: number) => {
    const artwork = selectedArtworks.find((art) => art.artId === artId);
    if (artwork) {
      navigation.navigate('ArtworkDetail', {
        artworkId: artId,
      });
    }
  };

  // Calculate the number of placeholders needed
  const numColumns = 3;
  const totalItems = selectedArtworks.length;
  const placeholdersNeeded =
    (numColumns - (totalItems % numColumns)) % numColumns;
  const placeholders = Array.from({ length: placeholdersNeeded });

  return (
    <Container>
      <View style={{ marginTop: 20 }} />
      <TitleSubtitle
        titleLarge='전시로 올려질 작품들'
        subtitle='작품을 클릭하면, 더 상세한 정보를 확인할 수 있어요'
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArtworkContainer>
          {selectedArtworks.map((artwork) => (
            <ArtworkTouchable
              key={artwork.artId}
              onPress={() => handleArtworkPress(artwork.artId)}
            >
              <ArtworkItem>
                <ArtworkImage source={{ uri: artwork.imgUrl }} />
                <Subtitle2>{artwork.name}</Subtitle2>
                {artwork.collectorsArt ? (
                  <CollectorOnlyImage
                    source={require('../../assets/images/collectorOnlyText.png')}
                  />
                ) : (
                  <ArtworkDescription>
                    {artwork.cherryPrice === 0 ? (
                      '무료'
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <CherryIcon fill='#B0ABAB' />
                        <Text style={{ color: '#B0ABAB' }}>
                          {artwork.cherryPrice}
                        </Text>
                      </View>
                    )}
                  </ArtworkDescription>
                )}
              </ArtworkItem>
            </ArtworkTouchable>
          ))}
          {/* Render placeholders to fill the empty spaces */}
          {placeholders.map((_, index) => (
            <PlaceholderItem
              key={`placeholder-${index}`}
              pointerEvents='none'
            />
          ))}
        </ArtworkContainer>
      </ScrollView>
    </Container>
  );
};

const ArtworkContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${theme.spacing.s8};
`;

const ArtworkTouchable = styled(TouchableOpacity)`
  width: 32%;
  margin-bottom: 16px;
`;

const ArtworkItem = styled.View`
  flex: 1;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: ${theme.radius.xs};
  margin-bottom: ${theme.margin.xs};
`;

const ArtworkDescription = styled(Caption)`
  color: ${theme.colors.grey_6};
`;

const CollectorOnlyImage = styled.Image`
  width: 80px;
  height: 15px;
`;

// Styled component for placeholders
const PlaceholderItem = styled(ArtworkTouchable)`
  opacity: 0;
`;

export default ArtworkList;
