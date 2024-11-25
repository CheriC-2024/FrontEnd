import { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { artistAndArtworkData } from '../data'; // 더미 데이터: 아티스트 및 작품 데이터 불러오기
import { Container } from 'src/styles/layout';
import { Caption, H4, H6, Subtitle2 } from 'src/styles/typography';
import { HeartIcon } from 'src/assets/icons/_index.js';
import {
  AddCollectionSheet,
  ArtistImage,
  ArtworkItem,
  Table,
} from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Btn, BtnText } from 'src/components/Button';
import { collections } from './data';
import ToastMessage from 'src/components/ToastMessage';
import useToastMessage from 'src/hooks/useToastMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useArtworkData } from 'src/api/hooks/useArtworkQueries';
import { useAddHeart, useRemoveHeart } from 'src/api/hooks/useArtworkMutations';

const ArtworkInfo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artworkId, newCollectionName } = route.params || {};
  const { data: artworkData, isLoading, error } = useArtworkData(artworkId);
  const { mutate: addHeartMutation, isLoading: isAddingHeart } = useAddHeart();
  const { mutate: removeHeartMutation, isLoading: isRemovingHeart } =
    useRemoveHeart();
  const [liked, setLiked] = useState(false); // TODO: 좋아요 누른 작품 조회 API
  const [heartCount, setHeartCount] = useState(artworkData?.heartCount || 0);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<Array<number>>(
    [],
  );
  const [previousSelectedCollections, setPreviousSelectedCollections] =
    useState<Array<number>>([]);

  // 토스트 메시지 훅 사용
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  useFocusEffect(
    useCallback(() => {
      // CreateCollection에서 컬렉션 생성했다면 이에 대한 토스트 메시지 띄우기
      if (newCollectionName) {
        showToast(`'${newCollectionName}'에 작품이 추가되었어요!`);

        // 토스트 표시 후 newCollectionName을 지우기 위해 params를 초기화
        navigation.setParams({ newCollectionName: null });
      }
      setIsBottomSheetVisible(false);
    }, [newCollectionName, navigation]),
  );

  const toggleLike = () => {
    if (isAddingHeart || isRemovingHeart) return; // 중복 요청 방지

    if (liked) {
      // 좋아요 취소 (DELETE)
      removeHeartMutation(artworkId, {
        onSuccess: (newHeartCount) => {
          setLiked(false); // 좋아요 상태 변경
          setHeartCount(newHeartCount); // 좋아요 수 갱신
        },
        onError: (error) => {
          console.error('Error removing heart:', error);
        },
      });
    } else {
      // 좋아요 추가 (POST)
      addHeartMutation(artworkId, {
        onSuccess: (newHeartCount) => {
          setLiked(true); // 좋아요 상태 변경
          setHeartCount(newHeartCount); // 좋아요 수 갱신
        },
        onError: (error) => {
          console.error('Error adding heart:', error);
        },
      });
    }
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    const newSelections = selectedCollections.filter(
      (id) => !previousSelectedCollections.includes(id),
    );

    if (newSelections.length > 0) {
      const newCollectionNames = collections
        .filter((collection) => newSelections.includes(collection.id))
        .map((collection) => collection.name)
        .join(', ');

      showToast(`컬렉션 '${newCollectionNames}'에 작품이 추가되었습니다.`);
    }

    setPreviousSelectedCollections(selectedCollections);
    setIsBottomSheetVisible(false);
  };

  const handleSelectCollection = (collectionIds: Array<number>) => {
    setSelectedCollections(collectionIds);
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

  const artistData = artistAndArtworkData.find((artist) =>
    artist.artworks.some((artwork) => artwork.id === artworkId),
  );

  if (isLoading) {
    return;
  }

  const handlePress = (artistId: number) => {
    navigation.navigate('CollectingStack', {
      screen: 'ArtistProfile', // CollectingStack 안의 ArtistProfile 화면으로 이동
      params: { artistId }, // artistId를 전달
    });
  };

  const tableItems = [
    { label: '작가', content: artworkData.artistName },
    { label: '시리즈', content: artworkData.series || '정보 없음' },
    {
      label: '작품 크기',
      content: `${artworkData.horizontalSize}mm x ${artworkData.verticalSize}mm`,
    },
    { label: '재질(사용재료)', content: artworkData.material || '정보 없음' },
    { label: '제작시기', content: artworkData.madeAt || '정보 없음' },
    {
      label: '작품 분야',
      content: artworkData.artTypes.join(', '),
    },
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 작품 이미지 및 좋아요 수 */}
        <ArtworkImage source={{ uri: artworkData.imgUrl }} />
        <ArtworkCategoryWrapper>
          <TagsWrapper>
            {artworkData.artTypes.map((type, index) => (
              <CategoryTag key={index}>{type}</CategoryTag>
            ))}
          </TagsWrapper>
          <TagsWrapper>
            <TouchableOpacity
              onPress={toggleLike}
              disabled={isAddingHeart || isRemovingHeart}
            >
              <HeartIcon
                fill={liked ? '#E52C32' : 'none'}
                stroke={liked ? null : '#120000'}
              />
            </TouchableOpacity>
            <LikeText>{artworkData.heartCount}</LikeText>
          </TagsWrapper>
        </ArtworkCategoryWrapper>
        <ArtworkTitle>{artworkData.name}</ArtworkTitle>
        <TouchableOpacity
          onPress={() => handlePress(artworkData.userRes.id)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <ArtistName>{artworkData.userRes.name}</ArtistName>
          <Icon
            name='chevron-forward'
            size={22}
            color='#969292'
            style={{ paddingTop: 4 }}
          />
        </TouchableOpacity>

        {/* 작가 정보 */}
        <ArtistInfo>
          <ArtistImage
            image={artworkData.userRes.profileImgUrl}
            size={28}
            style={{ marginRight: 4 }}
          />
          <Subtitle2>{artworkData.userRes.name}의 작품 설명</Subtitle2>
        </ArtistInfo>
        <ArtworkInfoCard>
          <ArtworkBio>{artworkData.description}</ArtworkBio>
        </ArtworkInfoCard>
        <SectionTitle>작품 기본 정보</SectionTitle>
        <Table items={tableItems} />
        <SectionContainer>
          {/* 작품 이용 유의사항 섹션 */}
          <SectionTitle>작품 이용 유의사항</SectionTitle>
          <InfoItem
            label='공개 여부'
            content={`유료 (전시 1회당 ${artworkData.cherryPrice}체리)`}
          />
          <InfoItem label='저작자' content={artworkData.userRes.name} />
          <InfoItem
            label='유의사항'
            content='전시에 해당 작품을 유료로 활용할 수 있습니다. 저작권자인 작가가 설정한 금액(체리)은 전시 시 지급하시면, 전시회에 활용할 수 있습니다. 작품은 상업적 목적으로 금지하고 있으며, 캡처, 다운로드 등을 허용하지 않습니다. 위반 시 법적 문제가 될 수 있습니다.'
          />
        </SectionContainer>
        <View style={{ marginBottom: 28 }} />
        {/* 작가님의 다른 작품들 */}
        <TouchableOpacity
          onPress={() => handlePress(artworkData.userRes.id)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <H6>이 작가님의 다른 작품들</H6>
          <Icon
            name='chevron-forward'
            size={22}
            color='#120000'
            style={{ paddingBottom: 2 }}
          />
        </TouchableOpacity>
        {/* TODO: 작가별 작품 조회 API */}
        <OtherArtworksWrapper>
          <FlatList
            data={artistData?.artworks}
            keyExtractor={(artwork) => artwork.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: artwork }) => (
              <ArtworkItem
                artwork={artwork}
                selected={false}
                selectedIndex={0}
                onSelect={() => {}}
              />
            )}
            // 각 아이템 사이의 간격 설정
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </OtherArtworksWrapper>
        <TouchableOpacity
          onPress={() => handlePress(artworkData.userRes.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <H6>이 작품이 게시된 컬렉션 전시</H6>
          <Icon
            name='chevron-forward'
            size={22}
            color='#120000'
            style={{ paddingBottom: 2 }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 168,
            backgroundColor: '#B0ABAB',
            borderRadius: 20,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            width: '100%',
            height: 168,
            backgroundColor: '#B0ABAB',
            borderRadius: 20,
            marginBottom: 12,
          }}
        />
        <View
          style={{
            width: '100%',
            height: 168,
            backgroundColor: '#B0ABAB',
            borderRadius: 20,
            marginBottom: 120,
          }}
        />
      </ScrollView>
      <Btn onPress={handleOpenBottomSheet} style={{ marginHorizontal: 16 }}>
        <BtnText>내 컬렉션에 추가하기</BtnText>
      </Btn>
      {isBottomSheetVisible && (
        <AddCollectionSheet
          onClose={handleCloseBottomSheet}
          collections={collections}
          selectedCollections={selectedCollections}
          onSelectCollection={handleSelectCollection}
          artworkId={artworkId}
          artworkImage={artworkData.imgUrl}
        />
      )}
      <ToastMessage message={toastMessage} visible={toastVisible} />
    </Container>
  );
};

const ArtworkImage = styled.Image`
  width: 100%;
  height: 260px;
  border-radius: ${({ theme }) => theme.radius.s};
`;

const ArtworkCategoryWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const TagsWrapper = styled.View`
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

const ArtworkTitle = styled(H4)`
  font-size: 28px;
  margin-top: ${({ theme }) => theme.margin.s};
  letter-spacing: 1px;
`;

const ArtistName = styled(H6)`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #969292;
`;

const ArtworkInfoCard = styled.View`
  margin: 0 2px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.l};
  elevation: 4;
`;

const ArtistInfo = styled.View`
  flex-direction: row;
  padding-top: ${({ theme }) => theme.padding.xl};
  padding-bottom: ${({ theme }) => theme.padding.s};
`;

const ArtworkBio = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  line-height: 25px;
`;

const SectionContainer = styled.View`
  margin: ${({ theme }) => theme.margin.m} 0;
`;

const SectionTitle = styled(Subtitle2)`
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const InfoItem: React.FC<{
  label: string;
  content: string;
}> = ({ label, content }) => (
  <InfoRow>
    <InfoLabel>{label}</InfoLabel>
    <InfoText>{content}</InfoText>
  </InfoRow>
);

const InfoRow = styled.View`
  flex-direction: row;
  margin-top: 12px;
  align-items: flex-start; /* 라벨과 텍스트가 위쪽에 정렬되도록 설정 */
`;

const InfoLabel = styled(Caption)`
  font-family: ${({ theme }) => theme.fonts.bold};
  width: 70px;
`;

const InfoText = styled(Caption)`
  flex: 1;
  line-height: 18px;
`;

const OtherArtworksWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
  padding-bottom: 28px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

export default ArtworkInfo;
