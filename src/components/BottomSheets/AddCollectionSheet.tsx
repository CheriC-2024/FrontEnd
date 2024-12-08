import React, { useEffect, useState } from 'react';
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import CollectionItem from '../CollectionItem';
import { ButtonText, Caption, H4, H5 } from 'src/styles/typography';
import { useNavigation } from '@react-navigation/native';
import useSlideAnimation from 'src/hooks/useSlideAnimation';
import {
  useAddArtworkToCollection,
  useArtworkList,
  useUserCollection,
} from 'src/api/hooks/useCollectionQueries';

interface BottomSheetProps {
  onClose: (addedCollections: string[]) => void;
  artworkId: number;
  artworkImage: string;
  showToast: (message: string) => void;
}

const AddCollectionSheet: React.FC<BottomSheetProps> = ({
  onClose,
  artworkId,
  artworkImage,
  showToast,
}) => {
  const navigation = useNavigation();
  const { slideAnim, slideOut } = useSlideAnimation(0.6, 500);

  // 사용자 컬렉션 및 컬렉션별 작품 데이터 가져오기
  const { data: userCollections = [], isLoading: isCollectionsLoading } =
    useUserCollection();
  const collectionIds = userCollections.map(
    (collection) => collection.collectionId,
  );
  const { data: artworksInCollections = [], isLoading: isArtworksLoading } =
    useArtworkList('LATEST', collectionIds);
  const [addedCollections, setAddedCollections] = useState<string[]>([]);

  // 선택된 컬렉션 상태 관리
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

  // 작품을 컬렉션에 추가 API
  const { mutate: addArtwork } = useAddArtworkToCollection();

  useEffect(() => {
    setAddedCollections([]); // BottomSheet가 열릴 때 초기화
  }, []);

  useEffect(() => {
    if (
      !isCollectionsLoading &&
      !isArtworksLoading &&
      artworksInCollections.length > 0
    ) {
      console.log('artworksInCollections:', artworksInCollections);
      console.log('Target artworkId:', artworkId);

      // 선택된 컬렉션 ID 계산
      const initialSelections = artworksInCollections
        .filter((collection) =>
          collection.artBriefRess.some(
            (artwork) => String(artwork.artId) === String(artworkId), // 타입을 명시적으로 변환하여 비교
          ),
        )
        .map((collection) => collection.collectionId); // 선택된 컬렉션 ID만 추출

      console.log('Final Initial Selected Collections:', initialSelections);
      setSelectedCollections(initialSelections);
    }
  }, [
    userCollections,
    artworksInCollections,
    artworkId,
    isCollectionsLoading,
    isArtworksLoading,
  ]);

  // 선택된 컬렉션 상태가 업데이트될 때 로그 확인
  useEffect(() => {
    console.log('Updated selectedCollections:', selectedCollections);
  }, [selectedCollections]);

  // 바텀 시트 닫기
  const handleClose = () => {
    slideOut(() => {
      console.log('Closing with added collections:', addedCollections);
      if (addedCollections.length > 0) {
        const message = `'${addedCollections.join(', ')}' 컬렉션에 작품이 추가되었습니다.`;
        showToast(message);
      }
      onClose(addedCollections);
    });
  };

  // 컬렉션 선택/해제
  const toggleSelectCollection = (collectionId: number) => {
    const isSelected = selectedCollections.includes(collectionId);
    const updatedSelections = isSelected
      ? selectedCollections.filter((id) => id !== collectionId)
      : [...selectedCollections, collectionId];

    setSelectedCollections(updatedSelections);

    const collectionName = userCollections.find(
      (collection) => collection.collectionId === collectionId,
    )?.name;

    // API 호출
    addArtwork(
      { collectionId, artIds: [artworkId] },
      {
        onSuccess: () => {
          if (!isSelected && collectionName) {
            setAddedCollections((prev) => [...prev, collectionName]);
          }
        },
        onError: (error) => {
          console.error('Error adding artwork to collection:', error);
        },
      },
    );
  };

  // 새 컬렉션 생성 페이지로 이동
  const handleAddNewCollection = () => {
    navigation.navigate('CreateCollection', { artworkId, artworkImage });
  };

  return (
    <Modal transparent={true} animationType='none'>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Overlay />
      </TouchableWithoutFeedback>

      <SheetContainer>
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <SheetContent>
            <Title>🖼️ 내 컬렉션에 추가하기</Title>
            <Subtitle>마음에 드신 이 작품을 어떤 컬렉션에 담을까요?</Subtitle>
            <AddButton onPress={handleAddNewCollection}>
              <AddButtonText>새 컬렉션에 추가하기 +</AddButtonText>
            </AddButton>

            {/* 로딩 상태 처리 */}
            {isCollectionsLoading || isArtworksLoading ? (
              <ActivityIndicator size='large' color='#E52C32' />
            ) : userCollections.length === 0 ? ( // 컬렉션이 없는 경우
              <H5>현재 컬렉션이 없습니다.</H5>
            ) : (
              <FlatList
                data={userCollections}
                keyExtractor={(item) => item.collectionId.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 80, // 위아래 여백 추가
                }}
                renderItem={({ item }) => {
                  const isSelected = selectedCollections.includes(
                    item.collectionId,
                  );
                  console.log(
                    `Rendering CollectionItem: ${item.name}, selected: ${isSelected}`,
                  );
                  return (
                    <CollectionItem
                      selected={isSelected}
                      onPress={() => toggleSelectCollection(item.collectionId)}
                      imageSource={{ uri: item.latestArtImgUrl }}
                      name={item.name}
                      description={item.description}
                    />
                  );
                }}
              />
            )}
          </SheetContent>
        </Animated.View>
      </SheetContainer>
    </Modal>
  );
};

export default AddCollectionSheet;

// 스타일 컴포넌트
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SheetContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const SheetContent = styled.View`
  background-color: #fcf9f9;
  padding: 36px 16px;
  border-top-left-radius: ${({ theme }) => theme.radius.l};
  border-top-right-radius: ${({ theme }) => theme.radius.l};
`;

const Title = styled(H4)``;

const Subtitle = styled(ButtonText)`
  margin-bottom: 18px;
`;

const AddButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 12px;
`;

const AddButtonText = styled(Caption)``;
