import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { artistAndArtworkData } from '../data'; // 아티스트 및 작품 데이터 불러오기
import { Container } from 'src/styles/layout';
import {
  ButtonText,
  Caption,
  H3,
  H5,
  H6,
  Subtitle2,
} from 'src/styles/typography';
import { HeartIcon } from 'src/assets/icons/_index.js';
import { AddCollectionSheet, ArtistImage } from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Btn, BtnText } from 'src/components/Button';
import { collections } from './data';
import ToastMessage from 'src/components/ToastMessage'; // 토스트 메시지 컴포넌트
import useToastMessage from 'src/hooks/useToastMessage'; // 토스트 훅

const ArtworkInfo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artworkId } = route.params; // 네비게이션으로부터 전달된 artworkId 받기

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(
    null,
  );

  // 토스트 메시지 훅 사용
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    if (selectedCollection !== null) {
      // 선택된 컬렉션이 있을 때 토스트 메시지 출력
      const selectedCollectionName = collections.find(
        (collection) => collection.id === selectedCollection,
      )?.name;
      if (selectedCollectionName) {
        showToast(
          `컬렉션 '${selectedCollectionName}'에 작품이 추가되었습니다.`,
        );
      }
    }
    setIsBottomSheetVisible(false);
  };

  const handleSelectCollection = (collectionId: number) => {
    if (selectedCollection === collectionId) {
      // 이미 선택된 항목을 다시 누르면 선택 해제
      setSelectedCollection(null);
    } else {
      // 새로운 항목 선택
      setSelectedCollection(collectionId);
    }
  };

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: ' ',
      }),
    );
  }, [navigation]);

  // artworkId에 맞는 작품과 아티스트 데이터를 필터링
  const artworkData = artistAndArtworkData
    .flatMap((artist) => artist.artworks)
    .find((artwork) => artwork.id === artworkId);

  const artistData = artistAndArtworkData.find((artist) =>
    artist.artworks.some((artwork) => artwork.id === artworkId),
  );

  if (!artworkData || !artistData) {
    return (
      <Container>
        <ErrorMessage>해당 작품의 정보를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 작품 이미지 및 좋아요 수 */}
        <ArtworkImage source={{ uri: artworkData.fileName }} />
        <ArtworkCategoryWrapper>
          <CategoryTagsWrapper>
            <CategoryTag>유화</CategoryTag>
            <CategoryTag>회화</CategoryTag>
          </CategoryTagsWrapper>
          <LikeText>
            <HeartIcon /> {artworkData.cherryNum + 100}
          </LikeText>
        </ArtworkCategoryWrapper>

        {/* 작품 제목 */}
        <ArtworkTitle>{artworkData.name}</ArtworkTitle>

        {/* 작가 정보 */}
        <ArtworkInfoCard>
          <ArtistInfo>
            <ArtistImage image={artistData.artist.image} size={68} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 10,
              }}
            >
              <ArtistCategory>{artistData.artist.category}</ArtistCategory>
              <ArtistName>{artistData.artist.name}</ArtistName>
            </View>
          </ArtistInfo>
          <ArtworkBio>
            안녕하세요 저는 현재 10년 경력의 작가 네번째 작가라고 합니다. 이번
            작품은 제 어릴적 좋아하던 동화책에서 영감을 받아 작업한 작품이에요.
            여러분도 어릴적 좋아하던 동화의 주인공이 있지 않은가요? 제가
            좋아하는 주인공인 피터팬을 모티브로 세상을 자유롭게 여행하는 한
            아이의 이야기를 담았습니다.
          </ArtworkBio>
        </ArtworkInfoCard>
        <SectionContainer>
          <SectionTitle>작품 기본 정보</SectionTitle>
          <InfoItem label='작가' content={artistData.artist.name} />
          <InfoItem label='시리즈' content='아몬드 나무' />
          <InfoItem
            label='작품 설명'
            content='빈센트 반 고흐의 아몬드 나무 시리즈 중 1번째 작품으로 세계적으로 유명한 빈센트 반 고흐의 작품으로 현재 국제 미술관에서 소장 중입니다.'
          />
          <InfoItem label='작품 크기' content='740mm * 920mm' />
          <InfoItem label='재질(사용재료)' content='캔버스에 유화' />
          <InfoItem label='제작시기' content='2021년' />
          <InfoItem label='작품 분야' content='유화, 회화' />
        </SectionContainer>
        <Image source={require('src/assets/images/swirl.png')} />
        <SectionContainer>
          {/* 작품 이용 유의사항 섹션 */}
          <SectionTitle>작품 이용 유의사항</SectionTitle>
          <InfoItem label='공개 여부' content='유료 (전시 1회당 2체리)' />
          <InfoItem label='저작자' content='작가 네번째작가' />
          <InfoItem
            label='유의사항'
            content='전시에 해당 작품을 유료로 활용할 수 있습니다. 저작권자인 작가가 설정한 금액(체리)은 전시 시 지급하시면, 전시회에 활용할 수 있습니다. 작품은 상업적 목적으로 금지하고 있으며, 캡처, 다운로드 등을 허용하지 않습니다. 위반 시 법적 문제가 될 수 있습니다.'
          />
        </SectionContainer>
        {/* 작가님의 다른 작품들 */}
        <SectionTitle>이 작가님의 다른 작품들</SectionTitle>
        <OtherArtworksWrapper>
          {artistData.artworks.map((otherArtwork) => (
            <OtherArtworkImage
              key={otherArtwork.id}
              source={{ uri: otherArtwork.fileName }}
            />
          ))}
        </OtherArtworksWrapper>
      </ScrollView>
      <Btn onPress={handleOpenBottomSheet}>
        <BtnText>내 컬렉션에 추가하기</BtnText>
      </Btn>
      {isBottomSheetVisible && (
        <AddCollectionSheet
          onClose={handleCloseBottomSheet}
          collections={collections}
          selectedCollection={selectedCollection}
          onSelectCollection={handleSelectCollection}
          artworkId={artworkId}
          artworkImage={artworkData.fileName}
        />
      )}

      {/* 토스트 메시지 표시 */}
      <ToastMessage message={toastMessage} visible={toastVisible} />
    </Container>
  );
};

const ArtworkImage = styled.Image`
  width: 100%;
  height: 240px;
  margin-top: ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.s};
`;

const ArtworkCategoryWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const CategoryTagsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryTag = styled(Subtitle2)`
  background-color: #fcebeb;
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.radius.s};
  color: ${({ theme }) => theme.colors.cherryRed_10};
  margin-right: ${({ theme }) => theme.margin.xs};
`;

const LikeText = styled(H6)`
  margin-left: auto;
`;

const ArtworkTitle = styled(H3)`
  font-size: 32px;
  margin-top: ${({ theme }) => theme.margin.s};
  margin-bottom: 18px;
`;

const ArtworkInfoCard = styled.View`
  flex-direction: column;
  margin-top: 20px;
  padding: 28px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.l};
  elevation: 4;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  padding-right: 10px;
`;

const ArtistCategory = styled(Caption)``;

const ArtistName = styled(H5)``;

const ArtworkBio = styled(Caption)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.grey_8};
`;

const SectionContainer = styled.View`
  margin: ${({ theme }) => theme.margin.m} 0;
`;

const SectionTitle = styled(Subtitle2)`
  margin-bottom: ${({ theme }) => theme.margin.xs};
`;

const InfoItem: React.FC<{
  label: string;
  content: string;
}> = ({ label, content }) => (
  <InfoRow>
    <InfoLabel>{label}:</InfoLabel>
    <InfoText>{content}</InfoText>
  </InfoRow>
);

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  align-items: flex-start; /* 라벨과 텍스트가 위쪽에 정렬되도록 설정 */
`;

const InfoLabel = styled(Caption)`
  font-family: ${({ theme }) => theme.fonts.bold};
  width: 100px;
`;

const InfoText = styled(Caption)`
  flex: 1;
`;

const OtherArtworksWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
  padding-bottom: 100px;
`;

const OtherArtworkImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  margin-right: 10px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

export default ArtworkInfo;
