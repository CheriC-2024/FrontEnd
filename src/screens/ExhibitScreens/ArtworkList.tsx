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
        leftButtonType: 'both',
        leftButtonText: '작품 전시 목록',
      }),
    );
  }, [navigation]);

  const handleArtworkPress = (artId: number) => {
    const artwork = selectedArtworks.find((art) => art.artId === artId);
    if (artwork) {
      navigation.navigate('ArtworkDetail', {
        isCollectorOnly: artwork.cherryNum === null,
        imageUrl: artwork.fileName,
        title: artwork.name,
      });
    }
  };

  return (
    <Container>
      <TitleSubtitle
        title='전시로 올려질 작품들이에요!'
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
                <ArtworkImage source={imageAssets[artwork.fileName]} />
                <Subtitle2>{artwork.name}</Subtitle2>
                {artwork.register === 'COLLECTOR' &&
                artwork.cherryNum === null ? (
                  <CollectorOnlyImage
                    source={require('../../assets/images/collectorOnlyText.png')}
                  />
                ) : (
                  <ArtworkDescription>
                    {artwork.cherryNum === 0 ? (
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
                          {artwork.cherryNum}
                        </Text>
                      </View>
                    )}
                  </ArtworkDescription>
                )}
              </ArtworkItem>
            </ArtworkTouchable>
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
  width: 32%; /* 3줄 */
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

export default ArtworkList;
