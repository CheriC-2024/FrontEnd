import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator'; // RootStackParamList 타입 import

const ArtworkList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //더미데이터 - api 연결시 삭제
  const artworks = [
    {
      id: 1,
      title: '아몬드 꽃1',
      description: '무료',
      imageUrl: require('../../assets/picture1.jpg'),
      isCollectorOnly: false,
    },
    {
      id: 2,
      title: '고양이',
      description: 'Collector Only',
      imageUrl: require('../../assets/picture2.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 3,
      title: '아몬드 꽃3',
      description: '4체리',
      imageUrl: require('../../assets/picture3.jpg'),
      isCollectorOnly: false,
    },
    {
      id: 4,
      title: '별이 빛나는 밤',
      description: '2체리',
      imageUrl: require('../../assets/picture4.jpg'),
      isCollectorOnly: false,
    },
    {
      id: 5,
      title: '아몬드 꽃5',
      description: 'Collector Only',
      imageUrl: require('../../assets/picture5.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 6,
      title: 'Space',
      description: 'Collector Only',
      imageUrl: require('../../assets/picture6.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 7,
      title: '아몬드 꽃7',
      description: 'Collector Only',
      imageUrl: require('../../assets/picture7.jpg'),
      isCollectorOnly: true,
    },
  ];

  const handleArtworkPress = (
    isCollectorOnly: boolean,
    imageUrl: any,
    title: string,
  ) => {
    navigation.navigate('ArtworkDetail', { isCollectorOnly, imageUrl, title });
  };

  return (
    <Container>
      <Subtitle>전시로 올려진 작품들이에요!</Subtitle>
      <Instruction>
        작품을 클릭하면, 더 상세한 정보를 확인할 수 있어요
      </Instruction>
      <ScrollView>
        <ArtworkContainer>
          {artworks.map((artwork) => (
            <ArtworkTouchable
              key={artwork.id}
              onPress={() =>
                handleArtworkPress(
                  artwork.isCollectorOnly,
                  artwork.imageUrl,
                  artwork.title,
                )
              }
            >
              <ArtworkItem>
                <ArtworkImage source={artwork.imageUrl} />
                <ArtworkTitle>{artwork.title}</ArtworkTitle>
                {artwork.isCollectorOnly ? (
                  <CollectorOnlyImage
                    source={require('../../assets/images/collectorOnlyText.png')}
                  />
                ) : (
                  <ArtworkDescription>{artwork.description}</ArtworkDescription>
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
