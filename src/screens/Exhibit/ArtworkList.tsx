import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CherryIcon from '../../assets/icons/cherry.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator'; // RootStackParamList 타입 import
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { imageAssets } from '../../assets/DB/imageAssets';

const ArtworkList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedArtworks } = useGlobalState();

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
      <Subtitle>전시로 올려진 작품들이에요!</Subtitle>
      <Instruction>
        작품을 클릭하면, 더 상세한 정보를 확인할 수 있어요
      </Instruction>
      <ScrollView>
        <ArtworkContainer>
          {selectedArtworks.map((artwork) => (
            <ArtworkTouchable
              key={artwork.artId}
              onPress={() => handleArtworkPress(artwork.artId)}
            >
              <ArtworkItem>
                <ArtworkImage source={imageAssets[artwork.fileName]} />
                <ArtworkTitle>{artwork.name}</ArtworkTitle>
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
                        <CherryIcon fill="#B0ABAB" />
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

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #fff;
`;

const Subtitle = styled.Text`
  font-family: 'Bold';
  font-size: 18px;
  margin: 30px 0 5px 0;
  color: #120000;
`;

const Instruction = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
  margin-bottom: 30px;
`;

const ArtworkContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ArtworkTitle = styled.Text`
  font-family: 'Bold';
  font-size: 12px;
  color: #120000;
`;

const ArtworkDescription = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
`;

const CollectorOnlyImage = styled.Image`
  width: 80px;
  height: 15px;
`;

export default ArtworkList;
