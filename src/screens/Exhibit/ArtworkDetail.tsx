import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/AppNavigator'; // RootStackParamList 타입 import

type ArtworkDetailRouteProp = RouteProp<RootStackParamList, 'ArtworkDetail'>;

const ArtworkDetail: React.FC = () => {
  const route = useRoute<ArtworkDetailRouteProp>();
  const { isCollectorOnly, imageUrl, title } = route.params;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {isCollectorOnly ? (
          <>
            <Row>
              <ArtworkTitle>{title}</ArtworkTitle>
              <CollectorOnlyImage
                source={require('../../assets/images/ExhibitPage/collectors_only.png')}
              />
            </Row>
            <SectionTitle>대표 이미지</SectionTitle>
            <MainImage source={imageUrl} />
            <SectionTitle>
              실물 이미지 <RedStar>*</RedStar>
            </SectionTitle>
            <RealImagesContainer>
              <RealImage source={imageUrl} />
              <RealImage source={imageUrl} />
              <RealImage source={imageUrl} />
            </RealImagesContainer>
            <SectionTitle>작품 기본 정보</SectionTitle>
            <InfoText>
              <InfoTitle>작가:</InfoTitle> 세번째 작가
            </InfoText>
            <InfoText>
              <InfoTitle>시리즈:</InfoTitle> 밤바람 드림
            </InfoText>
            <InfoText>
              <InfoTitle>작품 설명:</InfoTitle> 세번째 작가의 넘버링 드림 시리즈
              중 3번째 작품으로 작가는 어릴적 자신이 꾸던 꿈에서 영감을 받아
              캔버스로 옮긴 작품입니다.
            </InfoText>
            <InfoText>
              <InfoTitle>작품 크기:</InfoTitle> 740mm*920mm
            </InfoText>
            <InfoText>
              <InfoTitle>재질(사용재료):</InfoTitle> 캔버스에 유채
            </InfoText>
            <InfoText>
              <InfoTitle>제작시기:</InfoTitle> 2012년
            </InfoText>
            <InfoText>
              <InfoTitle>작품 분야:</InfoTitle> 회화, 서양화
            </InfoText>
            <SectionTitle>작품 소장 정보</SectionTitle>
            <InfoText>
              <InfoTitle>소장 일시:</InfoTitle> 2024년 04월 15일
            </InfoText>
            <InfoText>
              <InfoTitle>소장 장소:</InfoTitle> 비스토리 갤러리
            </InfoText>
            <InfoText>
              <InfoTitle>작품 구매 가격:</InfoTitle> 300만 원
            </InfoText>
          </>
        ) : (
          <>
            <ArtworkTitle>
              {title} <ArtworkSubtitle>무료</ArtworkSubtitle>
            </ArtworkTitle>
            <SectionTitle>대표 이미지</SectionTitle>
            <MainImage source={imageUrl} />
            <SectionTitle>작품 기본 정보</SectionTitle>
            <InfoText>
              <InfoTitle>작가:</InfoTitle> 빈센트 반 고흐
            </InfoText>
            <InfoText>
              <InfoTitle>시리즈:</InfoTitle> 아몬드 나무
            </InfoText>
            <InfoText>
              <InfoTitle>작품 설명:</InfoTitle>
              빈센트 반 고흐의 아몬드 나무 시리즈 중 1번째 작품으로 세계적으로
              유명한 빈센트 반고흐의 작품으로 현재 국제 미술관에서 소장중입니다.
            </InfoText>
            <InfoText>
              <InfoTitle>작품 크기: </InfoTitle>740mm*920mm
            </InfoText>
            <InfoText>
              <InfoTitle>재질(사용재료):</InfoTitle> 캔버스에 유채
            </InfoText>
            <InfoText>
              <InfoTitle>제작시기:</InfoTitle> 1890년
            </InfoText>
            <InfoText>
              <InfoTitle>작품 분야:</InfoTitle> 회화, 서양화
            </InfoText>
            <SectionTitle>작품 이용 유의사항</SectionTitle>
            <InfoText>
              <InfoTitle>공개 여부:</InfoTitle> 무료
            </InfoText>
            <InfoText>
              <InfoTitle>저작권자:</InfoTitle> 국제 미술관
            </InfoText>
            <InfoText>
              <InfoTitle>유의사항:</InfoTitle> 전시에 해당 작품은 무료로 활용할
              수 있습니다. 단, 외부로의 유출을 금지하고 있으며, 캡처, 다운로드
              등을 막아두고 있습니다. 이점 유의하시기 바랍니다.
            </InfoText>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ArtworkTitle = styled.Text`
  margin: 30px 5px 15px 0;
  font-family: 'Bold';
  font-size: 20px;
  color: #120000;
`;

const ArtworkSubtitle = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #b0abab;
  letter-spacing: 0.5px;
`;

const CollectorOnlyImage = styled.Image`
  margin-left: 8px;
  width: 100px;
  height: 40px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionTitle = styled.Text`
  font-family: 'Bold';
  font-size: 16px;
  color: #120000;
  margin: 16px 0 8px 0;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const RealImagesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RealImage = styled.Image`
  width: 32%;
  height: 150px;
  border-radius: 8px;
`;

const InfoTitle = styled.Text`
  font-family: 'Bold';
  font-size: 12px;
  color: #120000;
  margin-bottom: 12px;
`;

const InfoText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  margin-bottom: 12px;
`;

const RedStar = styled.Text`
  color: #e52c32;
`;

export default ArtworkDetail;
