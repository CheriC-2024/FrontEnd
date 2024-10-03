import React, { useState } from 'react';
import {
  Modal,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import CollectionItem from '../CollectionItem';
import { ButtonText, Caption, H4 } from 'src/styles/typography';
import { useNavigation } from '@react-navigation/native';

interface BottomSheetProps {
  onClose: () => void;
  collections: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
  }>;
  artworkId: number; // artworkId 추가
  artworkImage: string;
  selectedCollection: number | null;
  onSelectCollection: (collectionId: number) => void;
}

const AddCollectionBottomSheet: React.FC<BottomSheetProps> = ({
  onClose,
  collections,
  artworkId,
  artworkImage,
  selectedCollection,
  onSelectCollection,
}) => {
  const navigation = useNavigation();

  const handleAddNewCollection = () => {
    navigation.navigate('CreateCollection', { artworkId, artworkImage });
  };
  return (
    <Modal transparent={true} animationType='slide'>
      <TouchableWithoutFeedback onPress={onClose}>
        <Overlay />
      </TouchableWithoutFeedback>

      <SheetContainer>
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
                selected={selectedCollection === item.id}
                onPress={() => onSelectCollection(item.id)}
                imageSource={{ uri: 'https://i.ibb.co/QNCnwJB/IMG-8456.png' }}
                name={item.name}
                description={item.description}
              />
            )}
          />
        </SheetContent>
      </SheetContainer>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SheetContainer = styled.View`
  justify-content: flex-end;
  flex: 1;
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

export default AddCollectionBottomSheet;
