import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { ButtonText, H4, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface BottomSheetProps {
  onSelect: (mode: 'image' | 'artist' | 'both') => void;
  onClose: () => void;
}

const ArtCollectingSheet: React.FC<BottomSheetProps> = ({
  onSelect,
  onClose,
}) => {
  return (
    <Modal transparent={true} animationType='slide'>
      <SheetContainer>
        <SheetContent>
          <SheetTitle>정보 필터 설정하기</SheetTitle>
          <SheetDescription>
            현재 보여지는 정보를 필터로 설정할 수 있어요!
          </SheetDescription>
          <OptionButton onPress={() => onSelect('image')}>
            <OptionText>이미지만 보기</OptionText>
          </OptionButton>
          <OptionButton onPress={() => onSelect('artist')}>
            <OptionText>작가만 보기</OptionText>
          </OptionButton>
          <OptionButton onPress={() => onSelect('both')}>
            <OptionText>작가와 작품명까지 보기</OptionText>
          </OptionButton>
        </SheetContent>
      </SheetContainer>
    </Modal>
  );
};

const SheetContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const SheetContent = styled.View`
  background-color: white;
  padding: 20px;
  border-top-left-radius: ${({ theme }) => theme.radius.l};
  border-top-right-radius: ${({ theme }) => theme.radius.l};
`;

const SheetTitle = styled(H4)`
  padding-top: 10px;
`;

const SheetDescription = styled(ButtonText)`
  padding-bottom: ${({ theme }) => theme.padding.l};
  color: ${({ theme }) => theme.colors.grey_8};
`;

const OptionButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 0;
  margin-bottom: ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ theme }) => theme.colors.redBlack};
`;

const OptionText = styled(Subtitle2)`
  text-align: center;
  color: #fff;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: #e0e0e0;
  margin-top: 10px;
  border-radius: 10px;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  color: black;
  text-align: center;
`;

export default ArtCollectingSheet;
