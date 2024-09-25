import React from 'react';
import { Modal, View } from 'react-native';
import { ButtonText, H4, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface BottomSheetProps {
  onSelect: (mode: 'image' | 'artist' | 'both') => void;
  onClose: () => void;
  selectedOption: 'image' | 'artist' | 'both'; // 선택된 상태를 부모로부터 전달받음
}

const ArtCollectingSheet: React.FC<BottomSheetProps> = ({
  onSelect,
  onClose,
  selectedOption, // 부모로부터 선택된 옵션을 받음
}) => {
  return (
    <Modal transparent={true} animationType='slide'>
      <SheetContainer>
        <SheetContent>
          <View style={{ marginLeft: 8 }}>
            <SheetTitle>정보 필터 설정하기</SheetTitle>
            <SheetDescription>
              현재 보여지는 정보를 필터로 설정할 수 있어요!
            </SheetDescription>
          </View>

          {/* 각 옵션 버튼의 배경색을 선택된 상태에 따라 변경 */}
          <OptionButton
            selected={selectedOption === 'image'}
            onPress={() => onSelect('image')}
          >
            <OptionText selected={selectedOption === 'image'}>
              이미지만 보기
            </OptionText>
          </OptionButton>

          <OptionButton
            selected={selectedOption === 'artist'}
            onPress={() => onSelect('artist')}
          >
            <OptionText selected={selectedOption === 'artist'}>
              작가만 보기
            </OptionText>
          </OptionButton>

          <OptionButton
            selected={selectedOption === 'both'}
            onPress={() => onSelect('both')}
          >
            <OptionText selected={selectedOption === 'both'}>
              작가와 작품명까지 보기
            </OptionText>
          </OptionButton>
        </SheetContent>
      </SheetContainer>
    </Modal>
  );
};

export default ArtCollectingSheet;

// 스타일 정의
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

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  padding: 15px 0;
  margin-bottom: ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.redBlack : theme.colors.grey_4};
`;

// OptionText의 색상을 조건부로 설정
const OptionText = styled(Subtitle2)<{ selected: boolean }>`
  text-align: center;
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
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
