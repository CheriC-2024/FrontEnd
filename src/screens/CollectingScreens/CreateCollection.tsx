import React, { useEffect, useState } from 'react';
import { View, TextInput, Image } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Btn, BtnText } from 'src/components/Button';
import { Container } from 'src/styles/layout';
import InfoBlock from 'src/components/InfoBlock';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { ScrollView } from 'react-native-gesture-handler';
import { headerOptions } from 'src/navigation/UI/headerConfig';

const CreateCollection: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // 전달된 artworkId와 artworkImage를 받아옴
  const { artworkId, artworkImage } = route.params;

  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        headerRightText: '완료',
        headerBackgroundColor: '#E52C32', // 헤더 배경색
        headerTitleColor: '#fff', // 타이틀 텍스트 색상
        iconColor: '#fff', // 아이콘 색상
        onHeaderRightPress: handleComplete,
      }),
    );
  }, [navigation]);

  const handleComplete = () => {
    console.log('컬렉션 이름:', collectionName);
    console.log('컬렉션 설명:', collectionDescription);
    navigation.goBack(); // 완료 후 이전 화면으로 돌아가기
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Screen>
        <View style={{ paddingLeft: 16, paddingTop: 20 }}>
          <TitleSubtitle
            titleLarge={'새 컬렉션 추가하기'}
            subtitle={'새 컬렉션을 만들고 나면, 선택하신 작품이 담겨요!'}
            style={{ color: '#fff' }}
          />
        </View>
        <ContentWrapper>
          <ArtworkImageContainer>
            <ArtworkImage source={{ uri: artworkImage }} />
          </ArtworkImageContainer>
          <InfoContainer>
            <InfoBlock
              label={'컬렉션 이름'}
              placeholder={'컬렉터님 만의 컬렉션 이름을 작성해주세요'}
              maxLength={10}
              value={collectionName}
              onChangeText={setCollectionName}
            />
            <InfoBlock
              label={'컬렉션 설명'}
              placeholder={'컬렉터님 만의 컬렉션 설명을 작성해주세요'}
              maxLength={300}
              value={collectionDescription}
              onChangeText={setCollectionDescription}
              style={{ marginTop: 24 }}
            />
          </InfoContainer>
        </ContentWrapper>
      </Screen>
    </ScrollView>
  );
};

// 화면 전체를 차지하는 부모 컨테이너
const Screen = styled.View`
  flex: 1;
  background-color: ${({ theme }) =>
    theme.colors.cherryRed_10}; /* 상단 배경색 */
`;

const ContentWrapper = styled.View`
  background-color: white;
  padding: 16px;
  width: 100%;
  height: 100%;
  margin-top: 140px;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  position: relative;
`;

const ArtworkImageContainer = styled.View`
  width: 212px;
  height: 212px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 120px;
  position: absolute;
  top: -120px; /* 위쪽에서 80px 떨어지게 */
  left: 50%;
  transform: translateX(-90px); /* 가운데 정렬 */
  z-index: 1;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.View`
  margin-top: 80px;
`;

export default CreateCollection;
