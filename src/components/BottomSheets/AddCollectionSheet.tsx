import React from 'react';
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import CollectionItem from '../CollectionItem';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { useNavigation } from '@react-navigation/native';
import useSlideAnimation from 'src/hooks/useSlideAnimation';

interface BottomSheetProps {
  onClose: () => void;
  collections: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
  }>;
  artworkId: number;
  artworkImage: string;
  selectedCollections: Array<number>; // 다중 선택을 위한 배열로 변경
  onSelectCollection: (collectionIds: Array<number>) => void; // 다중 선택을 반영한 함수
}

const AddCollectionBottomSheet: React.FC<BottomSheetProps> = ({
  onClose,
  collections,
  artworkId,
  artworkImage,
  selectedCollections,
  onSelectCollection,
}) => {
  const navigation = useNavigation();
  const { slideAnim, slideOut } = useSlideAnimation(0.6, 500);

  const handleClose = () => slideOut(onClose);

  const toggleSelectCollection = (collectionId: number) => {
    // 선택된 컬렉션을 토글하여 업데이트
    let updatedCollections;
    if (selectedCollections.includes(collectionId)) {
      updatedCollections = selectedCollections.filter(
        (id) => id !== collectionId,
      );
    } else {
      updatedCollections = [...selectedCollections, collectionId];
    }
    onSelectCollection(updatedCollections); // 선택된 컬렉션 배열을 부모에 전달
  };

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
              <AddButtonText>새 컬렉션에 추가하기 + </AddButtonText>
            </AddButton>

            <FlatList
              data={collections}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CollectionItem
                  selected={selectedCollections.includes(item.id)} // 다중 선택 상태 반영
                  onPress={() => toggleSelectCollection(item.id)} // 선택/해제 토글 함수 호출
                  imageSource={{ uri: item.image }}
                  name={item.name}
                  description={item.description}
                />
              )}
            />
          </SheetContent>
        </Animated.View>
      </SheetContainer>
    </Modal>
  );
};

export default AddCollectionBottomSheet;

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
